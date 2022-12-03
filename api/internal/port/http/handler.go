package http

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

type Handler struct{}

func (h *Handler) Namespace(ctx *fiber.Ctx) error {
	// todo: make http request to get repositories or tags
	return ctx.SendString("hello world")
}

func (h *Handler) Health(ctx *fiber.Ctx) error {
	return ctx.SendString(fmt.Sprintf("OK\n\t%s", time.Now().String()))
}

func (h *Handler) Register(app *fiber.App) {
	app.Get("/api/health", h.Health)
	app.Get("/api/namespace/:namespace/repository/:repository/tags", h.Namespace)
}
