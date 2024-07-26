/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserAppState } from "../@types/context/context.types";
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

export const getUserByUsername: (username: string) => Promise<UserAppState> = async (username: string) =>  {
    try{
        const response = await CHAT_AXIOS.get(`/users?username=${username}`);
        const fetchedUser = response.data[0];
        const result = {...fetchedUser, id: fetchedUser._id}
        delete result["_id"]
        return result;
    }
    catch(error){
        console.error(error)
    }
}