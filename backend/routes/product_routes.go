package routes

import (
	"electronik/internal/controllers"
	"electronik/internal/repositories"
	"electronik/internal/services"

	"github.com/gofiber/fiber/v2"
)

func SetUpProductRoutes(app *fiber.App) {
	repository := repositories.NewProductRepository(mongoDB)

	service := services.NewProductService(repository)

	controller := controllers.NewProductController(service)

	productGroup := app.Group("/product")
	productGroup.Post("/create", controller.CreateProduct)
	productGroup.Put("/update/", controller.UpdateProduct)
	productGroup.Patch("/delete/:id", controller.DeleteProduct)
	productGroup.Post("/informationBySerial", controller.GetProductsBySerials)
	productGroup.Post("/information", controller.GetProductsByIDs)
	productGroup.Get("/similar", controller.GetSimilarProducts)
	productGroup.Post("/sales", controller.GetOnSaleProducts)
	productGroup.Post("/search", controller.SearchProducts)
	productGroup.Post("/search/:q", controller.SearchProducts)
	productGroup.Post("/updateListProduct/:status", controller.UpdateListProduct)
	productGroup.Post("/category/:categoryID", controller.GetProductsByCategoryID)
	productGroup.Post("/:id", controller.GetProductByID)

}
