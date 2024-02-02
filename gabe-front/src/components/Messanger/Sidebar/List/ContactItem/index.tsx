import { FC } from "react";
import { ContactItemProps } from "../../../../../@types/Sidebar.types";


export const ContactItem: FC<ContactItemProps> = (props) => {
    return (<div>
        <div
      className=
        "flex cursor-pointer ease-in duration-200 hover:bg-blue-300 p-2"
    >
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h6 className="text-sm font-semibold">
          </h6>
          <h4 className="text-md font-bold ml-2">{props.name}</h4>
          <h6 className="text-sm font-bold ml-2">{props.user_status}</h6>
        </div>
      </div>
      <img
        className="rounded-full w-[50px] h-[50px] bg-black overflow-hidden"
        src={props.image}
        alt=""
      />
    </div>
    </div>)
}