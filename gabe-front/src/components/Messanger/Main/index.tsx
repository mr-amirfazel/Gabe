import { FC, useContext } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatPreview } from "./ChatPreview";
import { ChatSender } from "./ChatSender";
import { AppContext } from "../../../context/store";
import classNames from "classnames";
import { ChatMessage } from "./ChatMessage";

export const Main:FC = () => {
    const {
        state: { messages },
      } = useContext(AppContext);


    return(<div className="flex flex-col gap-2 h-full">
        <div
        className={classNames(
          messages.roomId ? "flex" : "hidden",
          "sm:flex sm:flex-1 flex-col  flex-[1_1_auto]"
        )}
      >
        <div className="flex flex-col h-full">
          {messages.roomId ? (
            <>
              <ChatHeader />
              <ChatMessage />
              <ChatSender />
            </>
          ) : (
            <ChatPreview />
          )}
        </div>
      </div>
    </div>)
}