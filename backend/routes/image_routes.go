package routes

import (
	"electronik/internal/controllers"
	"electronik/internal/services"

	"github.com/gofiber/fiber/v2"
)

func SetUpImageRoutes(app *fiber.App) {
	storageService := services.NewStorageService()
	imageController := controllers.NewImageController(storageService)

	imageGroup := app.Group("/images")
	imageGroup.Post("/upload", imageController.UploadImages)
}
