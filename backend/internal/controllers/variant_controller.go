package controllers

import (
	"electronik/internal/models"
	"electronik/internal/services"

	"github.com/gofiber/fiber/v2"
)

type VariantController struct {
	service *services.VariantService
}

func NewVariantController(service *services.VariantService) *VariantController {
	return &VariantController{service}
}

func (vc *VariantController) AddVariant(c *fiber.Ctx) error {
	productID := c.Params("productID")
	var variant models.Variant

	// Parse body into Variant struct
	if err := c.BodyParser(&variant); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Invalid request body",
			"details": err.Error(),
		})
	}

	// Call service to add variant to product
	if err := vc.service.AddVariantToProduct(productID, &variant); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Failed to add variant",
			"details": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Variant added successfully",
		"data":    variant,
	})
}
