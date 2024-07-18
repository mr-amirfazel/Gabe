import { FC, useEffect, useState } from "react";
import { Searchbar } from "./Search";
import { List } from "./List";
import { ChatItemProps } from "../../../@types/Sidebar.types";
import { useDebounce } from "../../../hooks/useDebounce";


const list_data: ChatItemProps[]= [ ]

export const Sidebar: FC = () => {

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);


    useEffect(() => {
        console.log(debouncedSearch);
        
      }, [debouncedSearch]);

    return(<div className="w-[95%] flex flex-col ">
        <Searchbar onChange={setSearch}/>
        <List listData={list_data}/>
    </div>)
}