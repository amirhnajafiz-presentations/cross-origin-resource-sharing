package http

import (
	"context"
	"errors"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/frontend-developing/cross-origin-resource-sharing/api/internal/model"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	errEmptyUser    = errors.New("user cannot be empty")
	errParsingModel = errors.New("parsing model failed")
	errHttpRequest  = errors.New("cannot create http request")
	errGitHub       = errors.New("cannot connect to github server")
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
		// parsing the result
		if err := res.Decode(&userModel); err != nil {
			return errParsingModel
		}
	} else {
		// creating http request
		req, err := http.NewRequest(
			"GET",
			fmt.Sprintf("https://api.github.com/users/%s/repos", user),
			nil,
		)
		if err != nil {
			return errHttpRequest
		}

		// creating http client
		client := http.Client{}

		// getting the response
		resp, err := client.Do(req)
		if err != nil {
			return errGitHub
		}

		if resp.StatusCode != http.StatusOK {
			return fmt.Errorf("github response error: %v", err)
		}

		// getting the response body
		body, _ := io.ReadAll(resp.Body)

		userModel.Name = user
		userModel.Value = string(body)
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
