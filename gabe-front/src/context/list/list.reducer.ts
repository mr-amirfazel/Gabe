import { ListState, ListActionTypes, ContextAction } from "../../@types/context/context.types";
  
  export const ListReducer = (
    state: ListState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: ContextAction<ListActionTypes, any>
  ): ListState => {
    switch (action.type) {
      case ListActionTypes.Get_All_Items:
        state.itemList = action.payload;
        return state;
      case ListActionTypes.Search_Items:
        // eslint-disable-next-line no-case-declarations
        const filterChats = state.itemList.filter((n) =>
          n.name.includes(action.payload)
        );
        state.searchList = filterChats;
        return state;
      case ListActionTypes.Set_List_Type:
        state.listType = action.payload;
        return state;
      default:
        return state;
    }
  };
  