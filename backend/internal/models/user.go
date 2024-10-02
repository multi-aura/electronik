package models

import (
	"github.com/google/go-cmp/cmp"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID                primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
	Username          string             `bson:"username" json:"username" form:"username"`
	Email             string             `bson:"email" json:"email" form:"email"`
	Password          string             `bson:"password" json:"password" form:"password"`
	PhoneNumber       string             `bson:"phone_number" json:"phone_number" form:"phone_number"`
	IsAdmin           bool               `bson:"is_admin" json:"is_admin" form:"is_admin"`
	DeliveryAddresses []DeliveryAddress  `bson:"delivery_addresses" json:"delivery_addresses" form:"delivery_addresses"`
}

type LoginRequest struct {
	Email    string `bson:"email" json:"email" form:"email"`
	Password string `bson:"password" json:"password" form:"password"`
}

func (u *User) Compare(other *User) bool {
	return cmp.Equal(u, other, cmp.FilterPath(func(path cmp.Path) bool {
		// Exclude the fields that you don't want to compare
		switch path.Last().String() {
		case ".ID", ".Password":
			return true
		}
		return false
	}, cmp.Ignore()))
}
