import { ContactItemProps } from "../@types/Sidebar.types"
import { CHAT_AXIOS } from "../config/config"

export const getContacts: (userId: string) => Promise<ContactItemProps[]>  = async (userId: string) => {
    // eslint-disable-next-line no-useless-catch
    try{
        const response = await CHAT_AXIOS.get(`users/${userId}/contacts`);
        console.log(response.data);
        
        return response.data;
    }
    catch (error){
        throw error
    }
}