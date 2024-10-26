package models

import "electronik/pkg/utils"

type UserSummary struct {
	ID       string `bson:"userID" json:"userID" form:"userID"`
	Username string `bson:"username" json:"username" form:"username"`
	Avatar   string `bson:"avatar" json:"avatar" form:"avatar"`
	IsActive bool   `bson:"isActive" json:"isActive" form:"isActive"`
}

func (u *UserSummary) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"userID":   u.ID,
		"username": u.Username,
		"avatar":   u.Avatar,
		"isActive": u.IsActive,
	}
}

func (u *UserSummary) FromMap(data map[string]interface{}) (*UserSummary, error) {
	return &UserSummary{
		ID:       utils.GetString(data, "userID"),
		Username: utils.GetString(data, "username"),
		Avatar:   utils.GetString(data, "avatar"),
		IsActive: utils.GetBool(data, "isActive"),
	}, nil
}
