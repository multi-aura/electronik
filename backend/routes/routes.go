package routes

import (
	"electronik/internal/databases"
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"strings"

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
		minUtilityStr := c.Query("minUtility", "50000")
		minUtility, err := strconv.ParseFloat(minUtilityStr, 64)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid minUtility parameter")
		}

		go func(minUtility float64) {
			if err := runWorker(minUtility); err != nil {
				fmt.Printf("Error in worker: %v\n", err)
			}
		}(minUtility)

		return c.SendString("Worker is running in the background...")
	})
	app.Get("/get-analysis-result", func(c *fiber.Ctx) error {
		// Đường dẫn tới file `result.txt`
		resultFilePath := "scripts/result.txt"

		// Đọc nội dung file
		data, err := os.ReadFile(resultFilePath)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Could not read result file")
		}
		lines := strings.Split(string(data), "\n")
		var results []map[string]interface{}

		// Duyệt qua từng dòng và tách `Itemset` và `Utility`
		for _, line := range lines {
			if strings.TrimSpace(line) == "" {
				continue
			}

			// Tìm kiếm `Itemset` và `Utility` trong mỗi dòng
			parts := strings.Split(line, ", Utility: ")
			if len(parts) != 2 {
				continue
			}

			itemsetStr := strings.TrimPrefix(parts[0], "Itemset: ")
			utilityStr := parts[1]

			// Tạo đối tượng JSON cho mỗi kết quả
			result := map[string]interface{}{
				"itemset": strings.Fields(itemsetStr), // Tách thành từng phần tử
				"utility": utilityStr,
			}
			results = append(results, result)
		}

		// Trả về JSON định dạng
		return c.JSON(fiber.Map{
			"status":  "success",
			"message": "Analysis result retrieved",
			"data":    results,
		})

	})
}

func runWorker(minUtility float64) error {
	// In đường dẫn hiện tại
	wd, err := os.Getwd()
	if err != nil {
		fmt.Printf("Error getting current directory: %v\n", err)
		return err
	}
	fmt.Printf("Current working directory: %s\n", wd)

	// Chuyển `minUtility` thành chuỗi và truyền vào lệnh `go run`
	minUtilityStr := fmt.Sprintf("%f", minUtility)
	cmd := exec.Command("go", "run", "cmd/worker/main.go", minUtilityStr)

	// Lấy đầu ra của lệnh để kiểm tra kết quả
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error running worker: %v\n", err)
		fmt.Printf("Output: %s\n", output) // In kết quả nếu có lỗi
		return err
	}

	fmt.Println("Worker executed successfully.")
	fmt.Printf("Output: %s\n", output)
	return nil
}
