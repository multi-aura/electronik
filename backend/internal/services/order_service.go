package services

import (
	"electronik/internal/models"
	"electronik/internal/repositories"
	"errors"
)

type (
	OrderService interface {
		Create(product *models.Order) error
		GetByID(id string) (*models.Order, error)
		Update(orderMap *map[string]interface{}) error
		Delete(id string) error
		GetOrdersOfUser(userID string, page, limit int) ([]*models.Order, error)
	}
	orderService struct {
		repo        repositories.OrderRepository
		productRepo repositories.ProductRepository
	}
)

func NewOrderService(repo repositories.OrderRepository, productRepo repositories.ProductRepository) OrderService {
	return &orderService{
		repo:        repo,
		productRepo: productRepo,
	}
}

func (s *orderService) Create(order *models.Order) error {
	return s.repo.Create(order)
}

func (s *orderService) Delete(id string) error {
	if id == "" {
		return errors.New("order ID cannot be empty")
	}
	return s.repo.Delete(id)
}

func (s *orderService) GetByID(id string) (*models.Order, error) {
	if id == "" {
		return nil, errors.New("order ID cannot be empty")
	}
	return s.repo.GetByID(id)
}

func (s *orderService) Update(orderMap *map[string]interface{}) error {
	if _, ok := (*orderMap)["_id"]; !ok {
		return errors.New("order ID is required for update")
	}
	return s.repo.Update(orderMap)
}

func (s *orderService) GetOrdersOfUser(userID string, page, limit int) ([]*models.Order, error) {
	if (page <= 0) || (limit <= 0) {
		return nil, errors.New("page and limit must be greater than 0")
	}
	skip := (page - 1) * limit
	if userID == "" {
		return nil, errors.New("user ID cannot be empty")
	}
	return s.repo.GetOrdersOfUser(userID, limit, skip)
}
