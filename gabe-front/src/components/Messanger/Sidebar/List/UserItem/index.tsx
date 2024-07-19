import { FC } from "react";
import { ItemComponentProps, UserItemProps } from "../../../../../@types/Sidebar.types";

export interface UserItemComponentProps {
    item: UserItemProps;
}

export const UserItem: FC<UserItemComponentProps> = ({item}) => {
    return (<></>)
}