package services

import (
	"electronik/internal/repositories"
	"mime/multipart"
)

type StorageService interface {
	UploadFile(file multipart.File, fileHeader *multipart.FileHeader, folder string) (string, error)
}

type storageService struct {
	storageRepo repositories.StorageRepository
}

func NewStorageService() StorageService {
	return &storageService{
		storageRepo: repositories.NewStorageRepository(),
	}
}

func (s *storageService) UploadFile(file multipart.File, fileHeader *multipart.FileHeader, folder string) (string, error) {
	return s.storageRepo.UploadFile(file, fileHeader, folder)
}
