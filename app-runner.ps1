# PowerShell script to start apps in new windows on Windows

# Path to the Auth-service (Golang app)
$authServicePath = ".\Auth-service\cmd\gabe"
Start-Process "powershell.exe" -ArgumentList "-NoExit", "cd $authServicePath; go mod tidy; go run ./main.go" 

# Path to the Chat-service (NestJS app)
$chatServicePath = ".\chat-service"
Start-Process "powershell.exe" -ArgumentList "-NoExit",  "cd $chatServicePath; npm i ; npm run start:dev" 

# Path to the React frontend app
$frontendPath = ".\gabe-front"
Start-Process "powershell.exe" -ArgumentList  "-NoExit", "cd $frontendPath;npm i ;npm run dev" 
