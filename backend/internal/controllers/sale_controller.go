package controllers

import (
	"electronik/internal/models"
	"electronik/internal/services"
	APIResponse "electronik/pkg/api_response"

	"github.com/gofiber/fiber/v2"
)

type SaleController struct {
	service services.SaleService
}

func NewSaleController(service services.SaleService) *SaleController {
	return &SaleController{service}
}

func (sc *SaleController) GetAllSales(c *fiber.Ctx) error {
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

	sales, err := sc.service.GetAllSales(int(req.Page), int(req.Limit))
	if err != nil {
		return APIResponse.SendErrorResponse(c, fiber.StatusInternalServerError, "Failed to fetch sales", err.Error())
	}

	return APIResponse.SendSuccessResponse(c, fiber.StatusOK, "Sales fetched successfully", sales)
}
func (sc *SaleController) CreateSale(c *fiber.Ctx) error {
	var sale models.Sale
	if err := c.BodyParser(&sale); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Cannot parse json sale",
			Error:   "StatusBadRequest",
		})

	}
	if sale.Products == nil {
		sale.Products = []models.SaleProduct{}
	}
	if err := sc.service.CreateSale(&sale); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusInternalServerError,
			Message: err.Error(),
			Error:   "InternalServerError",
		})
	}
	return c.Status(fiber.StatusCreated).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusCreated,
		Message: "Sale create successfully",
		Data:    sale,
	})
}
func (sc *SaleController) GetSaleByID(c *fiber.Ctx) error {
	saleID := c.Params("id")
	if saleID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Missing or invalid sale id",
			Error:   "StatusBadRequest",
		})
	}
	sale, err := sc.service.GetSaleByID(saleID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusNotFound,
			Message: "Sale not found",
			Error:   "StatusNotFound",
		})
	}
	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Sale fetch successfully",
		Data:    sale,
	})

}
func (sc *SaleController) UpdateSaleByID(c *fiber.Ctx) error {
	var saleData map[string]interface{}
	err := c.BodyParser(&saleData)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Cannot parse Sale",
			Error:   "StatusBadRequest",
		})

	}
	if _, exists := saleData["_id"]; !exists {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Sale ID is required",
			Error:   "ValidationError",
		})
	}

	err = sc.service.UpdateSaleByID(&saleData)
	if err != nil {
		if err.Error() == "Sale not found" {
			return c.Status(fiber.StatusNotFound).JSON(APIResponse.ErrorResponse{
				Status:  fiber.StatusNotFound,
				Message: "Sale not found ",
				Error:   "StatusNotFound",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusInternalServerError,
			Message: "Failed to update Sale",
			Error:   err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Update sale by i	d successfully",
		Data:    saleData,
	})

}
func (sc *SaleController) DeleteSale(c *fiber.Ctx) error {
	SaleID := c.Params("id")
	if SaleID == "" {
		return APIResponse.SendErrorResponse(c, fiber.StatusBadRequest, "SaleID is required", "StatusBadRequest")
	}

	err := sc.service.DeleteSale(SaleID)
	if err != nil {
		if err.Error() == "Sale not found" {
			return APIResponse.SendErrorResponse(c, fiber.StatusNotFound, "Sale not found", "StatusNotFound")
		}
		return APIResponse.SendErrorResponse(c, fiber.StatusInternalServerError, "Failed to delete Sale", err.Error())
	}

	return APIResponse.SendSuccessResponse(c, fiber.StatusOK, "Sale and associated products deleted successfully", nil)
}

func (sc *SaleController) AddProductsToSale(c *fiber.Ctx) error {

	var request struct {
		SaleID   string               `json:"saleID"`
		Products []models.SaleProduct `json:"products"`
	}

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Invalid request body",
			Error:   "StatusBadRequest",
		})
	}

	if len(request.Products) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Product list cannot be empty",
			Error:   "StatusBadRequest",
		})
	}

	err := sc.service.AddProductToSale(request.SaleID, request.Products)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusInternalServerError,
			Message: "Failed to add products to sale",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Products added to sale successfully",
		Data: map[string]interface{}{
			"saleID":   request.SaleID,
			"products": request.Products,
		},
	})
}
func (sc *SaleController) RemoveProductsFromSale(c *fiber.Ctx) error {
	var request struct {
		SaleID     string   `json:"saleID"`
		ProductIDs []string `json:"productIDs"`
	}

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Invalid request body",
			Error:   "StatusBadRequest",
		})
	}

	if request.SaleID == "" || len(request.ProductIDs) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "Sale ID and Product IDs are required",
			Error:   "ValidationError",
		})
	}

	err := sc.service.RemoveProductsFromSale(request.SaleID, request.ProductIDs)
	if err != nil {
		if err.Error() == "Sale not found" {
			return c.Status(fiber.StatusNotFound).JSON(APIResponse.ErrorResponse{
				Status:  fiber.StatusNotFound,
				Message: "Sale not found",
				Error:   "StatusNotFound",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusInternalServerError,
			Message: "Failed to remove products from sale",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Products removed from sale successfully",
	})
}
