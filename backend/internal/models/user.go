package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID                primitive.ObjectID `bson:"_id" json:"id"`
	Username          string             `bson:"username" json:"username"`
	Email             string             `bson:"email" json:"email"`
	Password          string             `bson:"password" json:"password"`
	PhoneNumber       string             `bson:"phone_number" json:"phone_number"`
	IsAdmin           bool               `bson:"is_admin" json:"is_admin"`
	DeliveryAddresses []DeliveryAddress  `bson:"delivery_addresses" json:"delivery_addresses"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}