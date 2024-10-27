package repositories

import (
	"context"
	"electronik/internal/databases"
	"electronik/internal/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	CategoryRepository interface {
		Repository[models.Category]
		GetCategories() ([]*models.CategoryRequest, error)
	}

	categoryRepository struct {
		db         *databases.MongoDB
		collection *mongo.Collection
	}
)

func NewCategoryRepository(db *databases.MongoDB) CategoryRepository {
	return &categoryRepository{
		db:         db,
		collection: db.Database.Collection("products"),
	}
}

func (c *categoryRepository) Create(entity *models.Category) error {
	// _, err := c.collection.InsertOne(context.Background(), entity)
	// return err
	return nil
}

func (c *categoryRepository) Delete(id string) error {
	// filter := bson.M{"category._id": id}
	// result, err := c.collection.DeleteOne(context.Background(), filter)
	// if err != nil {
	// 	return err
	// }
	// if result.DeletedCount == 0 {
	// 	return mongo.ErrNoDocuments
	// }
	return nil
}

func (c *categoryRepository) GetByID(id string) (*models.Category, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	// Lọc bằng ID của category
	filter := bson.M{"category._id": objectID}

	// Tìm kiếm tài liệu
	var result struct {
		Category models.Category `bson:"category"`
	}
	err = c.collection.FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &result.Category, nil
}

func (c *categoryRepository) Update(entityMap *map[string]interface{}) error {
	categoryID, ok := (*entityMap)["id"].(string)
	if !ok {
		return mongo.ErrNoDocuments
	}
	filter := bson.M{"category._id": categoryID}
	update := bson.M{"$set": entityMap}

	_, err := c.collection.UpdateOne(context.Background(), filter, update)
	return err
}

func (c *categoryRepository) GetCategories() ([]*models.CategoryRequest, error) {
	// Tạo một slice để lưu kết quả
	var results []*models.CategoryRequest
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Thực hiện truy vấn aggregate
	pipeline := mongo.Pipeline{
		{
			{Key: "$group", Value: bson.D{
				{Key: "_id", Value: bson.D{
					{Key: "categoryId", Value: "$category._id"},
					{Key: "categoryName", Value: "$category.name"},
					{Key: "categoryImage", Value: "$category.image"},
				}},
				{Key: "manufacturers", Value: bson.D{{Key: "$addToSet", Value: "$manufacturer"}}},
			}},
		},
		{
			{Key: "$project", Value: bson.D{
				{Key: "category", Value: bson.D{
					{Key: "_id", Value: "$_id.categoryId"},
					{Key: "name", Value: "$_id.categoryName"},
					{Key: "image", Value: "$_id.categoryImage"},
				}},
				{Key: "manufacturers", Value: 1},
			}}},
	}

	cursor, err := c.collection.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}
	defer func() {
		if err := cursor.Close(ctx); err != nil {
			// Log lỗi nếu cần thiết
		}
	}()

	// Giải mã kết quả vào slice
	for cursor.Next(ctx) {
		var categoryRequest models.CategoryRequest
		if err := cursor.Decode(&categoryRequest); err != nil {
			return nil, err
		}
		results = append(results, &categoryRequest)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return results, nil
}
