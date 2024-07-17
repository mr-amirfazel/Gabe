import React from "react";
import { BsChatDots } from "react-icons/bs";
interface ChatPreviewProps extends React.PropsWithChildren {}
export const ChatPreview: React.FunctionComponent<ChatPreviewProps> = (
  props
) => {

  const chat_preview_message = "welcome to our messanger, please click on a chat to start a conversation!"

  return (
    <div className="hidden sm:flex h-full sm:flex-col justify-center items-center">
      <BsChatDots size={30} />
      <h1 className="text-sm font-medium text-center mt-1">
        {chat_preview_message}
      </h1>
    </div>
  );
};
