package routes

import (
	"electronik/internal/controllers"
	"electronik/internal/repositories"
	"electronik/internal/services"

	"github.com/gofiber/fiber/v2"
)

func SetUpCategoryRoutes(app *fiber.App) {
	repository := repositories.NewCategoryRepository(mongoDB)
	service := services.NewCategoryService(repository)
	controller := controllers.NewCategoryController(service)

	categoryGroup := app.Group("/category")

	categoryGroup.Get("/all", controller.GetCategories)
	// categoryGroup.Post("/create", controller.Create)
	categoryGroup.Put("/update/:id", controller.Update)
	// categoryGroup.Delete("/delete/:id", controller.Delete)
	categoryGroup.Get("/:id", controller.GetByID)
}
