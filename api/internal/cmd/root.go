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
		mongoDbURI    = flag.String("mongoURI", "", "")
		mongoDatabase = flag.String("mongoDB", "", "")
	)

	// parsing flags
	flag.Parse()

	// opening mongodb connection
	db, err := mongo.NewConnection(*mongoDbURI, *mongoDatabase)
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

	// listen on 8080
	if er := app.Listen(":8080"); er != nil {
		log.Println(er)

		os.Exit(1)
	}
}
