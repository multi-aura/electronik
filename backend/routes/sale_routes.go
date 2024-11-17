package routes

import (
	"electronik/internal/controllers"
	"electronik/internal/repositories"
	"electronik/internal/services"

	"github.com/gofiber/fiber/v2"
)

func SetUpSaleRoutes(app *fiber.App) {
	repository := repositories.NewSaleRepository(mongoDB)
	repositoryProduct := repositories.NewProductRepository(mongoDB)
	service := services.NewSaleService(repository, repositoryProduct)
	controller := controllers.NewSaleController(service)

	saleGroup := app.Group("/sale")

	saleGroup.Post("/all", controller.GetAllSales)
	saleGroup.Post("/create", controller.CreateSale)
	saleGroup.Get("/:id", controller.GetSaleByID)
	saleGroup.Put("/update", controller.UpdateSaleByID)
	saleGroup.Delete("/delete/:id", controller.DeleteSale)
	saleGroup.Post("/addproducts", controller.AddProductsToSale)
	saleGroup.Delete("/removeProductsFromSale", controller.RemoveProductsFromSale)

}
