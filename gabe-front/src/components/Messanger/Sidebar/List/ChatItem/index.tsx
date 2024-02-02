import { FC, useEffect } from "react";
import { ChatItemProps } from "../../../../../@types/Sidebar.types";
import React from "react";
interface ChatItemComponentProps extends React.PropsWithChildren {
  props: ChatItemProps
}
export const ChatItem: FC<ChatItemComponentProps> = ({props}) => {
  console.log('hola');
  

  useEffect ( () => {
    console.log('hi');
    
  },[])

    return (<div>
        <div
      className=
        "flex flex-row-reverse cursor-pointer ease-in duration-200 hover:bg-blue-300 p-2"
    >
      <div className="w-full">
        <div className="flex justify-between items-center">
        <h6 className="text-sm font-bold ml-2">{props.user_status}</h6>
          <h4 className="text-md font-bold ml-2">{props.name}</h4>
          <h6 className="text-sm font-semibold">
            {new Date(props.time).toLocaleDateString("fa-IR")}
          </h6>
        </div>
        <h5 className="text-xs mt-1 pl-2">{props.last_message}</h5>
      </div>
      <img
        className="rounded-full w-[50px] h-[50px] bg-black overflow-hidden"
        src={props.image}
        alt=""
      />
    </div>
    </div>)
}