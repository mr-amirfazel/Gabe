package models

type UserDTO struct {
    FirstName string `json:"firstname" form:"firstname" validate:"required"`
    LastName  string `json:"lastname" form:"lastname" validate:"required"`
    Phone     string `json:"phone" form:"phone" validate:"required"`
    Username  string `json:"username" form:"username" validate:"required"`
    Password  string `json:"password" form:"password" validate:"required"`
    Image     []byte `json:"image" form:"image"` // Binary data for the image
    Bio       string `json:"bio" form:"bio"`
}
