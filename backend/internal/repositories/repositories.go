package repositories

type Repository[T any] interface {
	GetByID(id string) (*T, error)
	Create(entity *T) error
	Update(entityMap *map[string]interface{}) error
	Delete(id string) error
}
