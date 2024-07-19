import { FC, useContext } from "react";
import { ChatItemProps, ItemComponentProps } from "../../../../../@types/Sidebar.types";
import { AppContext } from "../../../../../context/store";
import { MessageActionTypes } from "../../../../../@types/context/context.types";
import { messagesConstant } from "../../../../../constants/messages";

// Define the props type for the ChatItem component
export interface ChatItemComponentProps {
  item: ChatItemProps;
}

export const ChatItem: FC<ChatItemComponentProps> = ({ item }) => {
  const {
    state: { messages },
    dispatch,
  } = useContext(AppContext);

  const handleMessageFetch = () => {
    // Perform operations such as fetching data and dispatching actions
    // (The API call is commented out as per your example)

    console.log(messagesConstant.filter((msg) => msg.roomId === item.roomId));
    dispatch({
      type: MessageActionTypes.Get_Current_Messages,
      payload: {
        roomId: item.roomId,
        MessageList: messagesConstant.filter((msg) => msg.roomId === item.roomId)[0]?.MessageList || [],
        header: {
          name: item.name,
          situation: item.user_status,
        },
      },
    });
  };

  return (
    <div onClick={handleMessageFetch}>
      <div className="flex flex-row-reverse cursor-pointer ease-in duration-200 hover:bg-blue-300 p-2">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h6 className="text-sm font-bold ml-2">{item.name}</h6>
            <h4 className="text-md font-bold ml-2">{item.user_status}</h4>
            <h6 className="text-sm font-semibold">
              {new Date(item.time).toLocaleDateString("fa-IR")}
            </h6>
          </div>
          <h5 className="text-xs mt-1 pl-2">{item.last_message}</h5>
        </div>
        <img
          className="rounded-full w-[50px] h-[50px] bg-black overflow-hidden"
          src={item.image}
          alt="Chat Item"
        />
      </div>
    </div>
  );
};
