import { FC, useContext, useEffect } from "react";
import { Messanger } from "../../components/Messanger";
import { getUserByUsername } from "../../services/user.service";
import { AppContext } from "../../context/store";
import { UserActionTypes } from "../../@types/context/context.types";

export const Home:FC = () => {

    const { _ , dispatch}  = useContext(AppContext);

    useEffect(()=> {
        const username = sessionStorage.getItem("gabe-username");
        if(username){
            getUserByUsername(username).then(user => {
                if(!user) return;
                console.log('user is logged in', user);
                
                dispatch({
                    type: UserActionTypes.Login_Success,
                    payload: {
                        user: user
                    }
                })
            })
        }
    }
    , [])

    return <Messanger />
}