package controllers

import (
	"electronik/internal/models"
	"electronik/internal/services"
	APIResponse "electronik/pkg/api_response"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type UserController struct {
	service services.UserService
}

func NewUserController(service services.UserService) *UserController {
	return &UserController{service}
}

func (uc *UserController) Register(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	user.IsAdmin = false
	err := uc.service.Register(&user)
	if err != nil {
		if err.Error() == "email already in use" {
			return c.Status(fiber.StatusConflict).JSON(APIResponse.ErrorResponse{
				Status:  fiber.StatusConflict,
				Message: "User with this email already exists",
				Error:   "EmailAlreadyInUse",
			})
		}
		// Xử lý các lỗi khác
		return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusInternalServerError,
			Message: "Failed to register user",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusCreated,
		Message: "Register successful",
		Data:    user,
	})
}

func (uc *UserController) Login(c *fiber.Ctx) error {
	var req models.LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	existingUser, err := uc.service.Login(req.Email)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusUnauthorized,
			Message: "Invalid email",
			Error:   "StatusUnauthorized",
		})
	}

	err = uc.service.ComparePassword(existingUser.Password, req.Password)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusUnauthorized,
			Message: "Invalid password",
			Error:   "StatusUnauthorized",
		})
	}

	token, err := uc.service.GenerateJWTToken(*existingUser)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusInternalServerError,
			Message: "Could not create token",
			Error:   "StatusInternalServerError",
		})
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "Login successful",
		Data: fiber.Map{
			"token": token,
			"data":  existingUser,
		},
	})
}

func (uc *UserController) DeleteUser(c *fiber.Ctx) error {
	userID := c.Params("id")

	currentUserID := c.Locals("userID").(string)
	isAdmin := c.Locals("isAdmin").(bool)

	if userID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusBadRequest,
			Message: "User ID is required",
			Error:   "StatusBadRequest",
		})
	}

	if !isAdmin && currentUserID != userID {
		return c.Status(fiber.StatusForbidden).JSON(APIResponse.ErrorResponse{
			Status:  fiber.StatusForbidden,
			Message: "You do not have permission to delete this user",
			Error:   "StatusForbidden",
		})
	}

	err := uc.service.DeleteAccount(userID)
	if err != nil {
		if strings.Contains(err.Error(), "not found") {
            return c.Status(fiber.StatusNotFound).JSON(APIResponse.ErrorResponse{
                Status:  fiber.StatusNotFound,
                Message: "User not found",
                Error:   "StatusNotFound",
            })
        }
        return c.Status(fiber.StatusInternalServerError).JSON(APIResponse.ErrorResponse{
            Status:  fiber.StatusInternalServerError,
            Message: "An error occurred while deleting user",
            Error:   "StatusInternalServerError",
        })
	}

	return c.Status(fiber.StatusOK).JSON(APIResponse.SuccessResponse{
		Status:  fiber.StatusOK,
		Message: "User deleted successfully",
		Data:    nil,
	})
}
