package http

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

type Handler struct{}

func (h *Handler) getTime(ctx *fiber.Ctx) error {
	t := time.Now()
	s := fmt.Sprintf("%02d:%02d:%02d %s", t.Hour(), t.Minute(), t.Second(), t.Location().String())

	return ctx.SendString(s)
}
