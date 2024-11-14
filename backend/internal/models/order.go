package models

import (
	"electronik/pkg/utils"
	"fmt"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Order struct {
	ID            primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
	UserID        primitive.ObjectID `bson:"userID" json:"userID" form:"userID"`
	RecipientName string             `bson:"recipientName" json:"recipientName" validate:"required" form:"recipientName"`
	ContactPhone  string             `bson:"contactPhone" json:"contactPhone" validate:"required" form:"contactPhone"`
	Email         string             `bson:"email" json:"email" validate:"required" form:"email"`
	AddressLine   string             `bson:"addressLine" json:"addressLine" validate:"required" form:"addressLine"`
	Ward          string             `bson:"ward" json:"ward" validate:"required" form:"ward"`
	District      string             `bson:"district" json:"district" validate:"required" form:"district"`
	Province      string             `bson:"province" json:"province" validate:"required" form:"province"`
	PaymentMethod string             `bson:"paymentMethod" json:"paymentMethod" validate:"required" form:"paymentMethod"`
	PaymentStatus string             `bson:"paymentStatus" json:"paymentStatus" validate:"required" form:"paymentStatus"`
	OrderDate     time.Time          `bson:"orderDate" json:"orderDate" validate:"required" form:"orderDate"`
	Status        string             `bson:"status" json:"status" validate:"required" form:"status"`
	DeliveryFee   float64            `bson:"deliveryFee" json:"deliveryFee" validate:"required" form:"deliveryFee"`
	Total         float64            `bson:"total" json:"total" validate:"required" form:"total"`
	Details       []*OrderDetail     `bson:"details" json:"details" validate:"dive" form:"details"`
}

type OrderDetail struct {
	ProductID    primitive.ObjectID `bson:"productID" json:"productID" validate:"required" form:"productID"`
	VariantID    primitive.ObjectID `bson:"variantID" json:"variantID" validate:"required" form:"variantID"`
	Serial       int64              `bson:"serial" json:"-" validate:"required" form:"serial"`
	SerialString string             `json:"serial"`
	NameVi       string             `bson:"nameVi" json:"nameVi" validate:"required" form:"nameVi"`
	Color        string             `bson:"color" json:"color" validate:"required" form:"color"`
	Image        string             `bson:"image" json:"image" validate:"required" form:"image"`
	Sale         *SaleInfo          `bson:"sale" json:"sale" form:"sale"`
	Price        float64            `bson:"price" json:"price" validate:"required,gte=0" form:"price"`
	Quantity     int                `bson:"quantity" json:"quantity" validate:"required,gte=0" form:"quantity"`
	Total        float64            `bson:"total" json:"total" validate:"required,gte=0" form:"total"`
}

type SaleInfo struct {
	SaleID             primitive.ObjectID `bson:"saleID" json:"saleID" form:"saleID"`
	SaleNameVi         string             `bson:"saleNameVi" json:"saleNameVi" form:"saleNameVi"`
	DiscountPercentage int                `bson:"discountPercentage" json:"discountPercentage" form:"discountPercentage"`
}

// ToMap converts an OrderDetail struct to a map
func (od *OrderDetail) ToMap() map[string]interface{} {
	saleMap := map[string]interface{}{}
	if od.Sale != nil {
		saleMap = map[string]interface{}{
			"saleID":             od.Sale.SaleID,
			"saleNameVi":         od.Sale.SaleNameVi,
			"discountPercentage": od.Sale.DiscountPercentage,
		}
	}

	return map[string]interface{}{
		"productID": od.ProductID,
		"variantID": od.VariantID,
		"serial":    od.Serial,
		"nameVi":    od.NameVi,
		"color":     od.Color,
		"image":     od.Image,
		"sale":      saleMap,
		"price":     od.Price,
		"quantity":  od.Quantity,
		"total":     od.Total,
	}
}

// FromMap populates an OrderDetail struct from a map
func (od *OrderDetail) FromMap(data map[string]interface{}) {
	od.ProductID = utils.GetObjectID(data, "productID")
	od.VariantID = utils.GetObjectID(data, "variantID")

	od.NameVi = utils.GetString(data, "nameVi")
	od.Color = utils.GetString(data, "color")
	od.Image = utils.GetString(data, "image")

	// Check if "sale" data exists and is of the correct type
	if saleData, ok := data["sale"].(map[string]interface{}); ok {
		od.Sale = &SaleInfo{
			SaleID:             utils.GetObjectID(saleData, "saleID"),
			SaleNameVi:         utils.GetString(saleData, "saleNameVi"),
			DiscountPercentage: utils.GetInt(saleData, "discountPercentage"),
		}
	} else {
		od.Sale = nil // Set to nil if "sale" data does not exist
	}

	od.Price = utils.GetFloat64(data, "price")
	od.Quantity = utils.GetInt(data, "quantity")
	od.Total = utils.GetFloat64(data, "total")
}

// ToMap converts an Order struct to a map
func (o *Order) ToMap() (map[string]interface{}, error) {
	details := []map[string]interface{}{}
	for _, detail := range o.Details {
		detailMap := detail.ToMap()
		details = append(details, detailMap)
	}

	return map[string]interface{}{
		"_id":           o.ID,
		"userID":        o.UserID,
		"recipientName": o.RecipientName,
		"contactPhone":  o.ContactPhone,
		"addressLine":   o.AddressLine,
		"email":         o.Email,
		"ward":          o.Ward,
		"district":      o.District,
		"province":      o.Province,
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
	o.Email = utils.GetString(data, "email")
	o.District = utils.GetString(data, "district")
	o.Province = utils.GetString(data, "province")
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
func (od *OrderDetail) SetSerialFromString() error {
	// Kiểm tra nếu `SerialString` không trống
	if od.SerialString != "" {
		// Chuyển đổi `SerialString` thành `int64`
		serial, err := strconv.ParseInt(od.SerialString, 10, 64)
		if err != nil {
			return fmt.Errorf("Invalid serial format: %v", err)
		}
		od.Serial = serial // Gán giá trị sau khi chuyển đổi cho `Serial`
	}
	return nil
}
