package config

import (
	"log"

	"github.com/mr-amirfazel/gabe/internal/db"
	"github.com/spf13/viper"
)

type (
	Config struct{
		Database db.Config 
	}
)
var config Config


func LoadConfig(){
	viper.SetConfigFile("../../configs/conf.yml")
	viper.AddConfigPath(".")
	// viper.SetConfigType("yaml")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Error reading configuration file: %s", err)
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		log.Fatalf("Error unmarshalling configuration: %s", err)
	}
}

func GetConfig() Config {
	return config
}