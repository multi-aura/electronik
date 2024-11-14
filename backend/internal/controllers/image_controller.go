package controllers

import (
	"electronik/internal/services"
	"log"

	"github.com/gofiber/fiber/v2"
)

type ImageController struct {
	storageService services.StorageService
}

func NewImageController(storageService services.StorageService) *ImageController {
	return &ImageController{storageService: storageService}
}

func (ctrl *ImageController) UploadImages(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to parse form data",
		})
	}

	files := form.File["images"]
	if len(files) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "No files provided",
		})
	}

	var uploadedURLs []string

	for _, file := range files {
		fileHeader, err := file.Open()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to open file",
			})
		}
		defer fileHeader.Close()

		uploadedURL, err := ctrl.storageService.UploadFile(fileHeader, file, "uploads")
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to upload file",
			})
		}

		uploadedURLs = append(uploadedURLs, uploadedURL)
	}

	log.Printf("Files uploaded successfully: %v\n", uploadedURLs)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Images uploaded successfully",
		"data":    uploadedURLs,
	})
}
