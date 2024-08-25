import { UserAppState } from "../@types/context/context.types";
import { ContactItemProps } from "../@types/Sidebar.types"
import { CHAT_AXIOS } from "../config/config"
import { getUserByUsername } from "./user.service";

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

export const  addContact = async (userId: string, dest_username: string) => {
    const dest_user: UserAppState = await getUserByUsername(dest_username);
    const dto = {
        "contact_firstname": dest_user.firstname,
        "contact_lastname": dest_user.lastname,
        "contact_userId": ''+dest_user.id
    }
    // eslint-disable-next-line no-useless-catch
    try{
        const response = await CHAT_AXIOS.post(`users/${userId}/contacts`,
            dto
        );
        console.log(response.data);
        
        return response.data;
    }
    catch (error){
        throw error
    }
}