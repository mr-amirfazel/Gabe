/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageActionTypes } from "../@types/context/context.types";
import { ChatItemProps } from "../@types/Sidebar.types";
import { createChatService, getAllMessages, sendMessage } from "../services/chat.service"

// contact functions
export const deleteContact =  (userId: string, contact_Id: string) => {
}

// chat functions

export const createChat = async (userId: string, contact_Id: string) => {
    const chatToCreate = {
        "members": [userId, contact_Id],
        "isGroupChat": false
    }

    const result = await createChatService(chatToCreate);
    return result;
}

export const createGroupChat = () => {}

// export const createMessage = async (chatId: string, message: any) => {
//     const result = await sendMessage(chatId, message);
//     return result;
// }

export const fetchMessages = async (dispatch:any, chatroom: ChatItemProps, userId:string) => {
    const messages = await getAllMessages(chatroom.roomId, userId);
    
    dispatch({
        type: MessageActionTypes.Get_Current_Messages,
        payload: {
          roomId: chatroom.roomId,
          MessageList: messages,
          header: {
            name: chatroom.name,
            situation: chatroom.user_status,
          },
        },
      });

}