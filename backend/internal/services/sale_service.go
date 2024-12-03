package services

import (
	"electronik/internal/models"
	"electronik/internal/repositories"
	"errors"
)

type (
	SaleService interface {
		GetAllSales(page, limit int) ([]*models.Sale, error)
		CreateSale(sale *models.Sale) error
		GetSaleByID(id string) (*models.Sale, error)
		UpdateSaleByID(saleMap *map[string]interface{}) error
		DeleteSale(id string) error
		AddProductToSale(saleId string, products []models.SaleProduct) error
		RemoveProductsFromSale(saleID string, productIDs []string) error
	}
	saleService struct {
		repo        repositories.SaleRepository
		repoProduct repositories.ProductRepository
	}
)

func NewSaleService(repo repositories.SaleRepository, productRepo repositories.ProductRepository) SaleService {
	return &saleService{
		repo:        repo,
		repoProduct: productRepo,
	}
}
func (s *saleService) GetAllSales(page, limit int) ([]*models.Sale, error) {
	if page <= 0 || limit <= 0 {
		return nil, errors.New("Page and limit must be greater than 0")
	}
	skip := (page - 1) * limit
	return s.repo.GetALlSale(limit, skip)
}

func (s *saleService) CreateSale(sale *models.Sale) error {
	return s.repo.Create(sale)
}

func (s *saleService) GetSaleByID(id string) (*models.Sale, error) {
	if id == "" {
		return nil, errors.New("Sale id is cannot be empty")
	}
	return s.repo.GetByID(id)
}

func (s *saleService) UpdateSaleByID(saleMap *map[string]interface{}) error {
	if _, ok := (*saleMap)["_id"]; !ok {
		return errors.New("sale ID is required for update")

	}
	return s.repo.Update(saleMap)

}

func (s *saleService) DeleteSale(saleID string) error {
	if saleID == "" {
		return errors.New("SaleID is required")
	}

	// Lấy thông tin Sale từ repository
	sale, err := s.repo.GetByID(saleID)
	if err != nil {
		return errors.New("Sale not found")
	}

	// Lấy danh sách các sản phẩm trong Sale
	var productIDs []string
	for _, product := range sale.Products {
		productIDs = append(productIDs, product.ProductID.Hex())
	}

	// Xóa Sale khỏi database
	err = s.repo.Delete(saleID)
	if err != nil {
		return errors.New("Failed to delete Sale")
	}

	// Xóa thông tin Sale trong các sản phẩm liên quan
	if len(productIDs) > 0 {
		err = s.repoProduct.RemoveSaleFromProducts(productIDs)
		if err != nil {
			return errors.New("Failed to update products after Sale deletion")
		}
	}

	return nil
}

func (s *saleService) AddProductToSale(saleId string, products []models.SaleProduct) error {
	if saleId == "" {
		return errors.New("Sale ID is cannot empty ")
	}
	if len(products) == 0 {
		return errors.New("Product list cannot empty")
	}
	sale, err := s.repo.GetByID(saleId)
	if err != nil {
		return errors.New("Sale ID not found")
	}
	checkCount := 0
	for _, product := range products {
		isDuplicate := false
		for _, existingProduct := range sale.Products {
			if existingProduct.ProductID == product.ProductID {
				isDuplicate = true
				break
			}
		}
		if isDuplicate {
			continue
		}
		checkCount++
		existingProduct, err := s.repoProduct.GetByID(product.ProductID.Hex())
		if err != nil {
			return errors.New("Product not found")
		}

		SaleProduct := models.SaleProduct{
			ProductID:    existingProduct.ID,
			Status:       1,
			QuantitySale: product.QuantitySale,
		}

		err = s.repo.AddProductToSale(saleId, SaleProduct)
		if err != nil {
			return err
		}
		saleInfo := models.Sale{
			ID:                 sale.ID,
			SaleNameVi:         sale.SaleNameVi,
			DiscountPercentage: sale.DiscountPercentage,
			StartDate:          sale.StartDate,
			EndDate:            sale.EndDate,
			SaleType:           sale.SaleType,
			StatusSale:         sale.StatusSale,
		}
		err = s.repoProduct.UpdateProductWithSale(product.ProductID.Hex(), saleInfo)
		if err != nil {
			return err
		}
	}
	if checkCount == 0 {
		return errors.New("No new products were added to the sale")
	}

	return nil

}
func (s *saleService) RemoveProductsFromSale(saleID string, productIDs []string) error {
	if saleID == "" {
		return errors.New("Sale ID cannot be empty")
	}
	if len(productIDs) == 0 {
		return errors.New("Product list cannot be empty")
	}

	_, err := s.repo.GetByID(saleID)
	if err != nil {
		return errors.New("Sale not found")
	}

	err = s.repo.RemoveProductsFromSale(saleID, productIDs)
	if err != nil {
		return err
	}

	err = s.repoProduct.RemoveSaleFromProducts(productIDs)
	if err != nil {
		return err
	}

	return nil
}
