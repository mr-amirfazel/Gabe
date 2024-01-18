package cmd

import (

	"github.com/mr-amirfazel/gabe/internal/cmd/server"
	"github.com/mr-amirfazel/gabe/internal/config"
)

const ExitFailure = 1

func Execute(){
	config.LoadConfig()

	cfg := config.GetConfig()

	server.Register(cfg)
}