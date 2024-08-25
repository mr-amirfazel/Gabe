import { FC, useContext } from "react";
import { ChatItemProps } from "../../../../../@types/Sidebar.types";
import { AppContext } from "../../../../../context/store";
import { MessageActionTypes } from "../../../../../@types/context/context.types";
import { messagesConstant } from "../../../../../constants/messages";
import { GrStatusGoodSmall } from "react-icons/gr";

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
    <div onClick={handleMessageFetch} >
      <div className="rounded-md flex flex-row-reverse cursor-pointer ease-in duration-200 hover:bg-blue-300 p-2">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h6 className="text-sm font-bold ml-2">{item.name}</h6>
            
            <h6 className="text-sm font-semibold">
              {new Date(item.time).toLocaleDateString("fa-IR")}
            </h6>
          </div>
          <h5 className="text-xs mt-1 pl-2">{item.last_message}</h5>
        </div>
        <div className="relative h-full">
        <img
          className="rounded-full w-[50px] h-[50px] bg-black overflow-hidden"
          src={`${
            item?.image
              ? `data:image/png;base64,${item?.image}`
              : "https://preview.redd.it/bcyq3rjk2w071.png?auto=webp&s=97c9b873f1b41a7b9ff31331fd92f2e3fafed92f"
          }`}
          alt="Chat Item"
        />
        <GrStatusGoodSmall className="absolute top-[35px] left-[30px]" color={item.user_status ? "#4ade80" : "white"}/>
        </div>
        
      </div>
    </div>
  );
};
