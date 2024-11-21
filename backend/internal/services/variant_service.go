package services

import (
	"electronik/internal/models"
	"electronik/internal/repositories"
)

type VariantService struct {
	repo repositories.VariantRepository
}

func NewVariantService(repo repositories.VariantRepository) *VariantService {
	return &VariantService{repo}
}

func (s *VariantService) AddVariantToProduct(productID string, variant *models.Variant) error {
	return s.repo.AddVariantToProduct(productID, variant)
}
