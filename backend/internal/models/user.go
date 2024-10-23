package models

import (
	"electronik/pkg/utils"

	"github.com/google/go-cmp/cmp"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID                primitive.ObjectID `bson:"_id" json:"_id" form:"_id"`
	Username          string             `bson:"username" json:"username" form:"username"`
	Email             string             `bson:"email" json:"email" form:"email"`
	Password          string             `bson:"password" json:"password" form:"password"`
	PhoneNumber       string             `bson:"phone" json:"phone" form:"phone"`
	Gender            string             `bson:"gender" json:"gender" form:"gender"`
	Avatar            string             `bson:"avatar" json:"avatar" form:"avatar"`
	IsAdmin           bool               `bson:"isAdmin" json:"isAdmin" form:"isAdmin"`
	DeliveryAddresses []DeliveryAddress  `bson:"deliveryAddresses" json:"deliveryAddresses" form:"deliveryAddresses"`
}

type LoginRequest struct {
	Username string `bson:"username" json:"username" form:"username"`
	Password string `bson:"password" json:"password" form:"password"`
}

type RegisterRequest struct {
	Username    string `bson:"username" json:"username" form:"username" validate:"required"`
	Email       string `bson:"email" json:"email" form:"email" validate:"required,email"`
	Password    string `bson:"password" json:"password" form:"password" validate:"required,min=3"`
	PhoneNumber string `bson:"phone" json:"phone" form:"phone" validate:"required"`
	Gender      string `bson:"gender" json:"gender" form:"gender" validate:"required"`
}

func (u *User) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"_id":      u.ID,
		"username": u.Username,
		"email":    u.Email,
		"password": u.Password,
		"phone":    u.PhoneNumber,
		"gender":   u.Gender,
		"avatar":   u.Avatar,
		"isAdmin":  u.IsAdmin,
	}
}

func (u *User) FromMap(data map[string]interface{}) (*User, error) {

	return &User{
		ID:          utils.GetObjectID(data, "_id"),
		Username:    utils.GetString(data, "username"),
		Email:       utils.GetString(data, "email"),
		Password:    utils.GetString(data, "password"),
		PhoneNumber: utils.GetString(data, "phone"),
		Gender:      utils.GetString(data, "gender"),
		Avatar:      utils.GetString(data, "avatar"),
		IsAdmin:     utils.GetBool(data, "isAdmin"),
	}, nil
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
