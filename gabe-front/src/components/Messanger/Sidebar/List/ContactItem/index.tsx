import { FC, useContext } from "react";
import { ContactItemProps } from "../../../../../@types/Sidebar.types";
import { IoChatbubbleSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { createChat } from "../../../../../actions/sidebar.actions";
import { AppContext } from "../../../../../context/store";

export interface ContactItemComponentProps {
  item: ContactItemProps 
}

export const ContactItem: FC<ContactItemComponentProps> = ({item}) => {
  
  const {state: {user}} = useContext(AppContext);

  const startChat = () => {
    console.log('creating a chat for: ', user.id, " and ", item?.contact_userId);
    
    createChat(user?.id, item?.contact_userId).then(data => console.log(data));
  }

    return (<div className="group rounded-md flex flex-row-reverse ease-in duration-200 hover:bg-blue-300 p-2">
      <div className="flex gap-3 w-[10%]">
      <Tooltip title="start chat">
        <button >
            <IoChatbubbleSharp onClick={startChat} className="hidden group-hover:block text-white hover:text-green-400"/>
        </button>
        </Tooltip>
        <Tooltip title="remove contact">
        <button className="hover:text-red-500">
            <MdDeleteForever className="hidden group-hover:block text-white hover:text-red-500"/>
        </button>
        </Tooltip>
      </div>
      <div className="w-[90%]">
        <h4 className="text-md font-bold ml-2">{item?.user?.username}</h4>
      </div>
      <img
        className="rounded-full w-[40px] h-[39px] bg-black overflow-hidden"
        src={`${
          item?.user?.image
            ? `data:image/png;base64,${item?.user?.image}`
            : "https://preview.redd.it/bcyq3rjk2w071.png?auto=webp&s=97c9b873f1b41a7b9ff31331fd92f2e3fafed92f"
        }`}
        alt=""
      />
    </div>)
}