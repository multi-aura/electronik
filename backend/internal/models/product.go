package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	Category struct {
		ID   primitive.ObjectID `bson:"_id" json:"_id"`
		Name string             `bson:"name" json:"name" validate:"required"`
	}
	Variant struct {
		Color  string  `bson:"color" json:"color" validate:"required"`
		Stock  int     `bson:"stock" json:"stock" validate:"required,gte=0"`
		Price  float64 `bson:"price" json:"price" validate:"required,gt=0"`
		Weight string  `bson:"weight" json:"weight" validate:"required"`
		SKU    string  `bson:"sku" json:"sku" validate:"required"`
		Images []Image `bson:"images" json:"images"`
	}
	Image struct {
		URL string `bson:"url" json:"url" validate:"required,url"`
	}
	Feedback struct {
		ID           primitive.ObjectID `bson:"_id" json:"_id"`
		UserID       primitive.ObjectID `bson:"user_id" json:"user_id" validate:"required"`
		Username     string             `bson:"username" json:"username" validate:"required"`
		ContentRated string             `bson:"content_rated" json:"content_rated" validate:"required"`
		FeedbackDate time.Time          `bson:"feedback_date" json:"feedback_date" validate:"required"`
		NumberStar   int                `bson:"number_star" json:"number_star" validate:"required,min=1,max=5"`
	}
	Specifications struct {
		CPU      string `bson:"cpu" json:"cpu" validate:"required"`
		RAM      string `bson:"ram" json:"ram" validate:"required"`
		Storage  string `bson:"storage" json:"storage" validate:"required"`
		Graphics string `bson:"graphics" json:"graphics" validate:"required"`
	}
	Product struct {
		ID           primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
		ProductName  string             `bson:"product_name" json:"product_name" validate:"required"`
		Description  string             `bson:"description" json:"description" validate:"required"`
		CreatedAt    time.Time          `bson:"created_at" json:"created_at"`
		DefaultImage string             `bson:"default_image" json:"default_image" validate:"required,url"`
		Price        float64            `bson:"price" json:"price" validate:"required,gt=0"`
		Category     Category           `bson:"category" json:"category" validate:"required"`

		Variants       []Variant      `bson:"variants" json:"variants" validate:"dive"`
		Feedbacks      []Feedback     `bson:"feedbacks" json:"feedbacks" validate:"dive"`
		Dimensions     string         `bson:"dimensions" json:"dimensions" validate:"required"`
		Manufacturer   string         `bson:"manufacturer" json:"manufacturer" validate:"required"`
		Specifications Specifications `bson:"specifications" json:"specifications" validate:"required"`

		Warranty string `bson:"warranty" json:"warranty" validate:"required"`
		Weight   string `bson:"weight" json:"weight" validate:"required"`
	}
)
