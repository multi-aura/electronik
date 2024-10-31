package models

import (
	"electronik/pkg/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Order struct {
	ID            primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
	UserID        primitive.ObjectID `bson:"userID" json:"userID" form:"userID"`
	RecipientName string             `bson:"recipientName" json:"recipientName" validate:"required" form:"recipientName"`
	ContactPhone  string             `bson:"contactPhone" json:"contactPhone" validate:"required" form:"contactPhone"`
	AddressLine   string             `bson:"addressLine" json:"addressLine" validate:"required" form:"addressLine"`
	Ward          string             `bson:"ward" json:"ward" validate:"required" form:"ward"`
	District      string             `bson:"district" json:"district" validate:"required" form:"district"`
	Province      string             `bson:"province" json:"province" validate:"required" form:"province"`
	Country       string             `bson:"country" json:"country" validate:"required" form:"country"`
	PaymentMethod string             `bson:"paymentMethod" json:"paymentMethod" validate:"required" form:"paymentMethod"`
	PaymentStatus string             `bson:"paymentStatus" json:"paymentStatus" validate:"required" form:"paymentStatus"`
	OrderDate     time.Time          `bson:"orderDate" json:"orderDate" validate:"required" form:"orderDate"`
	Status        string             `bson:"status" json:"status" validate:"required" form:"status"`
	DeliveryFee   float64            `bson:"deliveryFee" json:"deliveryFee" validate:"required" form:"deliveryFee"`
	Total         float64            `bson:"total" json:"total" validate:"required" form:"total"`
	Details       []*OrderDetail     `bson:"details" json:"details" validate:"dive" form:"details"`
}

type OrderDetail struct {
	VariantID     primitive.ObjectID `bson:"variantID" json:"variantID" validate:"required" form:"variantID"`
	NameVi        string             `bson:"nameVi" json:"nameVi" validate:"required" form:"nameVi"`
	NameEn        string             `bson:"nameEn" json:"nameEn" validate:"required" form:"nameEn"`
	DescriptionVi string             `bson:"descriptionVi" json:"descriptionVi" validate:"required" form:"descriptionVi"`
	DescriptionEn string             `bson:"descriptionEn" json:"descriptionEn" validate:"required" form:"descriptionEn"`
	Color         string             `bson:"color" json:"color" validate:"required" form:"color"`
	Images        []*Image           `bson:"images" json:"images" validate:"required" form:"images"`
	Sale          *Sale              `bson:"sale" json:"sale" validate:"required" form:"sale"`
	Price         float64            `bson:"price" json:"price" validate:"required,gte=0" form:"price"`
	Quantity      int                `bson:"quantity" json:"quantity" validate:"required,gte=0" form:"quantity"`
	Total         float64            `bson:"total" json:"total" validate:"required,gte=0" form:"total"`
}

func (sp *OrderDetail) ToMap() (map[string]interface{}, error) {
	return map[string]interface{}{
		"variantID":     sp.VariantID,
		"nameVi":        sp.NameVi,
		"nameEn":        sp.NameEn,
		"descriptionVi": sp.DescriptionVi,
		"descriptionEn": sp.DescriptionEn,
		"color":         sp.Color,
		"images":        sp.Images,
		"sale":          sp.Sale,
		"price":         sp.Price,
		"quantity":      sp.Quantity,
		"total":         sp.Total,
	}, nil
}

func (sp *OrderDetail) FromMap(data map[string]interface{}) {
	sp.VariantID = utils.GetObjectID(data, "variantID")
	sp.NameVi = utils.GetString(data, "nameVi")
	sp.NameEn = utils.GetString(data, "nameEn")
	sp.DescriptionVi = utils.GetString(data, "descriptionVi")
	sp.DescriptionEn = utils.GetString(data, "descriptionEn")
	sp.Color = utils.GetString(data, "color")

	if images, ok := data["images"].([]interface{}); ok {
		for _, img := range images {
			if imageMap, ok := img.(map[string]interface{}); ok {
				image := &Image{}
				image.FromMap(imageMap)
				sp.Images = append(sp.Images, image)
			}
		}
	}

	if saleData, ok := data["sale"].(map[string]interface{}); ok {
		sp.Sale = &Sale{}
		sp.Sale.FromMap(saleData)
	}

	sp.Price = utils.GetFloat64(data, "price")
	sp.Quantity = utils.GetInt(data, "quantity")
	sp.Total = utils.GetFloat64(data, "total")
}

// ToMap converts an Order struct to a map
func (o *Order) ToMap() (map[string]interface{}, error) {
	details := []map[string]interface{}{}
	for _, detail := range o.Details {
		detailMap, err := detail.ToMap()
		if err != nil {
			return nil, err
		}
		details = append(details, detailMap)
	}

	return map[string]interface{}{
		"_id":           o.ID,
		"userID":        o.UserID,
		"recipientName": o.RecipientName,
		"contactPhone":  o.ContactPhone,
		"addressLine":   o.AddressLine,
		"ward":          o.Ward,
		"district":      o.District,
		"province":      o.Province,
		"country":       o.Country,
		"paymentMethod": o.PaymentMethod,
		"paymentStatus": o.PaymentStatus,
		"orderDate":     o.OrderDate,
		"status":        o.Status,
		"deliveryFee":   o.DeliveryFee,
		"total":         o.Total,
		"details":       details,
	}, nil
}

// FromMap populates an Order struct from a map
func (o *Order) FromMap(data map[string]interface{}) error {
	o.ID = utils.GetObjectID(data, "_id")
	o.UserID = utils.GetObjectID(data, "userID")
	o.RecipientName = utils.GetString(data, "recipientName")
	o.ContactPhone = utils.GetString(data, "contactPhone")
	o.AddressLine = utils.GetString(data, "addressLine")
	o.Ward = utils.GetString(data, "ward")
	o.District = utils.GetString(data, "district")
	o.Province = utils.GetString(data, "province")
	o.Country = utils.GetString(data, "country")
	o.PaymentMethod = utils.GetString(data, "paymentMethod")
	o.PaymentStatus = utils.GetString(data, "paymentStatus")
	o.OrderDate = utils.GetTime(data, "orderDate")
	o.Status = utils.GetString(data, "status")
	o.DeliveryFee = utils.GetFloat64(data, "deliveryFee")
	o.Total = utils.GetFloat64(data, "total")

	if details, ok := data["details"].([]interface{}); ok {
		for _, detailData := range details {
			if detailMap, ok := detailData.(map[string]interface{}); ok {
				detail := &OrderDetail{}
				detail.FromMap(detailMap)
				o.Details = append(o.Details, detail)
			}
		}
	}

	return nil
}
