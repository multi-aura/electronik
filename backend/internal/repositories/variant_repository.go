package repositories

import (
	"electronik/internal/databases"
	"electronik/internal/models"
	"errors"
	"strconv"

	"context"
	"time"

	"github.com/bwmarrin/snowflake"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type VariantRepository interface {
	AddVariantToProduct(productID string, variant *models.Variant) error
}

type variantRepository struct {
	db         *databases.MongoDB
	collection *mongo.Collection
}

func NewVariantRepository(db *databases.MongoDB) VariantRepository {
	return &variantRepository{
		db:         db,
		collection: db.Database.Collection("products"),
	}

}

func (v *variantRepository) AddVariantToProduct(productID string, variant *models.Variant) error {
	// Convert productID to ObjectID
	objectID, err := primitive.ObjectIDFromHex(productID)
	if err != nil {
		return errors.New("invalid product ID format")
	}

	// Initialize Snowflake node for serial generation
	node, err := snowflake.NewNode(1) // Node ID can be adjusted based on your setup
	if err != nil {
		return errors.New("failed to initialize snowflake node: " + err.Error())
	}

	// Generate ObjectID and Serial for the new variant
	variant.ID = primitive.NewObjectID()
	variant.Serial = strconv.FormatInt(node.Generate().Int64(), 10)

	// Assign ObjectIDs for images in the variant
	for i := range variant.Images {
		variant.Images[i].ID = primitive.NewObjectID()
	}

	// MongoDB filter to find the product by ID
	filter := bson.M{"_id": objectID}

	// MongoDB update to push the new variant into the "variants" array
	update := bson.M{
		"$push": bson.M{"variants": variant},
	}

	// Set a context with timeout for the database operation
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Execute the update query
	result, err := v.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	// Check if no product was matched
	if result.MatchedCount == 0 {
		return errors.New("no product found with the given ID")
	}

	return nil
}
