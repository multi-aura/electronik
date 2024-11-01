package repositories

import (
	"context"
	"electronik/internal/databases"
	"electronik/internal/models"
	"errors"
	"time"

	"github.com/bwmarrin/snowflake"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type (
	// ProductRepository nhúng interface Repository
	ProductRepository interface {
		Repository[models.Product]
		GetByIDs(ids []string) ([]*models.Product, error)
		GetProductsByPagination(limit int, skip int) ([]*models.Product, error)
		GetProductsBySearch(limit int, skip int, query string) ([]*models.Product, error)
		UpdateStatus(id string, status int) error
		GetOnSaleProducts(limit int, skip int) ([]*models.Product, error)
		GetProductsByCategoryID(limit, skip int, categoryID, manufacturer string) ([]*models.Product, error)
		GetSimilarProducts(productId string, limit int64) ([]*models.Product, error)
		UpdateVariantStock(variantID string, quantityPurchased int) error
		UpdateSerialForAllVariants() error
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
			return nil, err
		}
		return nil, err
	}
	return &product, nil
}

func (pro *productRepository) GetByIDs(ids []string) ([]*models.Product, error) {
	var products []*models.Product
	objectIDs := make([]primitive.ObjectID, 0, len(ids))

	for _, id := range ids {
		objectID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return nil, err
		}
		objectIDs = append(objectIDs, objectID)
	}

	if len(objectIDs) == 0 {
		return nil, errors.New("no valid ObjectIDs provided")
	}

	filter := bson.M{"variants._id": bson.M{"$in": objectIDs}}

	// Truy vấn MongoDB
	cursor, err := pro.collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	if err = cursor.All(context.Background(), &products); err != nil {
		return nil, err
	}

	return products, nil
}

func (pro *productRepository) Create(entity *models.Product) error {
	entity.ID = primitive.NewObjectID()

	if entity.Category.ID == primitive.NilObjectID {
		entity.Category.ID = primitive.NewObjectID()
	}

	node, err := snowflake.NewNode(1)
	if err != nil {
		return err
	}

	for i := range entity.Variants {
		// Set MongoDB ObjectID for each Variant ID
		entity.Variants[i].ID = primitive.NewObjectID()

		// Generate Snowflake ID for the Serial field of each Variant
		entity.Variants[i].Serial = node.Generate().Int64()

		// Loop through each image in the variant and assign ObjectIDs
		for j := range entity.Variants[i].Images {
			entity.Variants[i].Images[j].ID = primitive.NewObjectID()
		}
	}

	_, err = pro.collection.InsertOne(context.Background(), entity)
	return err
}

func (pro *productRepository) UpdateSerialForAllVariants() error {
	// Tạo node Snowflake để sinh ID
	node, err := snowflake.NewNode(1)
	if err != nil {
		return err
	}

	// Tìm tất cả các sản phẩm
	cursor, err := pro.collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	// Lặp qua từng sản phẩm
	for cursor.Next(context.Background()) {
		var product models.Product
		if err := cursor.Decode(&product); err != nil {
			return err
		}

		// Cập nhật serial cho từng variant
		for i := range product.Variants {
			product.Variants[i].Serial = node.Generate().Int64()
		}

		// Cập nhật sản phẩm trong cơ sở dữ liệu
		filter := bson.M{"_id": product.ID}
		update := bson.M{"$set": bson.M{"variants": product.Variants}}

		if _, err := pro.collection.UpdateOne(context.Background(), filter, update); err != nil {
			return err
		}
	}

	if err := cursor.Err(); err != nil {
		return err
	}

	return nil
}

func (pro *productRepository) Update(entity *map[string]interface{}) error {
	id, ok := (*entity)["_id"].(primitive.ObjectID)
	if !ok {
		return errors.New("invalid _id type, expected ObjectID")
	}

	// Xóa `_id` khỏi `entity` để tránh update `_id`
	delete(*entity, "_id")

	// Filter theo `_id`
	filter := bson.M{"_id": id}

	// Xây dựng query update
	updateQuery := bson.M{"$set": entity}
	result, err := pro.collection.UpdateOne(context.Background(), filter, updateQuery)
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return errors.New("no document found")
	}

	return nil
}

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
				{"nameVi": bson.M{"$regex": query, "$options": "i"}},        // Tìm kiếm theo tên sản phẩm (không phân biệt chữ hoa, chữ thường)
				{"nameEn": bson.M{"$regex": query, "$options": "i"}},        // Tìm kiếm theo tên sản phẩm (không phân biệt chữ hoa, chữ thường)
				{"descriptionVi": bson.M{"$regex": query, "$options": "i"}}, // Tìm kiếm trong mô tả sản phẩm
				{"descriptionEn": bson.M{"$regex": query, "$options": "i"}}, // Tìm kiếm trong mô tả sản phẩm
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

func (pro *productRepository) GetProductsByCategoryID(limit, skip int, categoryID, manufacturer string) ([]*models.Product, error) {
	var results []*models.Product
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	categoryObjID, err := primitive.ObjectIDFromHex(categoryID)
	if err != nil {
		return nil, errors.New("invalid category ID")
	}

	filter := bson.D{{Key: "category._id", Value: categoryObjID}}

	if manufacturer != "" {
		filter = append(filter, bson.E{Key: "manufacturer", Value: manufacturer})
	}

	cursor, err := pro.collection.Find(ctx, filter, options.Find().SetLimit(int64(limit)).SetSkip(int64(skip)))
	if err != nil {
		return nil, err
	}
	defer func() {
		if err := cursor.Close(ctx); err != nil {

		}
	}()

	for cursor.Next(ctx) {
		var product models.Product
		if err := cursor.Decode(&product); err != nil {
			return nil, err
		}
		results = append(results, &product)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return results, nil
}

func (pro *productRepository) GetSimilarProducts(productId string, limit int64) ([]*models.Product, error) {
	var product models.Product
	objectID, err := primitive.ObjectIDFromHex(productId)
	if err != nil {
		return nil, err
	}

	filter := bson.M{"_id": objectID}
	err = pro.collection.FindOne(context.Background(), filter).Decode(&product)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("no document found")
		}
		return nil, err
	}

	similarProducts := make([]*models.Product, 0)

	queryFilter := bson.M{
		"category._id": product.Category.ID,
		"_id":          bson.M{"$ne": objectID},
	}

	opts := options.Find().SetSort(bson.D{
		{Key: "sale.discount_percentage", Value: -1},
		{Key: "price", Value: -1},
	}).SetLimit(limit)

	cursor, err := pro.collection.Find(context.Background(), queryFilter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	if err = cursor.All(context.Background(), &similarProducts); err != nil {
		return nil, err
	}

	return similarProducts, nil
}

func (pro *productRepository) UpdateVariantStock(variantID string, quantityPurchased int) error {
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

	result, err := pro.collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount == 0 {
		return errors.New("variant not found in product")
	}

	return nil
}
