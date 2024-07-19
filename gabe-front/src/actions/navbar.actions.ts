import { ListActionTypes } from "../@types/context/context.types"
import { getAllUsers } from "../services/user.service"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const  addContactAction = (dispatch: any) => {
    dispatch({
        type: ListActionTypes.Set_List_Loading,
        payload: true
      })
      getAllUsers().then(users => {
        dispatch({
          type: ListActionTypes.Get_All_Items,
          payload: users
        })
      }).finally(()=>{
        dispatch({
          type: ListActionTypes.Set_List_Loading,
          payload: false
        })
      })
}