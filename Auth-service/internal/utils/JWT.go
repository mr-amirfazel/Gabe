package utils

import (
	"time"
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

	// generateJWTToken generates a JWT token for the user ID
func GenerateJWTToken(userID primitive.ObjectID, username string) string {
	// Your secret key for signing the token
	secretKey := "2x_Pud8W1ODk4qIffFlE0U8awL-pce3OiT-c2OTWYp0"
	
		// Create the token
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["id"] = userID
		claims["username"] = username
		claims["exp"] = time.Now().Add(time.Hour * 24).Unix() // Example: Token expires in 24 hours
	
		// Sign the token with your secret key
		tokenString, err := token.SignedString([]byte(secretKey))
		if err != nil {
			// Handle error (e.g., log it)
			return ""
		}
	
		return tokenString
}