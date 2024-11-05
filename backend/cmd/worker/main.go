package main

import (
	"context"
	"fmt"
	"os"
	"strconv"

	config "electronik/internal/configs/dev"
	"electronik/internal/databases"
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
		return fmt.Errorf("Error creating scripts directory: %v", err)
	}

	// Mở file để ghi
	file, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("Error creating file: %v", err)
	}
	defer file.Close()

	// Lấy collection `orders` từ MongoDB
	collection := client.Database.Collection("orders")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return fmt.Errorf("Error fetching orders: %v", err)
	}
	defer cursor.Close(context.Background())

	// Đọc từng đơn hàng và ghi vào file
	for cursor.Next(context.Background()) {
		var order Order
		if err := cursor.Decode(&order); err != nil {
			fmt.Printf("Error decoding order: %v\n", err)
			continue
		}

		// Xây dựng chuỗi để ghi vào file
		serials := ""
		totals := ""

		// Duyệt qua từng detail để xây dựng chuỗi
		for i, detail := range order.Details {
			if i > 0 {
				serials += " "
			}
			serials += fmt.Sprintf("%d", detail.Serial)
		}

		for _, detail := range order.Details {
			totals += fmt.Sprintf("%.2f ", detail.Total)
		}

		resultLine := fmt.Sprintf("%s:%.2f:%s\n", serials, order.Total, totals)

		// Ghi vào file, giữ nguyên dòng `file.WriteString` như yêu cầu
		if _, err := file.WriteString(resultLine); err != nil {
			return fmt.Errorf("Error writing to file: %v", err)
		}
	}

	if err := cursor.Err(); err != nil {
		return fmt.Errorf("Cursor error: %v", err)
	}

	return nil
}
