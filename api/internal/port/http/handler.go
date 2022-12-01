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
	// create user request instance
	var userRequest request

	// parse user request body
	if err := ctx.BodyParser(&userRequest); err != nil {
		return fmt.Errorf("body parse failed: %v", err)
	}

	// make a map
	results := make(map[string]string)

	// check ips validations
	for _, ip := range userRequest.ip {
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
