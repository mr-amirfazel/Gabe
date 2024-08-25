import {
    MessageState,
    ContextAction,
    MessageActionTypes,
  } from "./../../@types/context/context.types";
  export const MessageReducer = (
    state: MessageState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: ContextAction<MessageActionTypes, any>
  ): MessageState => {
    switch (action.type) {
      case MessageActionTypes.Get_Current_Messages:
        state.roomId = action.payload.roomId;
        state.MessageList = action.payload.MessageList;
        state.header = action.payload.header;
        return state;
      case MessageActionTypes.Send_New_Message:
        // state.MessageList.push(action.payload);
        state.MessageList = action.payload
        return state;
      case MessageActionTypes.Remove_Message:
        state.MessageList = state.MessageList.filter(
          (n) => n.id !== action?.payload
        );
        return state;
      case MessageActionTypes.Exit_Room:
        state.MessageList = [];
        state.roomId = "";
        return state;
      default:
        return state;
    }
  };
  