package repositories

import (
	"context"
	"electronik/internal/databases"
	"electronik/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type (
	// ProductRepository nhúng interface Repository
	ProductRepository interface {
		Repository[models.Product]
		GetListProductByPagination(limit int, skip int) ([]models.Product, error)
		GetListProductBySearch(limit int, skip int, query string) ([]models.Product, error)
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
func (pro *productRepository) GetByID(id string) (models.Product, error) {
	var product models.Product
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.Product{}, err
	}

	// Truy vấn MongoDB dựa trên ObjectID
	filter := bson.M{"_id": objectID}
	err = pro.collection.FindOne(context.Background(), filter).Decode(&product)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return models.Product{}, nil
		}
		return models.Product{}, err
	}
	return product, nil
}

// 2. create product
func (pro *productRepository) Create(entity models.Product) error {
	_, err := pro.collection.InsertOne(context.Background(), entity)
	return err
}

// 3. update product
func (pro *productRepository) Update(id string, entity models.Product) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$set": entity,
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

// 4. delete product
func (pro *productRepository) Delete(id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$set": bson.M{"status": 1},
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
func (pro *productRepository) GetListProductByPagination(limit int, skip int) ([]models.Product, error) {
	if limit <= 0 {
		return []models.Product{}, nil
	}

	listProduct := []models.Product{}

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
		listProduct = append(listProduct, product)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return listProduct, nil
}

//5. search products

func (pro *productRepository) GetListProductBySearch(limit int, skip int, query string) ([]models.Product, error) {
	if limit <= 0 {
		return []models.Product{}, nil
	}

	listProduct := []models.Product{}
	filter := bson.M{
		"$or": []bson.M{
			{"product_name": bson.M{"$regex": query, "$options": "i"}}, // Tìm kiếm trong tên sản phẩm
			{"description": bson.M{"$regex": query, "$options": "i"}},  // Tìm kiếm trong mô tả sản phẩm
		},
	}

	opt := options.Find().SetLimit(int64(limit)).SetSkip(int64(skip))

	cursor, err := pro.collection.Find(context.Background(), filter, opt)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var product models.Product
		if err := cursor.Decode(&product); err != nil {
			return nil, err
		}
		listProduct = append(listProduct, product)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return listProduct, nil
}
