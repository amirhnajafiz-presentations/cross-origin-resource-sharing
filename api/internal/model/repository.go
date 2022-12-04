package model

// Repository model.
type Repository struct {
	Name  string `bson:"name"`
	Value string `bson:"value"`
}
