# Dockerfile for Chat-service
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Ensure .env is copied to the container
COPY .env .env

# Build the NestJS app
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
