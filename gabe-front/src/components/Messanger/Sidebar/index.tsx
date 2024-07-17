import { FC } from "react";
import { Searchbar } from "./Search";
import { List } from "./List";
import { ChatItemProps } from "../../../@types/Sidebar.types";

const list_data: ChatItemProps[]= [ {
    image: "https://avatars.githubusercontent.com/u/78508222?v=4",
    name: "sabz",
    time: "2023-04-22T07:11:59+00:00",
    last_message: "پاشو ارائه ابری داریم",
    user_status: "online",
    unseen_messages: 3,
    roomId: 123
},
{
    image: "https://avatars.githubusercontent.com/u/78533422?v=4",
    name: "ashkan",
    time: "2023-04-22T07:11:59+00:00",
    last_message: " داش امشب نمیای خوابگاه",
    user_status: "offline",
    unseen_messages: 3,
    roomId: 122
},
{
    image: "https://avatars.githubusercontent.com/u/82243525?v=4",
    name: "sadeq",
    time: "2023-04-22T07:11:59+00:00",
    last_message: " فاضل ",
    user_status: "offline",
    unseen_messages: 3,
    roomId: 124
}]

export const Sidebar: FC = () => {
    return(<div className="w-[95%] flex flex-col ">
        <Searchbar />
        <List listData={list_data}/>
    </div>)
}