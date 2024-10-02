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
	productGroup.Post("/CreateProduct", controller.CreateProduct)
	productGroup.Get("/GetProductByid/:id", controller.GetProductByID)
	productGroup.Put("/updateProduct/:id", controller.UpdateProduct)
	productGroup.Patch("/deleteProduct/:id", controller.DeleteProduct)
	productGroup.Get("/searchProduct", controller.SearchProducts) //http://127.0.0.1:3000/product/searchProduct?query=Update
	productGroup.Get("/", controller.GetListProductByPagination)  //http://127.0.0.1:3000/product?page=&limit=13
}
