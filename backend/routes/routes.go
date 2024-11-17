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
		AllowMethods:     "GET,POST,PUT,DELETE,PATCH",   // Các phương thức được cho phép
		AllowHeaders:     "Content-Type, Authorization", // Các headers được phép
	}))

	mongoDB = databases.Instance()
	SetUpUserRoutes(app)
	SetUpProductRoutes(app)
	SetUpCategoryRoutes(app)
	SetUpOrderRoutes(app)
	SetUpSaleRoutes(app)

	SetUpImageRoutes(app)
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
			line = strings.TrimSuffix(line, "\r")
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
	app.Post("/recommend", func(c *fiber.Ctx) error {
		// Đường dẫn tới file `result.txt`
		resultFilePath := "scripts/result.txt"

		// Đọc nội dung file
		data, err := os.ReadFile(resultFilePath)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Could not read result file")
		}

		// Parse the request body for `page` and `limit`
		var requestBody struct {
			Page  int `json:"page"`
			Limit int `json:"limit"`
		}

		if err := c.BodyParser(&requestBody); err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Invalid request body")
		}

		// Validate page and limit values
		if requestBody.Page <= 0 {
			requestBody.Page = 1
		}
		if requestBody.Limit <= 0 {
			requestBody.Limit = 10
		}

		// Lấy serials từ query parameter
		serialsParam := c.Query("serials")
		if serialsParam == "" {
			return c.Status(fiber.StatusBadRequest).SendString("Missing serials parameter")
		}

		// Chuyển đổi serials thành slice
		serials := strings.Split(serialsParam, ",")
		serialsMap := make(map[string]bool)
		for _, s := range serials {
			trimmedSerial := strings.TrimSpace(s)
			serialsMap[trimmedSerial] = true
		}

		lines := strings.Split(string(data), "\n")
		var results []map[string]interface{}

		// Duyệt qua từng dòng và tách `Itemset` và `Utility`
		for _, line := range lines {
			line = strings.TrimSuffix(line, "\r")
			if strings.TrimSpace(line) == "" {
				continue
			}

			// Tìm kiếm `Itemset` và `Utility` trong mỗi dòng
			parts := strings.Split(line, ", Utility: ")
			if len(parts) != 2 {
				continue
			}

			itemsetStr := strings.TrimPrefix(parts[0], "Itemset: ")
			itemsetStr = strings.Trim(itemsetStr, "[]")
			// Tách Itemset thành slice và chuẩn hóa các phần tử
			itemset := strings.Fields(itemsetStr)
			for i := range itemset {
				itemset[i] = strings.TrimSpace(itemset[i])
			}

			// Kiểm tra nếu itemset chứa ít nhất một serial trong serialsMap
			shouldInclude := false
			remainingItems := []string{}
			for _, item := range itemset {
				if serialsMap[item] {
					shouldInclude = true
				} else {
					remainingItems = append(remainingItems, item)
				}
			}

			fmt.Printf("Serials map: %v\n", serialsMap)
			fmt.Printf("Checking itemset: %v\n", itemset)
			fmt.Printf("Should include: %v\n", shouldInclude)

			// Nếu itemset chứa serials và có phần tử khác, thêm vào kết quả
			if shouldInclude && len(remainingItems) > 0 {
				result := map[string]interface{}{
					"remainingItems": remainingItems, // Các phần tử khác trong itemset, trừ serials
				}
				results = append(results, result)
			}
		}

		// Paginate results
		startIndex := (requestBody.Page - 1) * requestBody.Limit
		endIndex := startIndex + requestBody.Limit
		if startIndex >= len(results) {
			return c.JSON(fiber.Map{
				"status":  "success",
				"message": "No more results",
				"data":    []map[string]interface{}{},
			})
		}
		if endIndex > len(results) {
			endIndex = len(results)
		}
		paginatedResults := results[startIndex:endIndex]

		return c.JSON(fiber.Map{
			"status":  "success",
			"message": "Filtered recommendation result retrieved",
			"data":    paginatedResults,
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
