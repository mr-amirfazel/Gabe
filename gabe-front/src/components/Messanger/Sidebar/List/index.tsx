import { FC } from "react";
import { ChatItemProps } from "../../../../@types/Sidebar.types";
import { ChatItem } from "./ChatItem";
interface ListProps extends React.PropsWithChildren {
    listData: ChatItemProps[]
}
export const List: FC<ListProps> = (props) => {
    return (<> 
    {
    props.listData.map(item => 
        <ChatItem props={item}/>
    )}
    </>)
}