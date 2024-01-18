package handlers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/mr-amirfazel/gabe/internal/db"
	"github.com/mr-amirfazel/gabe/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)


func Register(c echo.Context) error {
	// Parse request body
	var newUser models.User
	if err := c.Bind(&newUser); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Internal server error in hashing"})
	}

	// Store the user in the database
	newUser.Password = string(hashedPassword)
	// client := db.GetClient()
	collection := db.GetDB().Collection("users")
	
	// fmt.Println("collection: ", collection.Name())
	fmt.Println("collection: ", collection)
	fmt.Println("new user: ", newUser)
	
	_, err = collection.InsertOne(context.TODO(), newUser)
    if err != nil {
        return c.JSON(http.StatusInternalServerError, map[string]any{"error": err.Error()})
    }

    return c.JSON(http.StatusCreated, map[string]string{"message": "User registered successfully"})
}


func Login(c echo.Context) error {
		// Parse request body
		var loginUser models.User
		if err := c.Bind(&loginUser); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		}
	
		// Retrieve user from the database
		filter := bson.M{"username": loginUser.Username}
		result := db.GetDB().Collection("users").FindOne(context.TODO(), filter)
	
		var storedUser models.User
		if err := result.Decode(&storedUser); err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid credentials"})
		}
	
		// Compare the hashed passwords
		if err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(loginUser.Password)); err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid credentials"})
		}
	
		// Generate JWT token
		token := generateJWTToken(storedUser.ID)
	
		// Set token in response header or cookie as needed
		c.Response().Header().Set("Authorization", "Bearer "+token)
		c.SetCookie(&http.Cookie{
			Name:    "token",
			Value:   token,
			Expires: time.Now().Add(24 * time.Hour), // Example: Token expires in 24 hours
			Path:    "/",
		})
	
		return c.JSON(http.StatusOK, map[string]string{"message": "Login successful"})

		return nil
	}
	
	// generateJWTToken generates a JWT token for the user ID
func generateJWTToken(userID int) string {
		// Your secret key for signing the token
		secretKey := "your-secret-key"
	
		// Create the token
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["id"] = userID
		claims["exp"] = time.Now().Add(time.Hour * 24).Unix() // Example: Token expires in 24 hours
	
		// Sign the token with your secret key
		tokenString, err := token.SignedString([]byte(secretKey))
		if err != nil {
			// Handle error (e.g., log it)
			return ""
		}
	
		return tokenString
}
