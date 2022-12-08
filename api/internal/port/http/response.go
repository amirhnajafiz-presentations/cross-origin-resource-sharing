package http

import "time"

// Response type.
type Response struct {
	Date  time.Time `json:"date"`
	Value string    `json:"value"`
}
