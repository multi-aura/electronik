package routes

import (
	"electronik/internal/databases"

	"github.com/gofiber/fiber/v2"
)

var mongoDB *databases.MongoDB

func SetupRoutes(app *fiber.App) {
	mongoDB = databases.Instance()
	setupUserRoutes(app)

}
