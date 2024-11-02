package main

import (
	"context"
	"fmt"
	"os"

	config "electronik/internal/configs/dev"
	"electronik/internal/databases"

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
	// Nạp cấu hình từ file config.yaml
	cfg, err := config.Instance()
	if err != nil {
		fmt.Printf("Could not load config: %v\n", err)
		return
	}

	// Kết nối đến MongoDB
	client, err := databases.NewMongoDB(&cfg.Mongo)
	if err != nil {
		fmt.Printf("Could not connect to MongoDB: %v\n", err)
		return
	}
	defer client.Disconnect()

	collection := client.Database.Collection("orders")

	// Tạo thư mục scripts nếu chưa tồn tại
	scriptsDir := "scripts"
	if err := os.MkdirAll(scriptsDir, os.ModePerm); err != nil {
		fmt.Printf("Error creating scripts directory: %v\n", err)
		return
	}

	// Đường dẫn tới file
	filePath := fmt.Sprintf("%s/transactions.txt", scriptsDir)
	file, err := os.Create(filePath)
	if err != nil {
		fmt.Printf("Error creating file: %v\n", err)
		return
	}
	defer file.Close()

	// Lấy tất cả các đơn hàng
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		fmt.Printf("Error fetching orders: %v\n", err)
		return
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
				serials += " " // Dấu cách giữa các serial
			}
			serials += fmt.Sprintf("%d", detail.Serial)
		}

		for _, detail := range order.Details {
			totals += fmt.Sprintf("%.2f ", detail.Total)
		}

		resultLine := fmt.Sprintf("%s:%.2f:%s\n", serials, order.Total, totals)

		// Ghi vào file
		if _, err := file.WriteString(resultLine); err != nil {
			fmt.Printf("Error writing to file: %v\n", err)
		}
	}

	if err := cursor.Err(); err != nil {
		fmt.Printf("Cursor error: %v\n", err)
	}

	fmt.Println("Finished writing orders to file.")
}
