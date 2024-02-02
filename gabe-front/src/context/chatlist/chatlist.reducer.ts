import { ChatListState, ChatListActionTypes, ContextAction } from "../../@types/context/context.types";
  
  export const ChatlistReducer = (
    state: ChatListState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: ContextAction<ChatListActionTypes, any>
  ): ChatListState => {
    switch (action.type) {
      case ChatListActionTypes.Get_All_Contact:
        state.chatList = action.payload;
        return state;
      case ChatListActionTypes.Search_Contact:
        // eslint-disable-next-line no-case-declarations
        const filterChats = state.chatList.filter((n) =>
          n.name.includes(action.payload)
        );
        state.searchList = filterChats;
        return state;
      default:
        return state;
    }
  };
  