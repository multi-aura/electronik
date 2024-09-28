package repositories

import (
	"context"
	"electronik/internal/databases"
	"electronik/internal/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository interface {
	Repository[models.User] // Nhúng interface chung
	// Các phương thức cụ thể cho UserRepository
	GetUsersByName(name string) ([]models.User, error)
	GetUserByEmail(email string) (models.User, error)
}

// Tạo một struct cụ thể cho User
type userRepository struct {
	db         *databases.MongoDB
	collection *mongo.Collection
}

func NewUserRepository(db *databases.MongoDB) UserRepository {
	// Sử dụng collection "users" cho MongoDB
	return &userRepository{
		db:         db,
		collection: db.Database.Collection("users"),
	}
}

// Cài đặt các phương thức từ interface
func (repo *userRepository) GetByID(id string) (models.User, error) {
	var user models.User
	filter := bson.M{"_id": id}

	err := repo.collection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return models.User{}, nil // Không tìm thấy tài liệu
		}
		return models.User{}, err // Trả về lỗi nếu có
	}

	return user, nil
}

func (repo *userRepository) Create(entity models.User) error {
	_, err := repo.collection.InsertOne(context.Background(), entity)
	return err
}

func (repo *userRepository) Update(id string, entity models.User) error {
	filter := bson.M{"_id": id}
	update := bson.M{
		"$set": entity,
	}

	result, err := repo.collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments // Không tìm thấy tài liệu để cập nhật
	}

	return nil
}

func (repo *userRepository) Delete(id string) error {
	filter := bson.M{"_id": id}

	result, err := repo.collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}
	if result.DeletedCount == 0 {
		return mongo.ErrNoDocuments // Không tìm thấy tài liệu để xóa
	}

	return nil
}

// Cài đặt phương thức cụ thể GetUsersByName
func (repo *userRepository) GetUsersByName(name string) ([]models.User, error) {
	var users []models.User
	filter := bson.M{"username": bson.M{"$regex": name, "$options": "i"}} // Tìm kiếm theo tên với regex

	cursor, err := repo.collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var user models.User
		if err := cursor.Decode(&user); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

// Cài đặt phương thức GetUserByEmail
func (repo *userRepository) GetUserByEmail(email string) (models.User, error) {
	var user models.User

	// Tạo context để tìm kiếm với thời gian chờ
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Tạo bộ lọc để tìm kiếm theo email
	filter := bson.M{"email": email}

	// Tìm người dùng với bộ lọc
	err := repo.collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// Không tìm thấy người dùng nào với email này
			return models.User{}, nil
		}
		// Có lỗi khác khi truy vấn
		return models.User{}, err
	}

	return user, nil
}
