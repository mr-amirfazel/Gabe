import { ListActionTypes } from "../@types/context/context.types"
import { getAllChats } from "../services/chat.service"
import { getContacts } from "../services/contact.service"
import { getAllUsers } from "../services/user.service"

/* eslint-disable @typescript-eslint/no-explicit-any */

export const showAllChats = (dispatch: any, userId: string) => {
  dispatch({
    type: ListActionTypes.Set_List_Loading,
    payload: true
  });
  getAllChats(userId).then(chats => {
    dispatch({
      type: ListActionTypes.Get_All_Items,
      payload: chats
    })
  }).finally(()=>{
    dispatch({
      type: ListActionTypes.Set_List_Loading,
      payload: false
    })
  })
}

export const showAllUsers = (dispatch: any) => {
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

export const showAllContacts = (dispatch: any, userId: string) => {
  dispatch({
    type: ListActionTypes.Set_List_Loading,
    payload: true
  })
  getContacts(userId).then(users => {
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
