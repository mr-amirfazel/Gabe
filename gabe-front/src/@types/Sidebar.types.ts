import { UserAppState } from "./context/context.types";

export type ChatItemProps = {
    image?: string,
    username: string,
    time: string,
    last_message: string,
    user_status: string,
    unseen_messages: number,
    roomId: number
}

export type ContactItemProps = {
    contact_firstname: string;
    contact_lastname: string;
    contact_userId: string;
    user: UserAppState;

}

export type UserItemProps = {
    image?: string,
    username: string,
}

export type ItemProps = UserItemProps | ChatItemProps | ContactItemProps
