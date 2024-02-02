package main

import "encoding/json"

func ConvertJsonToMsg(content []byte) (*Message, error) {
	msg := Message{}
	err := json.Unmarshal(content, &msg)
	if err != nil {
		return nil, err
	}
	return &msg, nil
}

func ConvertJsonToClient(content []byte) (*Client, error) {
	client := Client{}
	err := json.Unmarshal(content, &client)
	if err != nil {
		return nil, err
	}
	return &client, nil
}
