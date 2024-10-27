package repositories

import (
	"context"
	"electronik/internal/databases"
	"electronik/internal/models"
	"errors"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type (
	// ProductRepository nhúng interface Repository
	ProductRepository interface {
		Repository[models.Product]
		GetProductsByPagination(limit int, skip int) ([]*models.Product, error)
		GetProductsBySearch(limit int, skip int, query string) ([]*models.Product, error)
		UpdateStatus(id string, status int) error
		GetOnSaleProducts(limit int, skip int) ([]*models.Product, error)
	}

	productRepository struct {
		db         *databases.MongoDB
		collection *mongo.Collection
	}
)

// NewProductRepository khởi tạo productRepository
func NewProductRepository(db *databases.MongoDB) ProductRepository {
	return &productRepository{
		db:         db,
		collection: db.Database.Collection("products"),
	}
}

// Cài các phương thức trong productRepository
// 1. Get product
func (pro *productRepository) GetByID(id string) (*models.Product, error) {
	var product models.Product
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	// Truy vấn MongoDB dựa trên ObjectID
	filter := bson.M{"_id": objectID}
	err = pro.collection.FindOne(context.Background(), filter).Decode(&product)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return &models.Product{}, nil
		}
		return nil, err
	}
	return &product, nil
}

// 2. create product
func (pro *productRepository) Create(entity *models.Product) error {
	_, err := pro.collection.InsertOne(context.Background(), entity)
	return err
}

// 3. update
func (pro *productRepository) Update(entity *map[string]interface{}) error {
	id, ok := (*entity)["_id"].(primitive.ObjectID)
	if !ok {
		return errors.New("invalid _id type, expected ObjectID")
	}
	filter := bson.M{"_id": id}
	update := bson.M{}

	addUpdateField := func(field string, value interface{}) {
		switch v := value.(type) {
		case string:
			if v != "" {
				update[field] = v
			}
		case float64:
			if v != 0 {
				update[field] = v
			}
		case []models.Variant:
			if v != nil && len(v) > 0 {
				update[field] = v
			}
		case []models.Feedback:
			if v != nil && len(v) > 0 {
				update[field] = v
			}
		case []interface{}:
			if v != nil && len(v) > 0 {
				update[field] = v
			}
		case nil:
			return
		default:
			update[field] = value
		}
	}

	for key, value := range *entity {
		addUpdateField(key, value)
	}

	if len(update) == 0 {
		return errors.New("no fields to update")
	}

	updateQuery := bson.M{"$set": update}
	result, err := pro.collection.UpdateOne(context.Background(), filter, updateQuery)
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return fmt.Errorf("no document found with the provided _id: %v", id)
	}

	return nil
}

// 4. delete product
func (pro *productRepository) Delete(id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$set": bson.M{"status": -1},
	}
	result, err := pro.collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}
	return nil
}

// 5. Get product by pagination
func (pro *productRepository) GetProductsByPagination(limit int, skip int) ([]*models.Product, error) {
	if limit <= 0 {
		return []*models.Product{}, nil
	}

	listProduct := []*models.Product{}

	opt := options.Find().SetLimit(int64(limit)).SetSkip(int64(skip))

	cursor, err := pro.collection.Find(context.Background(), bson.M{}, opt)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var product models.Product
		if err := cursor.Decode(&product); err != nil {
			return nil, err
		}
		listProduct = append(listProduct, &product)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return listProduct, nil
}

//5. search products

func (pro *productRepository) GetProductsBySearch(limit int, skip int, query string) ([]*models.Product, error) {
	if limit <= 0 {
		return []*models.Product{}, nil
	}

	listProduct := []*models.Product{}

	// Thiết lập filter cho tìm kiếm với $regex hoặc lấy tất cả sản phẩm nếu query trống
	var filter bson.M
	if query == "" {
		filter = bson.M{} // Không có từ khóa, lấy tất cả sản phẩm
	} else {
		filter = bson.M{
			"$or": []bson.M{
				{"product_name": bson.M{"$regex": query, "$options": "i"}}, // Tìm kiếm theo tên sản phẩm (không phân biệt chữ hoa, chữ thường)
				{"description": bson.M{"$regex": query, "$options": "i"}},  // Tìm kiếm trong mô tả sản phẩm
			},
		}
	}

	// Tùy chọn truy vấn với giới hạn và sắp xếp
	opt := options.Find().
		SetLimit(int64(limit)).
		SetSkip(int64(skip))

	// Thực hiện truy vấn
	cursor, err := pro.collection.Find(context.Background(), filter, opt)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	// Duyệt qua kết quả và thêm vào danh sách
	for cursor.Next(context.Background()) {
		var product models.Product
		if err := cursor.Decode(&product); err != nil {
			return nil, err
		}
		listProduct = append(listProduct, &product)
	}

	// Kiểm tra lỗi của cursor
	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return listProduct, nil
}

func (pro *productRepository) UpdateStatus(id string, status int) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"status": status}}

	result, err := pro.collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments // Trả về lỗi nếu không tìm thấy sản phẩm
	}

	return nil
}

func (pro *productRepository) GetOnSaleProducts(limit int, skip int) ([]*models.Product, error) {
	if limit <= 0 {
		return []*models.Product{}, nil
	}

	listProduct := []*models.Product{}
	now := primitive.NewDateTimeFromTime(time.Now())

	// Thiết lập filter cho sản phẩm đang giảm giá
	filter := bson.M{
		"sale":            bson.M{"$ne": nil},
		"sale.start_date": bson.M{"$exists": true, "$lte": now},
		"sale.end_date":   bson.M{"$exists": true, "$gte": now},
	}

	// Tùy chọn phân trang
	opt := options.Find().
		SetLimit(int64(limit)).
		SetSkip(int64(skip)).
		SetSort(bson.D{
			{Key: "sale.discount_percentage", Value: -1},
			{Key: "price", Value: -1},
			{Key: "created_at", Value: -1},
		})

	// Thực hiện truy vấn
	cursor, err := pro.collection.Find(context.Background(), filter, opt)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	// Duyệt qua kết quả và thêm vào danh sách
	for cursor.Next(context.Background()) {
		var product models.Product
		if err := cursor.Decode(&product); err != nil {
			return nil, err
		}
		listProduct = append(listProduct, &product)
	}

	// Kiểm tra lỗi của cursor
	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return listProduct, nil
}
