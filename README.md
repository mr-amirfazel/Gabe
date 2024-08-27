# Gabe
![DALL·E 2024-01-15 01 42 15 - Iconic and colorful depiction of the Archangel Gabriel texting, in a minimalistic and modern style  The image features Gabriel surrounded by cosmic el](https://github.com/mr-amirfazel/Gabe/assets/78591315/e018608f-6f0e-44f7-a470-1d1bc89358f5)

## Description
  Gabe is a micro-service,  real-time chat app in order to be my Internet Engineering course project
  The name was inspired from the name "Gabriel", The Archangel
## Tech Stack
  - Backend:
      - Auth Service : Echo (a Golang framework) ![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)
      - Chat Service : NestJs (a NodeJS framework) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
  - FrontEnd:
    - ReactJs 	![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![MatreialUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
  - Data Base As A service
    - MongoDB Atlas  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
  - Real-Time data transfer
      - Socket.io ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
  - Auth method
      - JWT ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
## Screenshots
![image](https://github.com/user-attachments/assets/80950ea4-0601-4124-a7f5-29591d4cba84)
![image](https://github.com/user-attachments/assets/b07890b4-462e-4645-8207-2656e9f8cec5)
![image](https://github.com/user-attachments/assets/eea629bf-4187-42c4-b2a7-1ad76a4e2cfa)

## How to Run
### Preapare config and .env files
  - #### AuthService:
    in AuthService directory, go to ``` /configs ``` and create a ``` conf.yaml ``` file with structure like below:
    ```
        Database:
          URI : <your atlas db uri>
          Name : <your db name>
        JWTKEY: <your jwt authentication key>
    ```
- #### chat-service:
    the same data should be given to chat service (nest app) as well.
    in chat-service directory, create a ``` .env ``` file with structure like below:
    ```
      DATABSE_URI=<your atlas db uri>
      DATABASE_NAME=<your db name>
      JWTKEY=<your jwt authentication key>
    ```
### Run App
- #### via powershell
  in order to run the app using the powershell script, open a powershell window in the app directory and execute this command:
  ```
    .\app-runner.ps1
  ```
- #### via docker-compose
  there are some issues in the dockerfiles, but you still can use command below to run the backend services:
  ```
    docker-compose up -d --build
  ```
  and run the frontend app using these commands:
  ```
    npm install
    npm run dev
  ```
