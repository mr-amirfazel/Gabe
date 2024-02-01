import { FC } from "react";
import { Searchbar } from "./Search";

export const Sidebar: FC = () => {
    return(<div className="w-[95%] flex flex-col">
        <Searchbar />
    </div>)
}