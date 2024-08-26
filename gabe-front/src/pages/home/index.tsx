import { FC, useContext, useEffect } from "react";
import { Messanger } from "../../components/Messanger";
import { getUserByUsername } from "../../services/user.service";
import { AppContext } from "../../context/store";
import { UserActionTypes } from "../../@types/context/context.types";
import { showAllChats } from "../../actions/navbar.actions";
export const Home:FC = () => {

    const {dispatch}  = useContext(AppContext);
    useEffect(()=> {
        const username = sessionStorage.getItem("gabe-username");
        dispatch({
            type: UserActionTypes.Login_Loading,
            payload: true
        })
        if(username){
            getUserByUsername(username).then(user => {
                if(!user) return;
                console.log('user is logged in', user);
                dispatch({
                    type: UserActionTypes.Login_Loading,
                    payload: false
                })
                dispatch({
                    type: UserActionTypes.Login_Success,
                    payload: {
                        user: user
                    }
                })
                showAllChats(dispatch, user.id)
            })
        }
    }
    , [])

    return <Messanger />
}