package main

import (
	"context"
	"fmt"
	"os"
	"strconv"

	config "electronik/internal/configs/dev"
	"electronik/internal/databases"
	"electronik/internal/models"
	"electronik/pkg/algorithm"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type OrderDetail struct {
	Serial int64   `bson:"serial" json:"serial"`
	Total  float64 `bson:"total" json:"total"`
}

type Order struct {
	ID      primitive.ObjectID `bson:"_id" json:"_id"`
	Details []*OrderDetail     `bson:"details" json:"details"`
	Total   float64            `bson:"total" json:"total"`
}

func main() {
	minUtility, err := strconv.ParseFloat(os.Args[1], 64)

	if len(os.Args) < 2 {
		fmt.Println("Usage: main <minUtility>")
		fmt.Printf("Running EMHUN with minUtility: %.2f\n", minUtility)

		return
	}

	// Đọc `minUtility` từ tham số dòng lệnh
	if err != nil {
		fmt.Printf("Invalid minUtility: %v\n", err)
		return
	}
	fmt.Printf("Running EMHUN with minUtility: %.2f\n", minUtility)
	cfg, err := config.Instance()
	if err != nil {
		fmt.Printf("Could not load config: %v\n", err)
		return
	}

	client, err := databases.NewMongoDB(&cfg.Mongo)
	if err != nil {
		fmt.Printf("Could not connect to MongoDB: %v\n", err)
		return
	}
	defer client.Disconnect()

	// Đường dẫn tới file `transactions.txt`
	filePath := "scripts/transactions.txt"
	if err := writeTransactionsToFile(client, filePath); err != nil {
		fmt.Printf("Error writing transactions to file: %v\n", err)
		return
	}

	fmt.Println("Finished writing orders to file.")
	resultFile := "scripts/result.txt"

	if err := algorithm.RunEMHUN(filePath, minUtility, resultFile); err != nil {
		fmt.Printf("Error running EMHUN: %v\n", err)
		return
	}

	fmt.Println("EMHUN analysis complete. Results saved to", resultFile)
}

// writeTransactionsToFile ghi dữ liệu đơn hàng từ MongoDB vào file
func writeTransactionsToFile(client *databases.MongoDB, filePath string) error {
	// Tạo thư mục scripts nếu chưa tồn tại
	if err := os.MkdirAll("scripts", os.ModePerm); err != nil {
		return fmt.Errorf("error creating scripts directory: %v", err)
	}

	// Mở file để ghi
	file, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("error creating file: %v", err)
	}
	defer file.Close()

	// Lấy collection `orders` từ MongoDB
	ordersCollection := client.Database.Collection("orders")
	productsCollection := client.Database.Collection("products")

	cursor, err := ordersCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return fmt.Errorf("error fetching orders: %v", err)
	}
	defer cursor.Close(context.Background())

	// Đọc từng đơn hàng và ghi vào file
	for cursor.Next(context.Background()) {
		var order models.Order
		if err := cursor.Decode(&order); err != nil {
			fmt.Printf("error decoding order: %v\n", err)
			continue
		}

		// Xây dựng chuỗi để ghi vào file
		serials := ""
		utilities := ""
		totalUtility := 0.0

		// Duyệt qua từng detail để tính toán utility
		for i, detail := range order.Details {
			if i > 0 {
				serials += " "
			}
			serials += fmt.Sprintf(detail.Serial)

			// Tìm sản phẩm chứa serial tương ứng
			var product models.Product
			err := productsCollection.FindOne(context.Background(), bson.M{"variants.serial": detail.Serial}).Decode(&product)
			if err != nil {
				fmt.Printf("error fetching product for serial %v: %v\n", detail.Serial, err)
				continue
			}

			// Tìm đúng variant trong sản phẩm và tính utility
			for _, variant := range product.Variants {
				if variant.Serial == detail.Serial {
					utility := (detail.Price - variant.PurchasePrice) * float64(detail.Quantity)
					utilities += fmt.Sprintf("%.2f ", utility)
					totalUtility += utility
					break
				}
			}
		}

		// Xây dựng chuỗi kết quả để ghi vào file
		resultLine := fmt.Sprintf("%s:%.2f:%s\n", serials, totalUtility, utilities)

		// Ghi vào file
		if _, err := file.WriteString(resultLine); err != nil {
			return fmt.Errorf("error writing to file: %v", err)
		}
	}

	if err := cursor.Err(); err != nil {
		return fmt.Errorf("cursor error: %v", err)
	}

	return nil
}
