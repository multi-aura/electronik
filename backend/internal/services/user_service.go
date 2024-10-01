package services

import (
	"electronik/internal/models"
	"electronik/internal/repositories"
	"electronik/pkg/jwt"
	"errors"
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type UserService interface {
	Register(user *models.User) error
	Login(email string) (*models.User, error)
	DeleteAccount(userID string) error
	Update(userID string, user *models.User) error
	ForgotPassword(email string) error
	ChangePassword(userID, oldPassword, newPassword string) error
	ComparePassword(hashedPassword, plainPassword string) error
	GenerateJWTToken(user models.User) (string, error)
}

type userService struct {
	repo repositories.UserRepository
}

func NewUserService(repo repositories.UserRepository) UserService {
	return &userService{repo}
}

func (s *userService) Register(user *models.User) error {
	// Kiểm tra xem email đã tồn tại chưa
	existingUser, err := s.repo.GetUserByEmail(user.Email)
	if err != nil {
		return err
	}

	if existingUser != nil {
		return errors.New("email already in use")
	}
	user.ID = primitive.NewObjectID()
	// Hash the password before saving
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("failed to hash password")
	}
	user.Password = string(hashedPassword)

	// Tạo tài khoản mới
	return s.repo.Create(*user)
}

func (s *userService) Login(email string) (*models.User, error) {
	user, err := s.repo.GetUserByEmail(email)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (s *userService) ComparePassword(hashedPassword string, plainPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	if err != nil {
		return errors.New("invalid password")
	}
	return nil
}

func (s *userService) GenerateJWTToken(user models.User) (string, error) {
	token, err := jwt.GenerateToken(user)
	if err != nil {
		return "", err
	}
	return token, nil
}

func (s *userService) DeleteAccount(userID string) error {
	user, err := s.repo.GetByID(userID)
	if err != nil {
		return fmt.Errorf("user with ID %s not found: %v", userID, err)
	}

	if err := s.repo.Delete(user.ID.Hex()); err != nil {
		return fmt.Errorf("failed to delete user with ID %s: %v", user.ID.Hex(), err)
	}

	return nil
}

func (s *userService) Update(userID string, user *models.User) error {
	existingUser, err := s.repo.GetByID(userID)
	if err != nil {
		return errors.New("user not found")
	}

	if user.ID != existingUser.ID {
		return errors.New("user ID does not match")
	}

	if err := s.repo.Update(userID, *user); err != nil {
		return errors.New("failed to update user information")
	}

	return nil
}

func (s *userService) ForgotPassword(email string) error {
	// user, err := s.repo.GetUserByEmail(email)
	// if err != nil {
	// 	return errors.New("user not found")
	// }

	// resetToken, err := jwt.GenerateToken(user)
	// if err != nil {
	// 	return errors.New("failed to generate reset token")
	// }

	// if err := s.repo.SavePasswordResetToken(user.ID, resetToken); err != nil {
	// 	return errors.New("failed to save reset token")
	// }

	// err = s.mailService.SendPasswordResetEmail(user.Email, resetURL)
	// if err != nil {
	// 	return errors.New("failed to send reset email")
	// }

	return nil
}

func (s *userService) ChangePassword(userID, oldPassword, newPassword string) error {
	user, err := s.repo.GetByID(userID)
	if err != nil {
		return err
	}

	if user.ID == primitive.NilObjectID {
		return errors.New("user not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(oldPassword)); err != nil {
		return errors.New("invalid old password")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("failed to hash new password")
	}

	user.Password = string(hashedPassword)
	if err := s.repo.Update(userID, *user); err != nil {
		return errors.New("failed to update password")
	}

	return nil
}
