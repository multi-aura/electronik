package services

import (
	"electronik/internal/models"
	"electronik/internal/repositories"
	"errors"
	"time"

	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	ProductService interface {
		NewProduct(product *models.Product) ([]ErrorResponse, error)
		GetProductByID(id string) (*models.Product, error)
		GetProductsByIDs(ids []string) ([]*models.Product, error)
		UpdateProduct(product *models.Product) ([]ErrorResponse, error)
		DeleteProduct(id string) error
		GetListProductByPagination(page int, limit int) ([]*models.Product, error)
		GetListProductBySearch(page int, limit int, query string) ([]*models.Product, error)
		UpdateList(id string, status int) error
		GetOnSaleProducts(page, limit int) ([]*models.Product, error)
		GetProductsByCategoryID(page, limit int, categoryID, manufacturer string) ([]*models.Product, error)
		GetSimilarProducts(productId string, limit int64) ([]*models.Product, error)
	}
	productService struct {
		repo repositories.ProductRepository
	}
	ErrorResponse struct {
		Error       bool
		FailedField string
		Tag         string
	}
)

func NewProductService(repo repositories.ProductRepository) ProductService {
	return &productService{repo}
}
func (s *productService) NewProduct(product *models.Product) ([]ErrorResponse, error) {
	validationErrors := []ErrorResponse{}
	validate := validator.New()

	// Thực hiện kiểm tra tính hợp lệ
	err := validate.Struct(product)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var elem ErrorResponse
			elem.FailedField = err.Field()
			elem.Tag = err.Tag()
			elem.Error = true
			validationErrors = append(validationErrors, elem)
		}

		return validationErrors, nil
	}

	product.CreatedAt = time.Now()
	err = s.repo.Create(product)
	if err != nil {
		return nil, err
	}

	return nil, nil
}

func (s *productService) GetProductByID(id string) (*models.Product, error) {

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	product, err := s.repo.GetByID(objectID.Hex())
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return product, nil
}

func (s *productService) GetProductsByIDs(ids []string) ([]*models.Product, error) {
	products, err := s.repo.GetByIDs(ids)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (pro *productService) UpdateProduct(product *models.Product) ([]ErrorResponse, error) {
	var errors []ErrorResponse
	if product.ID.IsZero() {
		errors = append(errors, ErrorResponse{
			Error:       true,
			FailedField: "ID",
			Tag:         "Product ID is required",
		})
		return errors, nil
	}

	updateFields := map[string]interface{}{
		"_id":             product.ID,
		"nameVi":          product.NameVi,
		"nameEn":          product.NameEn,
		"descriptionVi":   product.DescriptionVi,
		"descriptionEn":   product.DescriptionEn,
		"default_image":   product.DefaultImage,
		"price":           product.Price,
		"category.nameVi": product.Category.NameVi,
		"category.nameEn": product.Category.NameEn,
		"variants":        product.Variants,
		"feedbacks":       product.Feedbacks,
		"dimensions":      product.Dimensions,
		"manufacturer":    product.Manufacturer,
		"specifications":  product.Specifications,
		"warranty":        product.Warranty,
		"weight":          product.Weight,
	}

	err := pro.repo.Update(&updateFields)
	if err != nil {
		errors = append(errors, ErrorResponse{
			Error:       true,
			FailedField: "product",
			Tag:         "Update failed",
		})
		return errors, err
	}

	return nil, nil
}

func (pro *productService) DeleteProduct(id string) error {
	if id == "" {
		return errors.New("product ID is required")
	}
	err := pro.repo.Delete(id)
	if err != nil {
		return err
	}
	return nil

}

func (pro *productService) UpdateList(id string, status int) error {
	if id == "" || status <= -2 {
		return errors.New("product ID is required")
	}
	err := pro.repo.UpdateStatus(id, status)
	if err != nil {
		return err
	}
	return nil

}
func (pro *productService) GetListProductByPagination(page int, limit int) ([]*models.Product, error) {
	if (page <= 0) || (limit <= 0) {
		return nil, errors.New("page and limit must be greater than 0")
	}
	skip := (page - 1) * limit
	products, err := pro.repo.GetProductsByPagination(limit, skip)
	if err != nil {
		return nil, err
	}
	return products, nil

}

func (pro *productService) GetListProductBySearch(page int, limit int, query string) ([]*models.Product, error) {
	if (page <= 0) || (limit <= 0) {
		return nil, errors.New("page and limit must be greater than 0")
	}

	skip := (page - 1) * limit
	products, err := pro.repo.GetProductsBySearch(limit, skip, query)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (pro *productService) GetOnSaleProducts(page, limit int) ([]*models.Product, error) {
	if page <= 0 || limit <= 0 {
		return nil, errors.New("page and limit must be greater than 0")
	}

	skip := (page - 1) * limit
	products, err := pro.repo.GetOnSaleProducts(limit, skip)
	if err != nil {
		return nil, err
	}

	return products, nil
}

func (s *productService) GetProductsByCategoryID(page, limit int, categoryID, manufacturer string) ([]*models.Product, error) {
	if page <= 0 || limit <= 0 {
		return nil, errors.New("page and limit must be greater than 0")
	}

	skip := (page - 1) * limit
	products, err := s.repo.GetProductsByCategoryID(limit, skip, categoryID, manufacturer)
	if err != nil {
		return nil, err
	}

	return products, nil
}

func (s *productService) GetSimilarProducts(productId string, limit int64) ([]*models.Product, error) {
	if productId == "" {
		return nil, errors.New("product ID is required")
	}

	similarProducts, err := s.repo.GetSimilarProducts(productId, limit)
	if err != nil {
		return nil, err
	}

	return similarProducts, nil
}
