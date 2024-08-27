# Build the Go app with static linking
FROM golang:1.21.5 AS build

# Set environment variables for static linking
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64

# Set the working directory for the build
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Change directory to where main.go is located
WORKDIR /app/cmd/gabe

# Build the statically linked Go application
RUN go build -o /app/main .

# Create a minimal scratch image


# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["go", "run", "./main.go"]
