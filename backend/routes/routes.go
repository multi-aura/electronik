package routes

import (
	"electronik/internal/databases"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var mongoDB *databases.MongoDB

func SetupRoutes(app *fiber.App) {

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3001",       // Cho phép từ frontend chạy trên localhost:3001
		AllowCredentials: true,                          // Nếu bạn dùng cookies hay thông tin xác thực
		AllowMethods:     "GET,POST,PUT,DELETE",         // Các phương thức được cho phép
		AllowHeaders:     "Content-Type, Authorization", // Các headers được phép
	}))

	mongoDB = databases.Instance()
	SetUpUserRoutes(app)
	SetUpProductRoutes(app)
	SetUpCategoryRoutes(app)
}
