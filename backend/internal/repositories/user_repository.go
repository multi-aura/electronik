package repositories

import (
	"context"
	"electronik/internal/databases"
	"electronik/internal/models"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository interface {
	Repository[models.User]
	GetUsersByName(name string) ([]*models.User, error)
	GetUserByEmail(email string) (*models.User, error)
	GetUserByUsername(username string) (*models.User, error)
	GetUserByPhone(phone string) (*models.User, error)
}

type userRepository struct {
	db         *databases.MongoDB
	collection *mongo.Collection
}

func NewUserRepository(db *databases.MongoDB) UserRepository {
	return &userRepository{
		db:         db,
		collection: db.Database.Collection("users"),
	}
}

func (repo *userRepository) GetByID(id string) (*models.User, error) {
	var user models.User

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return &models.User{}, err
	}

	filter := bson.M{"_id": objectID}

	err = repo.collection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func (repo *userRepository) Create(entity *models.User) error {
	entity.ID = primitive.NewObjectID()

	_, err := repo.collection.InsertOne(context.Background(), entity)
	return err
}

func (repo *userRepository) Update(entityMap *map[string]interface{}) error {
	// Kiểm tra nếu entityMap không có giá trị
	if len(*entityMap) == 0 {
		return nil
	}

	// Lấy và kiểm tra ID từ entityMap
	idStr, ok := (*entityMap)["_id"].(string)
	if !ok {
		return errors.New("missing or invalid '_id' field in entityMap")
	}

	// Chuyển đổi id từ string thành ObjectID
	id, err := primitive.ObjectIDFromHex(idStr)
	if err != nil {
		return errors.New("invalid ObjectID format")
	}

	// Tạo filter để tìm tài liệu cần cập nhật, dựa trên ObjectID
	filter := bson.M{"_id": id}

	// Loại bỏ `_id` khỏi map vì không được phép cập nhật trường này
	delete(*entityMap, "_id")

	// Tạo câu lệnh cập nhật với $set từ entityMap
	updateQuery := bson.M{"$set": *entityMap}

	// Thực hiện cập nhật
	result, err := repo.collection.UpdateOne(context.Background(), filter, updateQuery)
	if err != nil {
		return err
	}

	// Kiểm tra nếu không có tài liệu nào được tìm thấy để cập nhật
	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (repo *userRepository) Delete(id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": objectID}

	result, err := repo.collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}
	if result.DeletedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (repo *userRepository) GetUsersByName(name string) ([]*models.User, error) {
	var users []*models.User
	filter := bson.M{"username": bson.M{"$regex": name, "$options": "i"}}

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
		users = append(users, &user)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func (repo *userRepository) GetUserByUsername(username string) (*models.User, error) {
	var user models.User

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"username": username}

	err := repo.collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func (repo *userRepository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"email": email}

	err := repo.collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func (repo *userRepository) GetUserByPhone(phone string) (*models.User, error) {
	var user models.User

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"phone": phone}

	err := repo.collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}
