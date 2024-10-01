package repositories

type Repository[T any] interface {
	GetByID(id string) (*T, error)
	Create(entity T) error
	Update(id string, entity T) error
	Delete(id string) error
}