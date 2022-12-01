package http

import (
	"fmt"
	"net"
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

	// get time zone
	zone, _ := currentTime.Zone()

	// create time format
	timeString := fmt.Sprintf(
		timeFormat,
		currentTime.Hour(),
		currentTime.Minute(),
		currentTime.Second(),
		zone,
	)

	// create response
	r := response{
		Time:     timeString,
		TimeZone: currentTime.Location().String(),
	}

	return ctx.JSON(r)
}

func (h *Handler) checkIps(ctx *fiber.Ctx) error {
	// create user request instance
	var userRequest request

	// parse user request body
	if err := ctx.BodyParser(&userRequest); err != nil {
		return fmt.Errorf("body parse failed: %v", err)
	}

	// make a map
	results := make(map[string]string)

	// check ips validations
	for _, ip := range userRequest.Ip {
		trial := net.ParseIP(ip)
		if trial.To4() != nil {
			results[ip] = "valid"
		} else if trial.To16() != nil {
			results[ip] = "valid"
		} else {
			results[ip] = "invalid"
		}
	}

	return ctx.JSON(results)
}

func (h *Handler) Register(app *fiber.App) {
	app.Get("/api/time", h.getTime)
	app.Post("/api/ip", h.checkIps)
}
