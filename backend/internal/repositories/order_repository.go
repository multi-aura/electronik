package repositories

import (
	"context"
	"electronik/internal/databases"
	"electronik/internal/models"
	"errors"
	"strings"
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
		GetAllOrder(limit int, skip int) ([]*models.Order, error)
		UpdateStatusOrder(orderID string, status int64) error
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

func (o *orderRepository) Create(order *models.Order) error {
	session, err := o.StartSession() // Bắt đầu phiên
	if err != nil {
		return err
	}
	defer session.EndSession(context.Background()) // Đảm bảo phiên được kết thúc

	_, err = session.WithTransaction(context.Background(), func(sessCtx mongo.SessionContext) (interface{}, error) {
		order.ID = primitive.NewObjectID()
		order.OrderDate = time.Now()

		_, err := o.collection.InsertOne(sessCtx, order)
		if err != nil {
			return nil, errors.New("failed to create order: " + err.Error())
		}

		for _, item := range order.Details {
			if err := o.updateVariantStock(sessCtx, item.VariantID.Hex(), item.Quantity); err != nil {
				return nil, err
			}
		}

		return nil, nil
	})

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
func (o *orderRepository) GetAllOrder(limit int, skip int) ([]*models.Order, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	options := options.Find()
	options.SetLimit(int64(limit))
	options.SetSkip(int64(skip))

	cursor, err := o.collection.Find(ctx, bson.M{}, options)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var orders []*models.Order
	if err := cursor.All(ctx, &orders); err != nil {
		return nil, err
	}

	return orders, nil
}

func (o *orderRepository) updateVariantStock(sessCtx mongo.SessionContext, variantID string, quantityPurchased int) error {
	varID, err := primitive.ObjectIDFromHex(variantID)
	if err != nil {
		return errors.New("invalid variant ID")
	}

	filter := bson.M{
		"variants._id": varID,
	}

	update := bson.M{
		"$inc": bson.M{
			"variants.$.stock": -quantityPurchased,
		},
	}

	result, err := o.db.Database.Collection("products").UpdateOne(sessCtx, filter, update)
	if err != nil {
		if writeError, ok := err.(mongo.WriteError); ok {
			if writeError.Code == 121 {
				return errors.New("failed to update stock: stock must be an integer greater than or equal to 0")
			}
		}

		if strings.Contains(err.Error(), "write exception: write errors: [Document failed validation: ") {
			return errors.New("failed to update stock: invalid stock quantity, must be greater than or equal to 0")
		}

		return err
	}

	if result.ModifiedCount == 0 {
		return errors.New("failed to update stock: no variant found or stock update resulted in negative quantity")
	}

	return nil
}
func (o *orderRepository) UpdateStatusOrder(orderID string, status int64) error {
	orID, err := primitive.ObjectIDFromHex(orderID)
	if err != nil {
		return errors.New("Invalid order ID")
	}
	if status == 0 {
		return errors.New("Status order is invalid")
	}
	filter := bson.M{
		"_id": orID,
	}
	update := bson.M{
		"$set": bson.M{
			"status": status,
		},
	}
	_, err = o.db.Database.Collection("orders").UpdateOne(context.Background(), filter, update)
	if err != nil {
		return errors.New("Failed to update order status")
	}
	return nil
}
