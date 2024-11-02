package routes

import (
	"electronik/internal/controllers"
	"electronik/internal/middlewares"
	"electronik/internal/repositories"
	"electronik/internal/services"

	"github.com/gofiber/fiber/v2"
)

func SetUpOrderRoutes(app *fiber.App) {
	repository := repositories.NewOrderRepository(mongoDB)
	productRepository := repositories.NewProductRepository(mongoDB)
	service := services.NewOrderService(repository, productRepository)
	controller := controllers.NewOrderController(service)

	orderGroup := app.Group("/order")
	orderGroup.Post("/user", middlewares.AuthMiddleware(), controller.GetOrdersOfUser)
	orderGroup.Post("/create", middlewares.AuthMiddleware(), controller.CreateOrder)
	orderGroup.Put("/update", controller.UpdateOrder)
	orderGroup.Delete("/delete/:id", controller.DeleteOrder)
	orderGroup.Get("/:id", controller.GetOrderByID)
}
