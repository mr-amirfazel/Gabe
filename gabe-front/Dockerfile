# Use the official Node.js image as a base image
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application


# Expose the port where the app will be served
EXPOSE 5173

# Command to serve the React app using the `serve` package
CMD ["npm", "run", "dev"]
