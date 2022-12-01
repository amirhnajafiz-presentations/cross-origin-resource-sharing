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

func (h *Handler) checkIp(ctx *fiber.Ctx) error {
	var userRequest request

	if err := ctx.BodyParser(&userRequest); err != nil {
		return fmt.Errorf("body parse failed: %v", err)
	}

	return ctx.JSON(userRequest)
}
