package models

import (
	"electronik/pkg/utils"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DeliveryAddress struct {
	ID                 primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
	RecipientName      string             `bson:"recipientName" json:"recipientName"`
	ContactPhoneNumber string             `bson:"contactPhoneNumber" json:"contactPhoneNumber"`
	AddressLine        string             `bson:"addressLine" json:"addressLine"`
	Ward               string             `bson:"ward" json:"ward"`
	District           string             `bson:"district" json:"district"`
	Province           string             `bson:"province" json:"province"`
	Country            string             `bson:"country" json:"country"`
	IsDefault          bool               `bson:"isDefault" json:"isDefault"`
}

func (d *DeliveryAddress) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"_id":                d.ID,
		"recipientName":      d.RecipientName,
		"contactPhoneNumber": d.ContactPhoneNumber,
		"addressLine":        d.AddressLine,
		"ward":               d.Ward,
		"district":           d.District,
		"province":           d.Province,
		"country":            d.Country,
		"isDefault":          d.IsDefault,
	}
}

// Hàm FromMap để tạo struct DeliveryAddress từ map[string]interface{}
func (d *DeliveryAddress) FromMap(data map[string]interface{}) (*DeliveryAddress, error) {
	return &DeliveryAddress{
		ID:                 utils.GetObjectID(data, "_id"),
		RecipientName:      utils.GetString(data, "recipientName"),
		ContactPhoneNumber: utils.GetString(data, "contactPhoneNumber"),
		AddressLine:        utils.GetString(data, "addressLine"),
		Ward:               utils.GetString(data, "ward"),
		District:           utils.GetString(data, "district"),
		Province:           utils.GetString(data, "province"),
		Country:            utils.GetString(data, "country"),
		IsDefault:          utils.GetBool(data, "isDefault"),
	}, nil
}
