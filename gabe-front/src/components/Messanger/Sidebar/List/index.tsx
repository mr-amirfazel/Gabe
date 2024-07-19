/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentType, FC } from "react";
import { ChatItemProps, ContactItemProps, UserItemProps } from "../../../../@types/Sidebar.types";


type ListItem = ChatItemProps | ContactItemProps | UserItemProps;

// Define the props for List component
interface ListProps<T extends ListItem> {
  listData: T[];
  itemViewer: FC<{ item: T }>;
}


export const List = <T extends ListItem>({ listData, itemViewer: ItemViewer }: ListProps<T>) => {
    return listData.length === 0 ? (
        <div className="h-full w-full text-center flex justify-center items-center font-bold">
            Nothing was found here.
            <br/>
            make a chat!!
        </div>
    ) : (
        <>
            {listData.map((item, index) => (
                <ItemViewer key={index} item={item} />
            ))}
        </>
    );
}