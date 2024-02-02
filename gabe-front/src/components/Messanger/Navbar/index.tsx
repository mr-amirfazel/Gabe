import { FC, useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosChatboxes } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";
import { AppContext } from "../../../context/store";
import { AXIOS } from "../../../config/axios.config";
import { UserActionTypes } from "../../../@types/context/context.types";
import { Profile } from "../../Modals/Profile";

export const Navbar:FC = () =>{

    const [showModal, setShowModal] = useState<boolean>(false)

    const {
        state: { user },
        dispatch,
      } = useContext(AppContext);

    const fetchUser = () => {
        AXIOS.get(`/users/?username=${user.username}`).then(res => {
            dispatch({
                type: UserActionTypes.Update_profile,
                payload:{
                    image: res.data.avatar ? res.data.avatar : '',
                    firstname:res.data.first_name,
                    lastname:res.data.last_name,
                    phonenumber:res.data.phone,
                    bio: res.data.bio,
                    id : res.data.id
                }
            })
        })
    }

    useEffect(
        ()=>{
            fetchUser()
    },[])

    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div className="flex flex-col justify-between items-center p-4 h-full rounded-lg bg-slate-600 text-white">
            {showModal && <Profile onClose = {closeModal}/>}
            <button>
                <IoIosChatboxes />
            </button>
            <div className="h-24 flex flex-col justify-evenly">
                <button>
                    <FiUserPlus />
                </button>
                <button>
                    <GrGroup />
                </button>
                <button>
                    <RiContactsBook2Line />
                </button>
                
            </div>
            <button onClick={openModal}>
                <CgProfile />
            </button>
        </div>
    )
}