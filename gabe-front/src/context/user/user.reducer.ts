import { ContextAction, UserAppState, UserActionTypes} from "../../@types/context/context.types";


export const UserReducer = (
    state: UserAppState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: ContextAction<UserActionTypes, any>
): UserAppState => {
    switch (action.type) {
        case UserActionTypes.Login_Success:
          state.refresh = action.payload.token;
          state.access = action.payload.access;
          state.username = action.payload.username;
          return state;
        case UserActionTypes.Update_profile:
            state.image = action.payload.image;
            state.firstname=action.payload.firstname;
            state.lastname=action.payload.lastname;
            state.phonenumber=action.payload.phonenumber;
            state.bio= action.payload.bio;
            state.id = action.payload.id
            return state
        default:
          return state;
      }
}