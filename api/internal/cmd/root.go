package cmd

import (
	"github.com/frontend-developing/cross-origin-resource-sharing/api/internal/port/http"

	"github.com/gofiber/fiber/v2"
)

func Execute() {
	// create new fiber app
	app := fiber.New()

	// initialize handler
	h := http.Handler{}
	h.Register(app)

	// listen on 8080
	if err := app.Listen(":8080"); err != nil {
		panic(err)
	}
}
