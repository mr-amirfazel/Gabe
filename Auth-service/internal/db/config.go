package db

type Config struct{
	Name string `mapstructure:"name"`
	URI  string `mapstructure:"URI"`
}