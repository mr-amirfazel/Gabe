/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useContext } from "react";
import { ChatItemProps } from "../../../../../@types/Sidebar.types";
import React from "react";
import { AppContext } from "../../../../../context/store";
import { MessageActionTypes } from "../../../../../@types/context/context.types";
import { messagesConstant } from "../../../../../constants/messages";
interface ChatItemComponentProps extends React.PropsWithChildren {
  props: ChatItemProps
}
export const ChatItem: FC<ChatItemComponentProps> = ({props}) => {

  const {
    state: { messages },
    dispatch,
  } = useContext(AppContext);

  const handleMessageFetch = () => {

    // JSONAXIOS.get(`${ApiRoutes.GetMessages}${props.roomId}`)
    // .then((res) => {
    //   if (res?.data?.length > 0) {
    //     // dispatch data to context
    //     dispatch({
    //       type: MessageActionTypes.Get_Current_Messages,
    //       payload: res?.data[0],
    //     });
    //   }
    // })
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // .catch((err) => {
    //   // notification raise
    // });

    console.log(messagesConstant.filter(item => item.roomId == props.roomId));
    dispatch({
      type: MessageActionTypes.Get_Current_Messages,
      payload : {
        roomId: props.roomId,
        MessageList : messagesConstant.filter(item => item.roomId == props.roomId)[0].MessageList,
        header : {
          name: props.name,
          situation: props.user_status
        }
      }
    })
  }

    return (<div onClick={handleMessageFetch}>
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