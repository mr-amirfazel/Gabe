package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID    `json:"id" bson:"_id,omitempty"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Phone     string `json:"phone" bson:"phone" unique:"true"`
	Username  string `json:"username" bson:"username" unique:"true"`
	Password  string `json:"password" bson:"password"`
	Image     string `json:"image" bson:"image" unique:"true"`
	Bio       string `json:"bio" bson:"bio"`
}
