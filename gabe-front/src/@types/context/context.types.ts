import { ItemProps } from "../Sidebar.types";

export type ContextAppState = {
  list: ListState;
  messages: MessageState;
  user: UserAppState;
};

export type ContextAction<T, K> = {
  type: T;
  payload?: K;
};

export type UserAppState = {
  username: string;
  token: string;
  image?: string;
  firstname: string;
  lastname: string;
  phone: string;
  bio: string;
  id: string;
};

export enum UserActionTypes {
  Login_Success = "Login_Success",
  Update_profile = "Update_profile",
}

export type ListState = {
  listLoading: boolean,
  listType: 'ChatItem' | 'UserItem' | 'ContactItem'
  itemList: ItemProps[];
  searchList: ItemProps[];
};

export enum ListActionTypes {
  Get_All_Items = "Get_All_Items",
  Search_Items = "Search_Items",
  Set_List_Type = "Set_List_type",
  Set_List_Loading = "Set_List_Loading"
}

export enum MessageActionTypes {
  Get_Current_Messages = "Get_Current_Messages",
  Send_New_Message = "Send_New_Message",
  Remove_Message = "Remove_Message",
  Exit_Room = "Exit_Room",
}

export type MessageHedar = {
  name: string;
  situation: "online" | "offline";
  image: string;
};
export type MessageState = {
  header: MessageHedar;
  roomId: string;
  MessageList: MessageItems[];
};

export type MessageItems = {
  senderId: string;
  isSentByOwner: boolean;
  value: string;
  id: number;
  sentAt: string;
  roomId: string;
};
