package services

import (
	"electronik/internal/models"
	"electronik/internal/repositories"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type UserService interface {
	Register(user *models.User) error
	Login(email string) (*models.User, error)
	Logout(userID string) error
	DeleteAccount(userID string) error
	Update(userID string, user *models.User) error
	ForgotPassword(email string) error
	ChangePassword(userID, oldPassword, newPassword string) error
}

type userService struct {
	repo repositories.UserRepository
}

func NewUserService(repo repositories.UserRepository) UserService {
	return &userService{repo}
}

func (s *userService) Register(user *models.User) error {
	// Hash the password before saving
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)
	return s.repo.Create(*user)
}

func (s *userService) Login(email string) (*models.User, error) {
	user, err := s.repo.GetUserByEmail(email)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *userService) Logout(userID string) error {
	// Implement logout logic, such as invalidating tokens, if applicable
	return nil
}

func (s *userService) DeleteAccount(userID string) error {
	return s.repo.Delete(userID) // Gọi phương thức Delete trong UserRepository
}

func (s *userService) Update(userID string, user *models.User) error {
	// Update user information. Ensure that the user ID matches.
	return s.repo.Update(userID, *user) // Gọi phương thức Update trong UserRepository
}

func (s *userService) ForgotPassword(email string) error {
	// Implement password recovery logic, such as sending a reset link or code via email.
	// This is a placeholder for the actual implementation.
	return nil
}

func (s *userService) ChangePassword(userID, oldPassword, newPassword string) error {
	user, err := s.repo.GetByID(userID) // Sử dụng GetByID từ UserRepository
	if err != nil {
		return err
	}
	// if user == (models.User{}) {
	// 	return errors.New("user not found")
	// }
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(oldPassword)); err != nil {
		return errors.New("invalid old password")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)
	return s.repo.Update(userID, user) // Cập nhật lại mật khẩu
}
