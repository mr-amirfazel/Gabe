/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserItemProps } from "../@types/Sidebar.types";
import { CHAT_AXIOS } from "../config/config";

export const getAllUsers: () => Promise<UserItemProps[]> = async () => {

    // eslint-disable-next-line no-useless-catch
    try{
        const response = await CHAT_AXIOS.get('/users')
        const users = response.data.map(user => {
            return {
                "username": user.username,
                "image": user.image
            }
        })

        return users;
    }
    catch (error){
        throw error
    }
}