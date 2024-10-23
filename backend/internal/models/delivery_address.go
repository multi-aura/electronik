package models

import "go.mongodb.org/mongo-driver/bson/primitive"

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
