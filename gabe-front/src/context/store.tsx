/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer } from "react";
import { ChatlistReducer } from "./chatlist/chatlist.reducer";
import {
  ContextAction,
  ContextAppState,
} from "../@types/context/context.types";
import { MessageReducer } from "./messages/messages.reducer";
import { UserReducer } from "./user/user.reducer";

const IntialState: ContextAppState = {
  contacts: {
    searchList: [],
    chatList: [],
  },
  messages: {
    MessageList: [],
    roomId: "",
  },
  user: {
    refresh: "",
    access: "",
    username: "",
    image: "",
    firstname: "",
    lastname: "",
    phonenumber: "2222",
    bio: "",
    id: 0,
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
  { contacts, messages, user }: ContextAppState,
  action: any
) => ({
  contacts: ChatlistReducer(contacts, action),
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
