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
	SaleRepository interface {
		Repository[models.Sale]
		GetALlSale(limit int, skip int) ([]*models.Sale, error)
		AddProductToSale(saleID string, saleProduct models.SaleProduct) error
		RemoveProductsFromSale(saleID string, productIDs []string) error
	}
	saleRepository struct {
		db         *databases.MongoDB
		collection *mongo.Collection
	}
)

func NewSaleRepository(db *databases.MongoDB) SaleRepository {
	return &saleRepository{
		db:         db,
		collection: db.Database.Collection("sales"),
	}
}
func (c *saleRepository) StartSession() (mongo.Session, error) {
	return c.db.Client.StartSession()
}
func (c *saleRepository) Create(entity *models.Sale) error {
	session, err := c.StartSession() // Bắt đầu phiên
	if err != nil {
		return err
	}
	defer session.EndSession(context.Background())
	_, err = session.WithTransaction(context.Background(), func(sessCtx mongo.SessionContext) (interface{}, error) {
		entity.ID = primitive.NewObjectID()
		_, err = c.collection.InsertOne(sessCtx, entity)
		if err != nil {
			return nil, err
		}
		return nil, nil
	})
	if err != nil {
		return err
	}

	return nil
}

func (c *saleRepository) Delete(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	saleID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("sale id is invalid")
	}
	filter := bson.M{"_id": saleID}
	update := bson.M{"$set": bson.M{"status_sale": -1}}
	result, err := c.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return errors.New("Failed delete sale")
	}
	if result.MatchedCount == 0 {
		return errors.New("Sale not found")
	}
	return nil

}

func (c *saleRepository) GetByID(id string) (*models.Sale, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	saleID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errors.New("Invalid sale ID")
	}
	var sale models.Sale
	filter := bson.M{"_id": saleID}
	err = c.collection.FindOne(ctx, filter).Decode(&sale)
	if err != nil {
		return nil, err
	}
	return &sale, nil
}

func (o *saleRepository) GetALlSale(limit int, skip int) ([]*models.Sale, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	options := options.Find()
	options.SetLimit(int64(limit))
	options.SetSkip(int64(skip))
	cursor, err := o.collection.Find(ctx, bson.M{}, options)
	if err != nil {
		return nil, err
	}
	var Sale []*models.Sale
	if err := cursor.All(ctx, &Sale); err != nil {
		return nil, err
	}

	return Sale, nil

}

func (o *saleRepository) Update(entityMap *map[string]interface{}) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	idValue, ok := (*entityMap)["_id"]
	var saleID primitive.ObjectID
	switch id := idValue.(type) {
	case string:
		var err error
		saleID, err = primitive.ObjectIDFromHex(id)
		if err != nil {
			return errors.New("Invalid Sale ID format")
		}
	case primitive.ObjectID:
		saleID = id
	default:
		return errors.New("Sale ID must be a valid ObjectID or string")
	}
	if !ok {
		return errors.New("Sale id is required")
	}

	filter := bson.M{"_id": saleID}
	delete(*entityMap, "_id")

	update := bson.M{"$set": *entityMap}
	result, err := o.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount == 0 {
		return errors.New("No document found with the provided ID")
	}
	return nil
}

func (s *saleRepository) AddProductToSale(saleID string, saleProduct models.SaleProduct) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	objectID, err := primitive.ObjectIDFromHex(saleID)
	if err != nil {
		return errors.New("Invalid sale ID format")
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$push": bson.M{
			"products": saleProduct,
		},
	}
	result, err := s.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return errors.New("Failed to add sale porudtc")
	}
	if result.MatchedCount == 0 {
		return errors.New("No products add in sale")
	}
	return nil
}
func (s *saleRepository) RemoveProductsFromSale(saleID string, productIDs []string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	saleObjectID, err := primitive.ObjectIDFromHex(saleID)
	if err != nil {
		return fmt.Errorf("Invalid Sale ID format: %s", saleID)
	}

	productObjectIDs := make([]primitive.ObjectID, 0, len(productIDs))
	for _, id := range productIDs {
		objectID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return fmt.Errorf("Invalid Product ID format: %s", id)
		}
		productObjectIDs = append(productObjectIDs, objectID)
	}

	filter := bson.M{
		"_id": saleObjectID,
		"products.product_id": bson.M{
			"$in": productObjectIDs,
		},
	}
	update := bson.M{
		"$set": bson.M{
			"products.$[elem].status": -1,
		},
	}
	arrayFilters := options.Update().SetArrayFilters(options.ArrayFilters{
		Filters: []interface{}{
			bson.M{"elem.product_id": bson.M{"$in": productObjectIDs}},
		},
	})

	// Thực hiện cập nhật MongoDB
	result, err := s.collection.UpdateOne(ctx, filter, update, arrayFilters)
	if err != nil {
		return errors.New("Failed to update product statuses in sale")

	}
	if result.MatchedCount == 0 {
		return errors.New("No sale or products found with the given criteria")
	}

	return nil
}
