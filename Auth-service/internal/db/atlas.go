package db

import (
	"context"
	"log"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
  )

var (
	db *mongo.Database
	client *mongo.Client
)

// ConnectDB establishes a connection to MongoDB
func ConnectDB(cfg Config) error {

	// Use the SetServerAPIOptions() method to set the Stable API version to 1
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(cfg.URI).SetServerAPIOptions(serverAPI)

	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
	panic(err)
	}

	// defer func() {
	// if err = client.Disconnect(context.TODO()); err != nil {
	// 	panic(err)
	// }
	// }()

	// Send a ping to confirm a successful connection
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
	panic(err)
	}
	log.Println("Pinged your deployment. You successfully connected to MongoDB!")

	db = client.Database(cfg.Name)
	log.Println("db is: ", db)
	return nil
}

func GetDB() *mongo.Database {
	return db
}

func GetClient() *mongo.Client{
	return client
}