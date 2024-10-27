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
	productGroup.Post("/create-product", controller.CreateProduct)
	productGroup.Get("/get-product-by-id/:id", controller.GetProductByID)
	productGroup.Put("/update-product", controller.UpdateProduct)
	productGroup.Delete("/delete-product/:id", controller.DeleteProduct)
	productGroup.Get("/search-product", controller.SearchProducts)                             //http://127.0.0.1:3000/product/searchProduct?query=Update
	productGroup.Get("/get-list-product-by-pagination", controller.GetListProductByPagination) //http://127.0.0.1:3000/product?page=&limit=13
	productGroup.Post("/update-listProduct/:status", controller.UpdateListProduct)             //http://127.0.0.1:3000/updateListProduct/activi

}
