package model

// User model.
type User struct {
	Name  string `bson:"name"`
	Value string `bson:"value"`
}
