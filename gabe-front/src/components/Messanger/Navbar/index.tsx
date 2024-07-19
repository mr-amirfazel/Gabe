import { FC, useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosChatboxes } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";
import { AppContext } from "../../../context/store";
import { CHAT_AXIOS } from "../../../config/config";
import { ListActionTypes, UserActionTypes } from "../../../@types/context/context.types";
import { Profile } from "../../Modals/Profile";
import { Tooltip } from "@mui/material";

export const Navbar: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    state: { user },
    dispatch,
  } = useContext(AppContext);

  const fetchUser = () => {
    CHAT_AXIOS.get(`/users/?username=${user.username}`).then((res) => {
      dispatch({
        type: UserActionTypes.Update_profile,
        payload: {
          image: res.data.avatar ? res.data.avatar : "",
          firstname: res.data.first_name,
          lastname: res.data.last_name,
          phonenumber: res.data.phone,
          bio: res.data.bio,
          id: res.data.id,
        },
      });
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const selectChats = (list_type: string) => {
    dispatch({
      type: ListActionTypes.Set_List_Type,
      payload: list_type
    })

    switch(list_type){
      case 'UserItem':
        dispatch({
          type: ListActionTypes.Set_List_Loading,
          payload: true
        })

        CHAT_AXIOS.get('/users').then(data => {
          console.log('raw users: ', data)

          const users = data.data.map(user => {
            return {
              "username": user.username,
              "image": user.image
            }
          })

          console.log('users ', users);


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
        
        break;
    }

  }

  return (
    <div className="flex flex-col justify-between items-center p-4 h-full rounded-lg bg-slate-600 text-white">
      {showModal && <Profile onClose={closeModal} />}
      <Tooltip title="chats">
        <button onClick={() => selectChats('ChatItem')}>
          <IoIosChatboxes />
        </button>
      </Tooltip>
      <div className="h-60 flex flex-col justify-evenly">
        <Tooltip title="add contacts">
          <button onClick={() => selectChats('UserItem')}>
            <FiUserPlus />
          </button>
        </Tooltip>
        <button>
          <GrGroup />
        </button>
       <Tooltip title="contacts">
        <button onClick={() => selectChats('ContactItem')}>
            <RiContactsBook2Line />
          </button>
       </Tooltip>
      </div>
      <Tooltip title="profile">
        <button onClick={openModal}>
          <CgProfile />
        </button>
      </Tooltip>
    </div>
  );
};
