package services

import (
	"electronik/internal/models"
	"electronik/internal/repositories"
	"electronik/pkg/jwt"
	"electronik/pkg/utils"
	"electronik/pkg/validators"
	"errors"
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type UserService interface {
	Register(req *models.RegisterRequest) error
	Login(username, password string) (*models.User, error)
	DeleteAccount(userID string) error
	Update(userMap *map[string]interface{}) error
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

func (s *userService) Register(req *models.RegisterRequest) error {
	if req.Email == "" {
		return errors.New("email is required")
	}
	if req.Username == "" {
		return errors.New("username is required")
	}
	if req.Password == "" {
		return errors.New("password is required")
	}
	if req.PhoneNumber == "" {
		return errors.New("phonenumber is required")
	}

	reqMap, err := utils.StructToMap(req)
	if err != nil {
		return errors.New("failed to convert request to map")
	}

	user := &models.User{}
	user, err = user.FromMap(reqMap)
	if err != nil {
		return errors.New("failed to convert to User")
	}

	existsEmail, _ := s.repo.GetUserByEmail(user.Email)
	if existsEmail != nil {
		return errors.New("email already exists")
	}

	existsPhone, _ := s.repo.GetUserByPhone(user.PhoneNumber)
	if existsPhone != nil {
		return errors.New("phone already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("failed to hash password")
	}
	user.Password = string(hashedPassword)

	err = s.repo.Create(user)
	if err != nil {
		return err
	}

	return nil
}

func (s *userService) Login(username, password string) (*models.User, error) {
	var user *models.User
	var err error

	if isValid := validators.IsValidateEmail(username); isValid {
		user, err = s.repo.GetUserByEmail(username)
		if err != nil {
			return nil, errors.New("user not found with this email")
		}
	} else {
		user, err = s.repo.GetUserByPhone(username)
		if err != nil {
			return nil, errors.New("user not found with this phone")
		}
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
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

func (s *userService) Update(userMap *map[string]interface{}) error {
	// Ensure "_id" exists and is a valid ObjectID
	userIDStr, ok := (*userMap)["_id"].(string)
	if !ok || userIDStr == "" {
		return errors.New("invalid or missing user ID")
	}

	// Convert the string userID to primitive.ObjectID
	userID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		return errors.New("invalid user ID format")
	}

	// Fetch existing user by ID
	_, err = s.repo.GetByID(userIDStr)
	if err != nil {
		return errors.New("user not found")
	}

	// Ensure "phone" exists and is a string before further checks
	if phone, ok := (*userMap)["phone"].(string); ok && phone != "" {
		// Check if the phone number already exists for a different user
		existingPhoneUser, _ := s.repo.GetUserByPhone(phone)
		if existingPhoneUser != nil && existingPhoneUser.ID != userID {
			return errors.New("phone number already exists for another user")
		}
	}

	// Update the user using the provided map
	if err := s.repo.Update(userMap); err != nil {
		return err
		// return errors.New("failed to update user information")
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
	// user, err := s.repo.GetByID(userID)
	// if err != nil {
	// 	return err
	// }

	// if user.ID == primitive.NilObjectID {
	// 	return errors.New("user not found")
	// }

	// if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(oldPassword)); err != nil {
	// 	return errors.New("invalid old password")
	// }

	// hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	// if err != nil {
	// 	return errors.New("failed to hash new password")
	// }

	// user.Password = string(hashedPassword)
	// if err := s.repo.Update(*user); err != nil {
	// 	return errors.New("failed to update password")
	// }

	// return nil
	return errors.New("failed to change password")
}
