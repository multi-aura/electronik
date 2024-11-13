package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Sale struct {
	ID                 primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty" form:"_id"`
	SaleNameVi         string             `bson:"saleNameVi" json:"saleNameVi" validate:"required" form:"saleNameVi"`
	SaleNameEn         string             `bson:"saleNameEn" json:"saleNameEn" validate:"required" form:"saleNameEn"`
	StartDate          time.Time          `bson:"start_date" json:"startDate" validate:"required" form:"startDate"`
	EndDate            time.Time          `bson:"end_date" json:"endDate" validate:"required" form:"endDate"`
	DiscountPercentage int                `bson:"discount_percentage" json:"discountPercentage" validate:"required,gte=0,lte=100" form:"discountPercentage"`
	Products           []SaleProduct      `bson:"products" json:"products" validate:"required,dive" form:"products"`
}

type SaleProduct struct {
	ProductID    primitive.ObjectID `bson:"product_id" json:"productId" validate:"required" form:"productId"`
	Status       string             `bson:"status" json:"status" validate:"required,oneof=active inactive" form:"status"`
	QuantitySale int                `bson:"quantity_sale" json:"quantitySale" validate:"required,gte=0" form:"quantitySale"`
}
