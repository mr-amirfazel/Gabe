/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer } from "react";
import { ListReducer } from "./list/list.reducer";
import {
  ContextAction,
  ContextAppState,
} from "../@types/context/context.types";
import { MessageReducer } from "./messages/messages.reducer";
import { UserReducer } from "./user/user.reducer";

const IntialState: ContextAppState = {
  list: {
    listLoading: false,
    searchList: [],
    itemList: [],
    listType: 'ChatItem'
  },
  messages: {
    header : {
      name : "",
      situation : "offline",
      image: ""
    },
    MessageList: [],
    roomId: "",
  },
  user: {
    isLoading: false,
    token: "",
    username: "",
    image: "",
    firstname: "",
    lastname: "",
    phone: "",
    bio: "",
    id: "",
  },
};
const AppContext = createContext<{
  state: ContextAppState;
  dispatch: React.Dispatch<ContextAction<any, any>>;
}>({
  state: IntialState,
  dispatch: () => null,
});

const combineReducer = (
  { list, messages, user }: ContextAppState,
  action: any
) => ({
  list: ListReducer(list, action),
  messages: MessageReducer(messages, action),
  user: UserReducer(user, action),
});
interface AppContextProviderProps extends React.PropsWithChildren {}
const AppContextProvider: React.FunctionComponent<AppContextProviderProps> = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = useReducer(combineReducer, IntialState); // flux
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppContextProvider };
