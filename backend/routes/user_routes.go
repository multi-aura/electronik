package routes

import (
	"electronik/internal/controllers"
	"electronik/internal/middlewares"
	"electronik/internal/repositories"
	"electronik/internal/services"

	"github.com/gofiber/fiber/v2"
)

func SetUpUserRoutes(app *fiber.App) {
	repository := repositories.NewUserRepository(mongoDB)
	service := services.NewUserService(repository)
	controller := controllers.NewUserController(service)

	userGroup := app.Group("/user")

	userGroup.Post("/register", controller.Register)
	userGroup.Post("/login", controller.Login)
	userGroup.Delete("/delete/:id", middlewares.AuthMiddleware(), controller.DeleteUser)
	userGroup.Put("/update", middlewares.AuthMiddleware(), controller.UpdateUser)
	userGroup.Get("/profile", middlewares.AuthMiddleware(), controller.GetProfile)
}
