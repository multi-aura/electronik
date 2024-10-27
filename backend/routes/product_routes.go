package routes

import (
	"electronik/internal/controllers"
	"electronik/internal/repositories"
	"electronik/internal/services"

	"github.com/gofiber/fiber/v2"
)

func setupProductRoutes(app *fiber.App) {
	repository := repositories.NewProductRepository(mongoDB)
	service := services.NewProductService(repository)
	controller := controllers.NewProductController(service)

	productGroup := app.Group("/product")
	productGroup.Post("/create", controller.CreateProduct)
	productGroup.Put("/update/", controller.UpdateProduct)
	productGroup.Patch("/delete/:id", controller.DeleteProduct)
	productGroup.Get("/search", controller.SearchProducts)
	productGroup.Get("/search/:q", controller.SearchProducts)
	productGroup.Post("/updateListProduct/:status", controller.UpdateListProduct)
	productGroup.Get("/:id", controller.GetProductByID)
}
