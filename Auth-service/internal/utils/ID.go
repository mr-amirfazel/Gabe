package utils

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GenarateUserID() primitive.ObjectID{
	objID:= primitive.NewObjectID()
	return objID
}