package jwt

import (
	config "electronik/internal/configs/dev"
	"electronik/internal/models"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(user models.User) (string, error) {
	claims := jwt.MapClaims{}
	claims["userID"] = user.ID
	claims["email"] = user.Email
	claims["phone"] = user.PhoneNumber
	claims["isAdmin"] = user.IsAdmin
	claims["exp"] = time.Now().Add(time.Hour * 168).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	cfg, err := config.Instance()
	if err != nil {
		return "", err
	}

	return token.SignedString([]byte(cfg.GetSecretKey()))
}
