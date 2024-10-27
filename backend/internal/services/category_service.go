package services

import (
	"electronik/internal/models"
	"electronik/internal/repositories"
	"errors"
)

type (
	CategoryService interface {
		Create(product *models.Category) error
		GetByID(id string) (*models.Category, error)
		Update(categoryMap *map[string]interface{}) error
		Delete(id string) error
		GetCategories() ([]*models.CategoryRequest, error)
	}
	categoryService struct {
		repo repositories.CategoryRepository
	}
)

func NewCategoryService(repo repositories.CategoryRepository) CategoryService {
	return &categoryService{repo}
}

func (c *categoryService) Create(product *models.Category) error {
	// Kiểm tra nếu danh mục đã tồn tại hay chưa (nếu cần)
	if product.Name == "" {
		return errors.New("category name cannot be empty")
	}
	return c.repo.Create(product)
}

func (c *categoryService) Delete(id string) error {
	// Kiểm tra nếu ID có hợp lệ không (nếu cần)
	if id == "" {
		return errors.New("category ID cannot be empty")
	}
	return c.repo.Delete(id)
}

func (c *categoryService) GetByID(id string) (*models.Category, error) {
	// Kiểm tra nếu ID có hợp lệ không (nếu cần)
	if id == "" {
		return nil, errors.New("category ID cannot be empty")
	}
	return c.repo.GetByID(id)
}

func (c *categoryService) Update(categoryMap *map[string]interface{}) error {
	// Kiểm tra nếu map có ID không (cần thiết cho việc cập nhật)
	if _, ok := (*categoryMap)["id"]; !ok {
		return errors.New("category ID is required for update")
	}
	return c.repo.Update(categoryMap)
}

func (c *categoryService) GetCategories() ([]*models.CategoryRequest, error) {
	return c.repo.GetCategories()
}
