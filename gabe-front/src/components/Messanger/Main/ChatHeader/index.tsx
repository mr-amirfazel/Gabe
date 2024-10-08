import React, { useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AppContext } from "../../../../context/store";
import { MessageActionTypes } from "../../../../@types/context/context.types";
interface ChatHeaderProps extends React.PropsWithChildren {}
export const ChatHeader: React.FunctionComponent<ChatHeaderProps> = () => {
  const { state : {messages},dispatch } = useContext(AppContext);
  const handleExitRoom = () => {
    dispatch({
      type: MessageActionTypes.Exit_Room,
    });
  };
  return (
    <div className=" flex pr-3 py-2 justify-between items-center">
      <div className="flex flex-col">
        <h1 className="font-bold">{messages.header.name}</h1>
        <h3 className="text-xs">{messages.header.situation ? 'online' : 'offline'}</h3>
      </div>
      <div className="ml-2 cursor-pointer">
        <BiArrowBack size={30} onClick={handleExitRoom} />
      </div>
    </div>
  );
};
