package server

import(
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/mr-amirfazel/gabe/internal/db"
	"github.com/mr-amirfazel/gabe/internal/config"
	"github.com/mr-amirfazel/gabe/internal/handlers"
)

func greet(c echo.Context) error{
	c.JSON(200, map[string]string{"message": "server is up and running"})

	return nil
}

func main(cfg config.Config){


    // Connect to MongoDB
    err := db.ConnectDB(cfg.Database)
    if err != nil {
        panic(err)
    }

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	a := e.Group("/api")

	a.GET("", greet)
	a.POST("/login", handlers.Login)
	a.POST("/register", handlers.Register)

	e.Start(":8080")
}

func Register(cfg config.Config){
	main(cfg)
}