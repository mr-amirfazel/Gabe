/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useContext, useEffect, useState } from "react";
import { Searchbar } from "./Search";
import { List } from "./List";
import { ChatItemProps, ContactItemProps, UserItemProps } from "../../../@types/Sidebar.types";
import { useDebounce } from "../../../hooks/useDebounce";
import { ChatItem } from "./List/ChatItem";
import { ContactItem } from "./List/ContactItem";
import { UserItem } from "./List/UserItem";
import { AppContext } from "../../../context/store";

// Define the list_data as an empty array for now
const list_data: ChatItemProps[] | ContactItemProps[] | UserItemProps[] = [
];

type ListItemComponent<T> = FC<{ item: T }>;

interface ListState<T> {
    Component: ListItemComponent<T>;
}


export const Sidebar: FC = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [viewer, setViewer] = useState<ListState<any>>({
    Component: ContactItem,
});

  const {
    state: { list }
  } = useContext(AppContext);

  useEffect(() => {
    console.log(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    console.log(list.listType);
    
    switch (list.listType) {
      case 'ChatItem':
        setViewer({Component: ChatItem});
        break;
      case 'ContactItem':
        setViewer({Component: ContactItem});
        break;
      case 'UserItem':
        setViewer({Component: UserItem});
        break;
    }
  }, [list.listType]);

  return (
    <div className="w-[95%] flex flex-col h-full gap-3">
      <Searchbar onChange={setSearch} />
      <List listData={list.itemList as any} itemViewer={viewer.Component} />
    </div>
  );
};
