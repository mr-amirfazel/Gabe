/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
// import { AXIOS } from "../../../../config/axios.config";
// import { ApiRoutes } from "../../../../constants/api.route";
import { AppContext } from "../../../../context/store";
import {
  ContextAppState,
  MessageActionTypes,
  MessageItems,
} from "../../../../@types/context/context.types";
import useSocket from "../../../../hooks/useSocket";
interface ChatSenderProps extends React.PropsWithChildren {}
export const ChatSender: React.FunctionComponent<ChatSenderProps> = (props) => {
  const {
    state,
    dispatch,
  } = useContext(AppContext) as { state: ContextAppState; dispatch: any };
  const { messages, sendMessage, joinRoom, joinedRoom } = useSocket("http://localhost:3000", state.messages.MessageList);
  const [text, setText] = useState<string>("");
  const handleInputChange = (e: any) => {
    if(!joinedRoom)
      joinRoom(state.messages.roomId)
    setText(e.target.value);
  };
  const handleSendMessage = () => {
    sendMessage(state.messages.roomId, text, state.user.id)
    setText("");
  };

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    console.log('messages updated', messages);
    
    dispatch({
      type: MessageActionTypes.Send_New_Message,
      payload: messages,
    });
  },[dispatch, messages])

  return (
    <div className="py-3 flex flex-row-reverse">
      <div
        className="p-2 w-[5%] rounded-full flex justify-center items-center cursor-pointer duration-150 ease-out hover:text-blue-600"
        onClick={() => handleSendMessage()}
      >
        <FiSend fontSize={30} />
      </div>
      <input
        placeholder=" type your message.."
        onChange={(e) => handleInputChange(e)}
        value={text}
        className="w-[95%] rounded-lg p-4"
      />
    </div>
  );
};
