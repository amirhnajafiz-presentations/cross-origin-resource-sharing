package http

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	errEmptyUser = errors.New("user cannot be empty")
)

// Handler manages the http endpoint methods.
type Handler struct {
	Mongo *mongo.Database
}

func (h *Handler) Namespace(ctx *fiber.Ctx) error {
	// get the user from request
	user := ctx.Params("user", "")
	if user == "" {
		return errEmptyUser
	}

	// todo: make http request to get repositories or tags
	return ctx.SendString("hello world")
}

// Health method returns a status of our service.
func (h *Handler) Health(ctx *fiber.Ctx) error {
	// creating a context
	mongoContext := context.TODO()

	// ping mongodb
	if er := h.Mongo.Client().Ping(mongoContext, nil); er != nil {
		return fmt.Errorf("mongodb ping failed: %v", er)
	}

	return ctx.SendString(fmt.Sprintf("OK\n\t%s", time.Now().String()))
}

func (h *Handler) Register(app *fiber.App) {
	app.Get("/api/health", h.Health)
	app.Get("/api/user/:user", h.Namespace)
}
