/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, useContext } from "react";
import { ChatItemProps, ContactItemProps, UserItemProps } from "../../../../@types/Sidebar.types";
import { AppContext } from "../../../../context/store";
import { Bars } from "react-loader-spinner";
import { Tooltip } from "@mui/material";


type ListItem = ChatItemProps | ContactItemProps | UserItemProps;

// Define the props for List component
interface ListProps<T extends ListItem> {
  listData: T[];
  itemViewer: FC<{ item: T }>;
}


export const List = <T extends ListItem>({ listData, itemViewer: ItemViewer }: ListProps<T>) => {
    
    const {state: {list}} = useContext(AppContext);


    if (list.listLoading)
        return(
        <div className="h-full w-full text-center flex justify-center items-center font-bold">
            <Tooltip title= {`fetching ${list.listType} List data`}>
                <div>
                    <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
                </div>
            </Tooltip>
        </div>
        
        )
    
    return listData.length === 0 ? (
        <div className="h-full w-full text-center flex justify-center items-center font-bold">
            Nothing was found here.
            <br/>
            make a chat!!
        </div>
    ) : (
        <div className="overflow-auto">
            {listData.map((item, index) => (
                <ItemViewer key={index} item={item} />
            ))}
        </div>
    );
}