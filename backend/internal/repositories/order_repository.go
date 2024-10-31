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
	"go.mongodb.org/mongo-driver/mongo/options"
)

type (
	OrderRepository interface {
		Repository[models.Order]
		StartSession() (mongo.Session, error)
		GetOrdersOfUser(userID string, limit int, skip int) ([]*models.Order, error)
	}

	orderRepository struct {
		db         *databases.MongoDB
		collection *mongo.Collection
	}
)

func NewOrderRepository(db *databases.MongoDB) OrderRepository {
	return &orderRepository{
		db:         db,
		collection: db.Database.Collection("orders"),
	}
}

func (o *orderRepository) StartSession() (mongo.Session, error) {
	return o.db.Client.StartSession()
}

func (o *orderRepository) Create(entity *models.Order) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	entity.ID = primitive.NewObjectID()
	entity.OrderDate = time.Now()

	_, err := o.collection.InsertOne(ctx, entity)
	if err != nil {
		return err
	}

	return nil
}

func (o *orderRepository) Delete(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	orderID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid order ID")
	}

	filter := bson.M{"_id": orderID}
	_, err = o.collection.DeleteOne(ctx, filter)
	if err != nil {
		return err
	}

	return nil
}

func (o *orderRepository) GetByID(id string) (*models.Order, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	orderID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errors.New("invalid order ID")
	}

	var order models.Order
	filter := bson.M{"_id": orderID}
	err = o.collection.FindOne(ctx, filter).Decode(&order)
	if err != nil {
		return nil, err
	}

	return &order, nil
}

func (o *orderRepository) Update(entityMap *map[string]interface{}) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	orderID, ok := (*entityMap)["_id"].(primitive.ObjectID)
	if !ok {
		return errors.New("order ID is required")
	}

	filter := bson.M{"_id": orderID}
	update := bson.M{"$set": *entityMap}

	_, err := o.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	return nil
}

func (o *orderRepository) GetOrdersOfUser(userID string, limit int, skip int) ([]*models.Order, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, errors.New("invalid user ID")
	}

	filter := bson.M{"userID": userObjectID}
	options := options.Find()
	options.SetLimit(int64(limit))
	options.SetSkip(int64(skip))

	cursor, err := o.collection.Find(ctx, filter, options)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var orders []*models.Order
	if err = cursor.All(ctx, &orders); err != nil {
		return nil, err
	}

	return orders, nil
}
