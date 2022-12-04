package model

// Namespace model.
type Namespace struct {
	Name  string `bson:"name"`
	Value string `bson:"value"`
}
