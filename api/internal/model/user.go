package model

import "time"

// User model.
type User struct {
	Name    string    `bson:"name"`
	Value   string    `bson:"value"`
	Created time.Time `bson:"created"`
}
