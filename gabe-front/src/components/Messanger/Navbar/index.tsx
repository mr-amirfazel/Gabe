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
import { showAllUsers, showAllContacts } from "../../../actions/navbar.actions";

export const Navbar: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    state: { user, list },
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

  const selectList = (list_type: string) => {
    dispatch({
      type: ListActionTypes.Set_List_Type,
      payload: list_type
    })

    switch(list_type){
      case 'UserItem':
        showAllUsers(dispatch);
        break;
      case 'ContactItem':
        console.log('fetch contacts for user: ', user.id);
        showAllContacts(dispatch, user.id)
        break;
      default:
        break;
    }

  }

  return (
    <div className="flex flex-col justify-between items-center p-4 h-full rounded-lg bg-slate-600 text-white">
      {showModal && <Profile onClose={closeModal} />}
      <Tooltip title="chats">
        <button onClick={() => selectList('ChatItem')}>
          <IoIosChatboxes color={list.listType === 'ChatItem' ? "#5fcfcf" : "white"} />
        </button>
      </Tooltip>
      <div className="h-60 flex flex-col justify-evenly">
        <Tooltip title="add contacts">
          <button onClick={() => selectList('UserItem')}>
            <FiUserPlus color={list.listType === 'UserItem' ? "#5fcfcf" : "white"}  />
          </button>
        </Tooltip>
        <button>
          <GrGroup />
        </button>
       <Tooltip title="contacts">
        <button onClick={() => selectList('ContactItem')}>
            <RiContactsBook2Line color={list.listType === 'ContactItem' ? "#5fcfcf" : "white"}  />
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
