package controllers

import (
	"electronik/internal/models"
	"electronik/internal/services"
	APIResponse "electronik/pkg/api_response"
	"fmt"
	"log"
	"strconv"

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

	// Parse the request body into the product struct
	if err := c.BodyParser(&product); err != nil {
		log.Printf("Error parsing request body: %v\n", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Invalid request body",
			"details": err.Error(),
		})
	}

	// Validate and create the product using the service
	validationErrors, err := pro.service.NewProduct(&product)
	if err != nil {
		log.Printf("Error creating product: %v\n", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Failed to create product",
			"details": err.Error(),
		})
	}

	// Check if there were validation errors
	if validationErrors != nil {
		log.Printf("Validation errors: %v\n", validationErrors)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"validation_errors": validationErrors,
		})
	}

	log.Printf("Product created successfully: %v\n", product)

	// Return success response
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":  fiber.StatusCreated,
		"message": "Create product successful",
		"data":    product,
	})
}

func (pro *ProductController) GetProductByID(c *fiber.Ctx) error {
	id := c.Params("id")
	product, err := pro.service.GetProductByID(id)
	if err != nil || product == nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Product not found",
		})
	}

	// Chuyển đổi `Serial` thành chuỗi cho từng variant trong `product`
	for i, variant := range product.Variants {
		product.Variants[i].SerialString = fmt.Sprintf("%d", variant.Serial)
	}

	// Trả về kết quả thành công
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
			return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
				Status:  fiber.StatusBadRequest,
				Message: err.Error(),
				Error:   "StatusInternalServerError",
			})
		}
	} else {
		products, err = pro.service.GetListProductBySearch(int(req.Page), int(req.Limit), query)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
				Status:  fiber.StatusBadRequest,
				Message: err.Error(),
				Error:   "StatusInternalServerError",
			})
		}
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Retriving product successful",
		Data:    products,
	})

}
func (pro *ProductController) GetAllProducts(c *fiber.Ctx) error {
	products, err := pro.service.GetAllProducts()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to get all products",
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Retrieving all products successful",
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

func (pro *ProductController) GetProductsByCategoryID(c *fiber.Ctx) error {
	categoryID := c.Params("categoryID")
	manufacturer := c.Query("manufacturer")
	var req models.PagingRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Invalid request body",
			Error:   "StatusBadRequest",
		})
	}

	if req.Limit <= 0 {
		req.Limit = 10
	}
	if req.Page <= 0 {
		req.Page = 1
	}

	products, err := pro.service.GetProductsByCategoryID(int(req.Page), int(req.Limit), categoryID, manufacturer)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve products by category",
		})
	}

	if len(products) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusNotFound,
			Message: "No products found for this category",
			Error:   "StatusNotFound",
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Products retrieved successfully",
		Data:    products,
	})
}

func (pro *ProductController) GetProductsByIDs(c *fiber.Ctx) error {
	var request struct {
		IDs []string `json:"ids"`
	}

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Invalid request body",
			Error:   "StatusBadRequest",
		})
	}

	if len(request.IDs) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "IDs list cannot be empty",
			Error:   "StatusBadRequest",
		})
	}

	products, err := pro.service.GetProductsByIDs(request.IDs)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusInternalServerError,
			Message: err.Error(),
			// Message: "Failed to retrieve products",
			Error: "StatusInternalServerError",
		})
	}
	for _, product := range products {
		for i, variant := range product.Variants {
			product.Variants[i].SerialString = fmt.Sprintf("%d", variant.Serial)
		}
	}

	if len(products) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusNotFound,
			Message: "No products found for the provided IDs",
			Error:   "StatusNotFound",
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Products retrieved successfully",
		Data:    products,
	})
}

func (pro *ProductController) GetSimilarProducts(c *fiber.Ctx) error {
	productId := c.Query("id")
	limitStr := c.Query("limit")
	var limit int64 = 4

	if limitStr != "" {
		var err error
		limit, err = strconv.ParseInt(limitStr, 10, 64)
		if err != nil || limit <= 0 {
			limit = 4
		}
	}

	similarProducts, err := pro.service.GetSimilarProducts(productId, limit)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusNotFound,
			Message: err.Error(),
			// Message: "Failed to retrieve similar products",
			Error: "StatusNotFound",
		})
	}

	if len(similarProducts) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusNotFound,
			Message: "No similar products found",
			Error:   "StatusNotFound",
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Retrieved similar products successfully",
		Data:    similarProducts,
	})
}
func (pro *ProductController) GetProductsBySerials(c *fiber.Ctx) error {
	var request struct {
		Serials []string `json:"serials"`
	}

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Invalid request body",
			Error:   "StatusBadRequest",
		})
	}

	if len(request.Serials) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Serials list cannot be empty",
			Error:   "StatusBadRequest",
		})
	}

	// Chuyển đổi chuỗi thành int64
	var serials []int64
	for _, s := range request.Serials {
		serial, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
				Status:  fiber.StatusBadRequest,
				Message: "Invalid serial format",
				Error:   "StatusBadRequest",
			})
		}
		serials = append(serials, serial)
	}

	products, err := pro.service.GetProductsBySerials(serials)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusInternalServerError,
			Message: err.Error(),
			Error:   "StatusInternalServerError",
		})
	}

	if len(products) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusNotFound,
			Message: "No products found for the provided serials",
			Error:   "StatusNotFound",
		})
	}
	for _, product := range products {
		for i, variant := range product.Variants {
			product.Variants[i].SerialString = fmt.Sprintf("%d", variant.Serial)
		}
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Products retrieved successfully",
		Data:    products,
	})
}
