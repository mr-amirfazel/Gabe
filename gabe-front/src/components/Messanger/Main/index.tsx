import { FC } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatPreview } from "./ChatPreview";
import { ChatSender } from "./ChatSender";

export const Main:FC = () => {
    return(<div className="flex flex-col gap-2 h-full">
        <ChatHeader />
        <ChatPreview />
        <ChatSender />
    </div>)
}