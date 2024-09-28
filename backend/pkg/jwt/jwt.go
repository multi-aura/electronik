package jwt

import (
	"electronik/internal/models"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(user models.User) (string, error) {
	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["username"] = user.Username
	claims["email"] = user.Email
	claims["isAdmin"] = user.IsAdmin
	claims["exp"] = time.Now().Add(time.Hour * 720).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte("electronik"))
}
