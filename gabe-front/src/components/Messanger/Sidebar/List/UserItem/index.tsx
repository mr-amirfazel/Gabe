import { FC, useState } from "react";
import { UserItemProps } from "../../../../../@types/Sidebar.types";
import { AddContact } from "../../../../Modals/AddContact";

export interface UserItemComponentProps {
  item: UserItemProps;
}

export const UserItem: FC<UserItemComponentProps> = ({ item }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
    {showModal && <AddContact username={item.username} onClose={closeModal} />}
      <div
        className=" flex flex-row-reverse cursor-pointer ease-in duration-200 hover:bg-blue-300 p-2 rounded-md"
        onClick={() => {
          openModal();
        }}
      >
        <div className="w-full">
          <h4 className="text-md font-bold ml-2">{item.username}</h4>
        </div>
        <img
          className="rounded-full w-[40px] h-[39px] bg-black overflow-hidden"
          src={`${
            item.image
              ? `data:image/png;base64,${item.image}`
              : "https://preview.redd.it/bcyq3rjk2w071.png?auto=webp&s=97c9b873f1b41a7b9ff31331fd92f2e3fafed92f"
          }`}
          alt=""
        />
      </div>
    </>
  );
};
