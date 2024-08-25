import { ContextAction, UserAppState, UserActionTypes} from "../../@types/context/context.types";


export const UserReducer = (
    state: UserAppState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: ContextAction<UserActionTypes, any>
): UserAppState => {
    switch (action.type) {
        case UserActionTypes.Login_Success:
          state.username = action.payload?.user?.username;
          state.token = action.payload?.user?.token;
          state.firstname=action.payload?.user?.firstname;
          state.lastname=action.payload?.user?.lastname;
          state.phone=action.payload?.user?.phone;
          state.bio= action.payload?.user?.bio;
          state.id = action.payload?.user?.id;
          state.image = action.payload?.user?.image;
          return state;
        case UserActionTypes.Update_profile:
            state.image = action.payload.image;
            state.firstname=action.payload.firstname;
            state.lastname=action.payload.lastname;
            state.phone=action.payload.phonenumber;
            state.bio= action.payload.bio;
            state.id = action.payload.id
            return state
        default:
          return state;
      }
}