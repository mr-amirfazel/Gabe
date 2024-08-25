import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AppContext } from "../../../../../context/store";
import { MessageActionTypes } from "../../../../../@types/context/context.types";
interface MessageItemProps extends React.PropsWithChildren {
  type?: "sender" | "reciever";
  text: string;
  id: number;
}
export const MessageItem: React.FunctionComponent<MessageItemProps> = ({
  type = "sender",
  text,
  id,
}) => {
  const {
    state: { user, messages, list },
    dispatch,
  } = useContext(AppContext);
  const handleDeleteMessage = (id: number) => {
    dispatch({
      type: MessageActionTypes.Remove_Message,
      payload: id,
    });
  };
  switch (type) {
    case "sender":
      return (
        <li className="flex justify-end">
          <div className={"p-2 w-[250px] rounded-lg shadow-md mr-2 bg-blue-400"}>
            <div className="p-1 flex justify-between items-center">
              <h4 className="font-bold text-sm">{user.username}</h4>
              <AiFillDelete
                className="cursor-pointer"
                onClick={() => handleDeleteMessage(id)}
              />
            </div>
            <p className="text-xs">{text}</p>
          </div>
          <img
            className="rounded-full  w-[50px] h-[50px]  overflow-hidden"
            src={`${
              user?.image
                ? `data:image/png;base64,${user?.image}`
                : "https://preview.redd.it/bcyq3rjk2w071.png?auto=webp&s=97c9b873f1b41a7b9ff31331fd92f2e3fafed92f"
            }`}
            alt=""
          />
        </li>
      );
    case "reciever":
      return (
        <li className="flex justify-start">
          
          <img
            className="rounded-full  w-[50px] h-[50px]  overflow-hidden"
            src={`${
              messages.header?.image
                ? `data:image/png;base64,${messages.header?.image}`
                : "https://preview.redd.it/bcyq3rjk2w071.png?auto=webp&s=97c9b873f1b41a7b9ff31331fd92f2e3fafed92f"
            }`}
            alt=""
          />
          <div
            className={"p-2 w-[250px] rounded-lg shadow-md ml-2 bg-white"}
          >
            <div className="p-1 flex justify-between items-center">
              <h4 className="font-bold text-sm">{messages.header.name}</h4>
              <AiFillDelete
                className="cursor-pointer"
                onClick={() => handleDeleteMessage(id)}
              />
            </div>
            <p className="text-xs">{text}</p>
          </div>
        </li>
      );
  }
};
