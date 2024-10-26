package errors_handler

import (
	APIResponse "multiaura/pkg/api_response"

	"github.com/gofiber/fiber/v2"
)

func HandleError(c *fiber.Ctx, status int, message string, err error) error {
	return c.Status(status).JSON(APIResponse.ErrorResponse{
		Status:  status,
		Message: message,
		Error:   err.Error(),
	})
}