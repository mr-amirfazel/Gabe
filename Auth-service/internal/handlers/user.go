package handlers

import (
	"context"
	"io"
	"encoding/base64"
	"fmt"
	// "io/ioutil"
	"net/http"
	"time"
	"github.com/labstack/echo/v4"
	"github.com/mr-amirfazel/gabe/internal/db"
	"github.com/mr-amirfazel/gabe/internal/models"
	"github.com/mr-amirfazel/gabe/internal/utils"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
	
)


func Register(c echo.Context) error {
	// TODO: add validation for register information (username checking and etc.)
	// Parse request body
	var newUserDTO models.UserDTO
	if err := c.Bind(&newUserDTO); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}

	// fmt.Println("dto; ",newUserDTO)

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUserDTO.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Internal server error in hashing"})
	}

	imageDTo, err := c.FormFile("image")
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Broken Image"})
	}

	file, err := imageDTo.Open()
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Couldnt open file"})
	}
	defer file.Close()

	imageBytes, err := io.ReadAll(file)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to read image file"})
	}
	imageBase64 := base64.StdEncoding.EncodeToString(imageBytes)

	newUser := models.User{
		ID: 	   utils.GenarateUserID(),
		FirstName: newUserDTO.FirstName,
		LastName:  newUserDTO.LastName,
		Phone:     newUserDTO.Phone,
		Username:  newUserDTO.Username,
		Password:  string(hashedPassword),
		Image:     imageBase64,
		Bio:       newUserDTO.Bio,
	}

	fmt.Println("newUserTobeSaved: ", newUser.ID)

	collection := db.GetDB().Collection("users")
	
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
		result := db.GetDB().Collection(utils.Users).FindOne(context.TODO(), filter)
	
		var storedUser models.User
		if err := result.Decode(&storedUser); err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid credentials"})
		}
	
		// Compare the hashed passwords
		if err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(loginUser.Password)); err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid credentials"})
		}
	
		// Generate JWT token
		token := utils.GenerateJWTToken(storedUser.ID)
	
		// Set token in response header or cookie as needed
		c.Response().Header().Set("Authorization", "Bearer "+token)
		c.SetCookie(&http.Cookie{
			Name:    "token",
			Value:   token,
			Expires: time.Now().Add(24 * time.Hour), // Example: Token expires in 24 hours
			Path:    "/",
		})
	
		return c.JSON(http.StatusOK, map[string]string{"message": "Login successful"})

	}
	

