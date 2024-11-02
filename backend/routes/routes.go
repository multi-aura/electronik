package routes

import (
	"electronik/internal/databases"
	"fmt"
	"os"
	"os/exec"

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
	SetUpOrderRoutes(app)

	app.Get("/analysis-with-emhun", func(c *fiber.Ctx) error {
		go runWorker()
		return c.SendString("Worker is running in the background...")
	})
}

func runWorker() {
	// In đường dẫn hiện tại
	wd, err := os.Getwd()
	if err != nil {
		fmt.Printf("Error getting current directory: %v\n", err)
		return
	}
	fmt.Printf("Current working directory: %s\n", wd)

	// Đường dẫn đến main.go
	cmd := exec.Command("go", "run", "cmd/worker/main.go") // Sử dụng đường dẫn tương đối từ thư mục hiện tại

	// Lấy đầu ra của lệnh
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error running worker: %v\n", err)
		fmt.Printf("Output: %s\n", output) // In đầu ra lỗi
		return
	}

	fmt.Println("Worker executed successfully.")
	fmt.Printf("Output: %s\n", output)
}
