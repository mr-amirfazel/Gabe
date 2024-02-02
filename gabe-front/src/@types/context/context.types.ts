import { ChatItemProps } from "../Sidebar.types";

export type ContextAppState = {
    contacts: ChatListState;
    messages: MessageState;
    user: UserAppState;
  };

export type ContextAction<T, K> = {
  type: T;
  payload?: K;
};

export type UserAppState = {
  username: string;
  refresh: string;
  access: string;
  image?: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  bio: string;
  id: number;
};

export enum UserActionTypes {
  Login_Success = "Login_Success",
  Update_profile = "Update_profile",
}


export type ChatListState = {
    chatList: ChatItemProps[];
    searchList: ChatItemProps[];
  };

export enum ChatListActionTypes {
    Get_All_Contact = "Get_All_Contact",
    Search_Contact = "Search_Contact",
}

export enum MessageActionTypes {
    Get_Current_Messages = "Get_Current_Messages",
    Send_New_Message = "Send_New_Message",
    Remove_Message = "Remove_Message",
    Exit_Room = "Exit_Room",
  }
  export type MessageState = {
    roomId: string;
    MessageList: MessageItems[];
  };
  
  export type MessageItems = {
    isSentByOwner: boolean;
    value: string;
    id: number;
  };