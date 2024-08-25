/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatItemProps } from "../@types/Sidebar.types";
import { CHAT_AXIOS } from "../config/config";

export const createChatService: (data: any) => Promise<any> = async (
  chatToCreate
) => {
  try {
    const response = await CHAT_AXIOS.post(`/chats`, chatToCreate);
    const result = response.data;
    console.log(result);
    return result;
    
  } catch (error) {
    console.error(error);
  }
};

export const getAllChats: (userId: string) => Promise<ChatItemProps[]> = async (userId: string) => {
    try {
        const response = await CHAT_AXIOS.get(`/chats/${userId}`);
        const result = response.data.map(chat => {
            return {
                "image": chat.chatAvatar ? chat.chatAvatar : "",
                "name": chat.chatName,
                "time": chat.createdAt,
                "last_message": "string",
                "user_status": true,
                "unseen_messages": 12,
                "roomId": chat.chatId
            }
        });
        console.log('chats: ', result);
        return result;
        
      } catch (error) {
        console.error(error);
      }
}

export const getAllMessages: (chatId: string) => Promise<any> = async (chatId: string) => {
    try {
        const response = await CHAT_AXIOS.get(`/chats/${chatId}/messages`);
        const result = response.data;
        return result;
        
      } catch (error) {
        console.error(error);
      }
}
