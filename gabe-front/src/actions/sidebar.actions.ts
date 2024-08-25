import { createChatService } from "../services/chat.service"

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


export const fetchMessages = async (chaId: string) => {
    const messages = "alo";

}