package controllers

import (
	"electronik/internal/models"
	"electronik/internal/services"
	APIResponse "electronik/pkg/api_response"

	"github.com/gofiber/fiber/v2"
)

type OrderController struct {
	service services.OrderService
}

func NewOrderController(service services.OrderService) *OrderController {
	return &OrderController{service}
}

func (oc *OrderController) CreateOrder(c *fiber.Ctx) error {
	var order models.Order
	if err := c.BodyParser(&order); err != nil {
		return APIResponse.SendErrorResponse(c, fiber.StatusBadRequest, "Cannot parse JSON", err.Error())
	}

	err := oc.service.Create(&order)
	if err != nil {
		return APIResponse.SendErrorResponse(c, fiber.StatusInternalServerError, "Failed to create order", err.Error())
	}

	return APIResponse.SendSuccessResponse(c, fiber.StatusCreated, "Order created successfully", order)
}

func (oc *OrderController) GetOrderByID(c *fiber.Ctx) error {
	orderID := c.Params("id")
	if orderID == "" {
		return APIResponse.SendErrorResponse(c, fiber.StatusBadRequest, "Order ID is required", "StatusBadRequest")
	}

	order, err := oc.service.GetByID(orderID)
	if err != nil {
		if err.Error() == "order not found" {
			return APIResponse.SendErrorResponse(c, fiber.StatusNotFound, "Order not found", "StatusNotFound")
		}
		return APIResponse.SendErrorResponse(c, fiber.StatusInternalServerError, "Failed to retrieve order", err.Error())
	}

	return APIResponse.SendSuccessResponse(c, fiber.StatusOK, "Order retrieved successfully", order)
}

func (oc *OrderController) UpdateOrder(c *fiber.Ctx) error {
	var orderData map[string]interface{}
	if err := c.BodyParser(&orderData); err != nil {
		return APIResponse.SendErrorResponse(c, fiber.StatusBadRequest, "Cannot parse JSON", err.Error())
	}

	if _, exists := orderData["_id"]; !exists {
		return APIResponse.SendErrorResponse(c, fiber.StatusBadRequest, "Order ID is required for update", "StatusBadRequest")
	}

	err := oc.service.Update(&orderData)
	if err != nil {
		if err.Error() == "order not found" {
			return APIResponse.SendErrorResponse(c, fiber.StatusNotFound, "Order not found", "StatusNotFound")
		}
		return APIResponse.SendErrorResponse(c, fiber.StatusInternalServerError, "Failed to update order", err.Error())
	}

	return APIResponse.SendSuccessResponse(c, fiber.StatusOK, "Order updated successfully", orderData)
}

func (oc *OrderController) DeleteOrder(c *fiber.Ctx) error {
	orderID := c.Params("id")
	if orderID == "" {
		return APIResponse.SendErrorResponse(c, fiber.StatusBadRequest, "Order ID is required", "StatusBadRequest")
	}

	err := oc.service.Delete(orderID)
	if err != nil {
		if err.Error() == "order not found" {
			return APIResponse.SendErrorResponse(c, fiber.StatusNotFound, "Order not found", "StatusNotFound")
		}
		return APIResponse.SendErrorResponse(c, fiber.StatusInternalServerError, "Failed to delete order", err.Error())
	}

	return APIResponse.SendSuccessResponse(c, fiber.StatusOK, "Order deleted successfully", nil)
}

func (oc *OrderController) GetOrdersOfUser(c *fiber.Ctx) error {
	// userID := c.Params("userID")
	// if userID == "" {
	// 	return APIResponse.SendErrorResponse(c, fiber.StatusBadRequest, "User ID is required", "StatusBadRequest")
	// }
	userID, ok := c.Locals("userID").(string)
	if !ok || userID == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusUnauthorized,
			Message: "Unauthorized",
			Error:   "StatusUnauthorized",
		})
	}

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

	orders, err := oc.service.GetOrdersOfUser(userID, int(req.Page), int(req.Limit))
	if err != nil {
		return APIResponse.SendErrorResponse(c, fiber.StatusInternalServerError, "Failed to retrieve orders", err.Error())
	}

	return APIResponse.SendSuccessResponse(c, fiber.StatusOK, "Orders retrieved successfully", orders)
}
