package cmd

import (
	"flag"
	"log"
	"os"

	"github.com/frontend-developing/cross-origin-resource-sharing/api/internal/port/http"
	"github.com/frontend-developing/cross-origin-resource-sharing/api/internal/storage/mongo"

	"github.com/gofiber/fiber/v2"
)

func Execute() {
	// creating flags
	var (
		port     = flag.String("port", "8080", "")
		mongodb  = flag.String("mongo", "mongodb://127.0.0.1:27017/", "")
		database = flag.String("database", "cors", "")
	)

	// parsing flags
	flag.Parse()

	// opening mongodb connection
	db, err := mongo.NewConnection(*mongodb, *database)
	if err != nil {
		log.Println(err)

		os.Exit(1)
	}

	// create new fiber app
	app := fiber.New()

	// initialize handler
	h := http.Handler{
		Mongo: db,
	}
	h.Register(app)

	// listen on given port
	if er := app.Listen(":" + *port); er != nil {
		log.Println(er)

		os.Exit(1)
	}
}
