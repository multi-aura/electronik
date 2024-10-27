package controllers

import (
	"electronik/internal/models"
	"electronik/internal/services"
	APIResponse "electronik/pkg/api_response"
	"log"

	"github.com/gofiber/fiber/v2"
)

type ProductController struct {
	service services.ProductService
}

func NewProductController(service services.ProductService) *ProductController {
	return &ProductController{service}
}

func (pro *ProductController) CreateProduct(c *fiber.Ctx) error {
	var product models.Product

	if err := c.BodyParser(&product); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	validationErrors, err := pro.service.NewProduct(&product)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create product",
		})
	}
	log.Printf("product created successfully:%v\n", product)

	if validationErrors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"validation_errors": validationErrors,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusCreated,
		Message: "Create product successful",
		Data:    product,
	})
}
func (pro *ProductController) GetProductByID(c *fiber.Ctx) error {
	id := c.Params("id")
	product, er := pro.service.GetProductByID(id)
	if er != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Product not found",
		})
	}
	if product == nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Product not found",
		})
	}
	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Get product successful",
		Data:    product,
	})

}
func (pro *ProductController) UpdateProduct(c *fiber.Ctx) error {
	var product models.Product

	err := c.BodyParser(&product)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}
	validationErrors, er := pro.service.UpdateProduct(&product)
	if er != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update product",
		})
	}
	// Kiểm tra nếu có lỗi validation
	if validationErrors != nil && len(validationErrors) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"validation_errors": validationErrors,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusCreated,
		Message: "update product successful",
		Data:    product,
	})
}
func (pro *ProductController) DeleteProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	err := pro.service.DeleteProduct(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete product",
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Delete product successful",
	})
}

func (pro *ProductController) SearchProducts(c *fiber.Ctx) error {
	query := c.Query("q")
	var req models.PagingRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Invalid request body",
			Error:   "StatusBadRequest",
		})
	}

	if req.Limit <= 0 {
		req.Limit = 10 // Mặc định limit là 10 nếu không cung cấp hoặc không hợp lệ
	}
	if req.Page <= 0 {
		req.Page = 1 // Mặc định page là 1 nếu không cung cấp hoặc không hợp lệ
	}

	var products []*models.Product
	var err error
	if query == "" {
		products, err = pro.service.GetListProductByPagination(int(req.Page), int(req.Limit))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to get list product",
			})
		}
	} else {
		products, err = pro.service.GetListProductBySearch(int(req.Page), int(req.Limit), query)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to get list product",
			})
		}
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Retriving product successful",
		Data:    products,
	})

}

func (pro *ProductController) UpdateListProduct(c *fiber.Ctx) error {
	var products []models.Product

	statusStr := c.Params("status")
	if statusStr == "" {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Failed to update product list",
			Error:   "Status is required",
		})
	}

	var status int
	switch statusStr {
	case "activate":
		status = 1
	case "activi":
		status = 2
	case "enabled":
		status = 0
	case "deleted":
		status = -1
	default:

		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Failed to update product list",
			Error:   "Invalid status value",
		})
	}

	err := c.BodyParser(&products)
	if err != nil {

		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Failed to update product list",
			Error:   "Invalid request body",
		})
	}

	if len(products) == 0 {

		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Failed to update product list",
			Error:   "Product list is empty",
		})
	}

	for _, product := range products {
		err := pro.service.UpdateList(product.ID.Hex(), status)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
				Status:  fiber.StatusInternalServerError,
				Message: "Failed to update product list",
				Error:   "Failed to update product with ID " + product.ID.Hex(),
			})
		}
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Product list updated successfully",
		Data:    products,
	})
}

func (pro *ProductController) GetOnSaleProducts(c *fiber.Ctx) error {
	var req models.PagingRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Invalid request body",
			Error:   "StatusBadRequest",
		})
	}

	if req.Limit <= 0 {
		req.Limit = 10 // Mặc định limit là 10 nếu không cung cấp hoặc không hợp lệ
	}
	if req.Page <= 0 {
		req.Page = 1 // Mặc định page là 1 nếu không cung cấp hoặc không hợp lệ
	}

	// Call the service method to get on-sale products
	products, err := pro.service.GetOnSaleProducts(int(req.Page), int(req.Limit))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: err.Error(),
			Error:   "StatusBadRequest",
		})
	}

	// Return the products in a success response
	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Retrieved on-sale products successfully",
		Data:    products,
	})
}
