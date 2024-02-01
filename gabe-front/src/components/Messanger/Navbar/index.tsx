import { FC } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosChatboxes } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";

export const Navbar:FC = () =>{
    return (
        <div className="flex flex-col justify-between items-center p-4 h-full rounded-lg bg-slate-600 text-white">
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
            <button>
                <CgProfile />
            </button>
        </div>
    )
}