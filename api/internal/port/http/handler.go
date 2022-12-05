package http

import (
	"context"
	"errors"
	"fmt"
	"github.com/frontend-developing/cross-origin-resource-sharing/api/internal/model"
	"go.mongodb.org/mongo-driver/bson"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	errEmptyUser    = errors.New("user cannot be empty")
	errParsingModel = errors.New("parsing model failed")
)

// Handler manages the http endpoint methods.
type Handler struct {
	Mongo *mongo.Database
}

func (h *Handler) UserGithubRepos(ctx *fiber.Ctx) error {
	// get the user from request
	user := ctx.Params("user", "")
	if user == "" {
		return errEmptyUser
	}

	// creating mongo filter
	filter := bson.M{"name": user}

	// creating an empty model
	var userModel model.User

	// check to see that if we have user in mongo or not
	if res := h.Mongo.Collection("users").FindOne(ctx.Context(), filter, nil); res.Err() == nil {
		if err := res.Decode(&userModel); err != nil {
			return errParsingModel
		}
	} else {

	}

	// creating a new response
	response := Response{
		Value: userModel.Value,
	}

	return ctx.JSON(response)
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
	app.Get("/api/user/:user", h.UserGithubRepos)
}
