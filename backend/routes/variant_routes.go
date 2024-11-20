package routes

import (
	"electronik/internal/controllers"
	"electronik/internal/repositories"
	"electronik/internal/services"

	"github.com/gofiber/fiber/v2"
)

func SetUpVariantRoutes(app *fiber.App) {
	repository := repositories.NewVariantRepository(mongoDB)
	service := services.NewVariantService(repository)
	controller := controllers.NewVariantController(service)
	app.Post("/products/:productID/variants", controller.AddVariant)
}
