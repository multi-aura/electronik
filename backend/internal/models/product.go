package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	Category struct {
		ID     primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
		NameVi string             `bson:"nameVi" json:"nameVi" form:"nameVi"`
		NameEn string             `bson:"nameEn" json:"nameEn" form:"nameEn"`
		Image  string             `bson:"image" json:"image" form:"image"`
	}

	CategoryRequest struct {
		Category      Category `json:"category" bson:"category"`
		Manufacturers []string `json:"manufacturers" bson:"manufacturers"`
	}

	Variant struct {
		ID            primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
		Color         string             `bson:"color" json:"color" validate:"required" form:"color"`
		Stock         int                `bson:"stock" json:"stock" validate:"required,gte=0" form:"stock"`
		Price         float64            `bson:"price" json:"price" validate:"required,gt=0" form:"price"`
		Weight        string             `bson:"weight" json:"weight" validate:"required" form:"weight"`
		SKU           string             `bson:"sku" json:"sku" validate:"required" form:"sku"`
		Images        []Image            `bson:"images" json:"images" form:"images"`
		DescriptionVi string             `bson:"descriptionVi" json:"descriptionVi" validate:"required" form:"descriptionVi"`
		DescriptionEn string             `bson:"descriptionEn" json:"descriptionEn" validate:"required" form:"descriptionEn"`
	}

	Image struct {
		ID        primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
		URL       string             `bson:"url" json:"url" validate:"required,url" form:"url"`
		IsDefault bool               `bson:"isDefault" json:"isDefault" form:"isDefault"`
	}

	Feedback struct {
		ID           primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
		UserID       primitive.ObjectID `bson:"user_id" json:"user_id" validate:"required" form:"user_id"`
		Username     string             `bson:"username" json:"username" validate:"required" form:"username"`
		ContentRated string             `bson:"content_rated" json:"content_rated" validate:"required" form:"content_rated"`
		FeedbackDate time.Time          `bson:"feedback_date" json:"feedback_date" validate:"required" form:"feedback_date"`
		NumberStar   int                `bson:"number_star" json:"number_star" validate:"required,min=1,max=5" form:"number_star"`
	}

	Specification struct {
		ID    primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty" form:"_id"`
		Name  string             `bson:"name" json:"name" validate:"required" form:"name"`
		Value string             `bson:"value" json:"value" validate:"required" form:"value"`
	}

	Sale struct {
		SaleID          primitive.ObjectID `bson:"sale_id" json:"sale_id" form:"sale_id"`
		SaleNameVi      string             `bson:"sale_nameVi" json:"sale_nameVi" validate:"required" form:"sale_nameVi"`
		SaleNameEn      string             `bson:"sale_nameEn" json:"sale_nameEn" validate:"required" form:"sale_nameEn"`
		DiscountPercent int                `bson:"discount_percentage" json:"discount_percentage" validate:"required" form:"discount_percentage"`
		StartDate       time.Time          `bson:"start_date" json:"start_date" validate:"required" form:"start_date"`
		EndDate         time.Time          `bson:"end_date" json:"end_date" validate:"required" form:"end_date"`
	}

	Product struct {
		ID             primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty" form:"_id"`
		NameVi         string             `bson:"nameVi" json:"nameVi" validate:"required" form:"nameVi"`
		NameEn         string             `bson:"nameEn" json:"nameEn" validate:"required" form:"nameEn"`
		DescriptionVi  string             `bson:"descriptionVi" json:"descriptionVi" validate:"required" form:"descriptionVi"`
		DescriptionEn  string             `bson:"descriptionEn" json:"descriptionEn" validate:"required" form:"descriptionEn"`
		CreatedAt      time.Time          `bson:"created_at" json:"created_at" form:"created_at"`
		DefaultImage   string             `bson:"default_image" json:"default_image" validate:"required,url" form:"default_image"`
		Price          float64            `bson:"price" json:"price" validate:"required,gt=0" form:"price"`
		Category       Category           `bson:"category" json:"category" validate:"required" form:"category"`
		Variants       []Variant          `bson:"variants" json:"variants" validate:"dive" form:"variants"`
		Feedbacks      []Feedback         `bson:"feedbacks" json:"feedbacks" validate:"dive" form:"feedbacks"`
		Dimensions     string             `bson:"dimensions" json:"dimensions" validate:"required" form:"dimensions"`
		Manufacturer   string             `bson:"manufacturer" json:"manufacturer" validate:"required" form:"manufacturer"`
		Specifications []Specification    `bson:"specifications" json:"specifications" validate:"required" form:"specifications"`
		Warranty       string             `bson:"warranty" json:"warranty" validate:"required" form:"warranty"`
		Weight         string             `bson:"weight" json:"weight" validate:"required" form:"weight"`
		Status         int                `bson:"status" json:"status" validate:"required" form:"status"`
		Sale           *Sale              `bson:"sale,omitempty" json:"sale,omitempty" form:"sale"`
	}
)
