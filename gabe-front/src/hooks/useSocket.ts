/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { MessageItems } from "../@types/context/context.types";
import { AppContext } from "../context/store";

const useSocket = (url: string, initial_messages: MessageItems[] = []) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessageItems[]>(initial_messages);  
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null); 
  
  const {state: {user}} = useContext(AppContext)

  // Function to join a specific chat room
  const joinRoom = useCallback((chatId: string) => {
    if (socket) {
        console.log('joining room:');
        
      socket.emit('joinRoom', chatId)
    }
  }, [socket]);

  // Function to send a message to the current chat room
  const sendMessage = useCallback((chatId: string, messageContent: string, senderId: string) => {
    console.log('sendinggg a mesageeeee', socket, joinedRoom, chatId);
    
    if (socket) {
      socket.emit('sendMessage', { chatId, messageContent, senderId });
    }
    
  }, [socket, joinedRoom]);

  useEffect(() => {
    // Establish a new socket connection
    const socketIo = io(url);

    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("Socket connected:", socketIo.id);
      setIsConnected(true);
    });

    socketIo.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
      setJoinedRoom(null);  // Reset room on disconnect
    });

    // Listen for real-time messages from the server
    socketIo.on("receiveMessage", (message: any) => {
        console.log('recieved message', message);
        const updated_message = {
            "senderId": message.senderId,
            "isSentByOwner": message.senderId == user.id,
            "value": message.content,
            "sentAt": message.createdAt,
            "roomId": message.chatId,
            "id": message._id
      }
        
        
      setMessages((prevMessages) => [...prevMessages, updated_message]);
    });

    socketIo.on("joinedRoom", joinedRoomId => {
        console.log('joined to', joinedRoomId);
        
        setJoinedRoom(joinedRoomId)
    })

    // Clean up the socket connection on component unmount
    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  return {
    socket,
    isConnected,
    messages,
    joinRoom,
    sendMessage,
    joinedRoom,
  };
};

export default useSocket;
