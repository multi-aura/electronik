package models

// import (
// 	"electronik/pkg/utils"
// 	"time"

// 	"go.mongodb.org/mongo-driver/bson/primitive"
// )

// type Sale struct {
// 	ID                 primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
// 	SaleName           string             `bson:"sale_name" json:"sale_name" validate:"required" form:"sale_name"`
// 	StartDate          time.Time          `bson:"start_date" json:"start_date" validate:"required" form:"start_date"`
// 	EndDate            time.Time          `bson:"end_date" json:"end_date" validate:"required" form:"end_date"`
// 	DiscountPercentage int                `bson:"discount_percentage" json:"discount_percentage" validate:"required,min=1,max=100" form:"discount_percentage"`
// 	Products           []SaleProduct      `bson:"products" json:"products" validate:"dive" form:"products"`
// }

// type SaleProduct struct {
// 	ProductID       primitive.ObjectID `bson:"product_id" json:"product_id" validate:"required" form:"product_id"`
// 	VariantID       primitive.ObjectID `bson:"variant_id" json:"variant_id" validate:"required" form:"variant_id"`
// 	ProductName     string             `bson:"product_name" json:"product_name" validate:"required" form:"product_name"`
// 	ImageURL        string             `bson:"image_url" json:"image_url" validate:"required,url" form:"image_url"`
// 	OriginalPrice   float64            `bson:"original_price" json:"original_price" validate:"required,gt=0" form:"original_price"`
// 	DiscountedPrice float64            `bson:"discounted_price" json:"discounted_price" validate:"required,gt=0" form:"discounted_price"`
// 	Status          string             `bson:"status" json:"status" validate:"required" form:"status"`
// 	QuantitySale    int                `bson:"quantity_sale" json:"quantity_sale" validate:"required,gte=0" form:"quantity_sale"`
// }

// func (sp *SaleProduct) ToMap() (map[string]interface{}, error) {
// 	return map[string]interface{}{
// 		"product_id":       sp.ProductID,
// 		"variant_id":       sp.VariantID,
// 		"product_name":     sp.ProductName,
// 		"image_url":        sp.ImageURL,
// 		"original_price":   sp.OriginalPrice,
// 		"discounted_price": sp.DiscountedPrice,
// 		"status":           sp.Status,
// 		"quantity_sale":    sp.QuantitySale,
// 	}, nil
// }

// func (sp *SaleProduct) FromMap(data map[string]interface{}) {
// 	sp.ProductID = utils.GetObjectID(data, "product_id")
// 	sp.VariantID = utils.GetObjectID(data, "variant_id")
// 	sp.ProductName = utils.GetString(data, "product_name")
// 	sp.ImageURL = utils.GetString(data, "image_url")
// 	sp.OriginalPrice = utils.GetFloat64(data, "original_price")
// 	sp.DiscountedPrice = utils.GetFloat64(data, "discounted_price")
// 	sp.Status = utils.GetString(data, "status")
// 	sp.QuantitySale = utils.GetInt(data, "quantity_sale")
// }

// func (s *Sale) ToMap() (map[string]interface{}, error) {
// 	products := make([]map[string]interface{}, len(s.Products))
// 	for i, product := range s.Products {
// 		productMap, err := product.ToMap()
// 		if err != nil {
// 			return nil, err
// 		}
// 		products[i] = productMap
// 	}

// 	return map[string]interface{}{
// 		"_id":                 s.ID,
// 		"sale_name":           s.SaleName,
// 		"start_date":          s.StartDate.Format(time.RFC3339),
// 		"end_date":            s.EndDate.Format(time.RFC3339),
// 		"discount_percentage": s.DiscountPercentage,
// 		"products":            products,
// 	}, nil
// }

// func (s *Sale) FromMap(data map[string]interface{}) {
// 	s.ID = utils.GetObjectID(data, "_id")
// 	s.SaleName = utils.GetString(data, "sale_name")
// 	s.StartDate = utils.GetTime(data, "start_date")
// 	s.EndDate = utils.GetTime(data, "end_date")
// 	s.DiscountPercentage = utils.GetInt(data, "discount_percentage")

// 	productMaps := utils.GetArrayMap(data, "products")
// 	s.Products = make([]SaleProduct, len(productMaps))
// 	for i, productMap := range productMaps {
// 		var saleProduct SaleProduct
// 		saleProduct.FromMap(productMap)
// 		s.Products[i] = saleProduct
// 	}
// }
