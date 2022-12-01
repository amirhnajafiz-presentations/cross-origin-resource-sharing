package http

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

const (
	timeFormat = "%02d:%02d:%02d %s"
)

type Handler struct{}

func (h *Handler) getTime(ctx *fiber.Ctx) error {
	// get the current time
	currentTime := time.Now()

	// create time format
	timeString := fmt.Sprintf(
		timeFormat,
		currentTime.Hour(),
		currentTime.Minute(),
		currentTime.Second(),
		currentTime.Location().String(),
	)

	// get time zone
	zone, _ := currentTime.Zone()

	// create response
	r := timeResponse{
		time:     timeString,
		timeZone: zone,
	}

	return ctx.JSON(r)
}

func (h *Handler) checkIp(ctx *fiber.Ctx) error {
	var userRequest request

	if err := ctx.BodyParser(&userRequest); err != nil {
		return fmt.Errorf("body parse failed: %v", err)
	}

	return ctx.JSON(userRequest)
}
