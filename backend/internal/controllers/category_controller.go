package controllers

import (
	"electronik/internal/models"
	"electronik/internal/services"
	APIResponse "electronik/pkg/api_response"

	"github.com/gofiber/fiber/v2"
)

type CategoryController struct {
	service services.CategoryService
}

func NewCategoryController(service services.CategoryService) *CategoryController {
	return &CategoryController{service}
}

// Create - Thêm danh mục mới
func (cc *CategoryController) Create(c *fiber.Ctx) error {
	var category models.Category
	if err := c.BodyParser(&category); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Cannot parse JSON",
			Error:   "StatusBadRequest",
		})
	}

	if err := cc.service.Create(&category); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: err.Error(),
			Error:   "StatusBadRequest",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusCreated,
		Message: "Category created successfully",
		Data:    category,
	})
}

// GetByID - Lấy danh mục theo ID
func (cc *CategoryController) GetByID(c *fiber.Ctx) error {
	id := c.Params("id")
	category, err := cc.service.GetByID(id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusNotFound,
			Message: err.Error(),
			Error:   "StatusNotFound",
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Category retrieved successfully",
		Data:    category,
	})
}

// Update - Cập nhật danh mục
func (cc *CategoryController) Update(c *fiber.Ctx) error {
	id := c.Params("id")
	var categoryMap map[string]interface{}
	if err := c.BodyParser(&categoryMap); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Cannot parse JSON",
			Error:   "StatusBadRequest",
		})
	}

	categoryMap["id"] = id
	if err := cc.service.Update(&categoryMap); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: err.Error(),
			Error:   "StatusBadRequest",
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Category updated successfully",
		Data:    nil,
	})
}

// Delete - Xóa danh mục
func (cc *CategoryController) Delete(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := cc.service.Delete(id); err != nil {
		return c.Status(fiber.StatusNotFound).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusNotFound,
			Message: err.Error(),
			Error:   "StatusNotFound",
		})
	}

	return c.Status(fiber.StatusNoContent).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusNoContent,
		Message: "Category deleted successfully",
		Data:    nil,
	})
}

func (cc *CategoryController) GetCategories(c *fiber.Ctx) error {
	categories, err := cc.service.GetCategories()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusInternalServerError,
			Message: err.Error(),
			Error:   "StatusInternalServerError",
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Manufacturers retrieved successfully",
		Data:    categories,
	})
}
