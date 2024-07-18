package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type Client struct {
	ID   int             `json:"id"`
	Conn *websocket.Conn `json:"conn"`
}

var clients []*Client

type Message struct {
	ChatID     int    `json:"chat_id"`
	SenderID   int    `json:"sender_id"`
	ReceiverID int    `json:"receiver_id"`
	Content    string `json:"content"`
}

func main() {
	http.HandleFunc("/connect", func(w http.ResponseWriter, r *http.Request) {
		conn, _ := upgrader.Upgrade(w, r, nil) // error ignored for sake of simplicity

		_, content, err := conn.ReadMessage()
		if err != nil {
			fmt.Printf("failed to read message: %v\n", err)
			return
		}
		client, err := ConvertJsonToClient(content)
		if err != nil || client.ID == 0 {
			fmt.Printf("failed to marshal to client: %v\n", err)
			return
		}
		client.Conn = conn

		clients = append(clients, client)
		fmt.Printf("client %d connected\n", client.ID)

		for {
			// Read message from browser
			msgType, content, err := conn.ReadMessage()
			if err != nil {
				fmt.Printf("failed to read message: %v\n", err)
				return
			}

			msg, err := ConvertJsonToMsg(content)
			if err != nil {
				fmt.Printf("failed to marshal to message: %v\n", err)
				continue
			}

			// Print the message to the console
			fmt.Printf("%s sent: %s\n", conn.RemoteAddr(), string(content))

			for _, client := range clients {
				// Write message back to browser
				if client.ID == msg.ReceiverID {
					if err = client.Conn.WriteMessage(msgType, []byte(msg.Content)); err != nil {
						fmt.Printf("failed to write message: %v\n", err)
						return
					}
				}
			}

		}
	})

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return
	}
}
