package models

type DeliveryAddress struct {
	RecipientName string `bson:"recipient_name" json:"recipient_name"`
	ContactNumber string `bson:"contact_number" json:"contact_number"`
	AddressLine   string `bson:"address_line" json:"address_line"`
	Ward          string `bson:"ward" json:"ward"`
	District      string `bson:"district" json:"district"`
	Province      string `bson:"province" json:"province"`
	Country       string `bson:"country" json:"country"`
	IsDefault     bool   `bson:"is_default" json:"is_default"`
}
