/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useContext } from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { AppContext } from "../../../context/store";
import { CHAT_AXIOS } from "../../../config/config";
import { UserActionTypes } from "../../../@types/context/context.types";

interface ProfileProps extends React.PropsWithChildren {
  onClose: any;
}
export const Profile: FC<ProfileProps> = ({ onClose }) => {
  const {
    state: { user },
    dispatch,
  } = useContext(AppContext);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      first_name: user.firstname,
      last_name: user.lastname,
      phone: user.phonenumber,
      image: user.image,
      bio: user.bio,
    },
  });

  const updateUserData = (data: any) => {
    console.log(data);

    CHAT_AXIOS.patch(`/users/${user.id}/`, data).then((res) => {
      dispatch({
        type: UserActionTypes.Update_profile,
        payload: {
          image: res.data.avatar ? res.data.avatar : "",
          firstname: res.data.first_name,
          lastname: res.data.last_name,
          phonenumber: res.data.phone,
          bio: res.data.bio,
          id: res.data.id,
        },
      });
      alert("data updated successfully");
      onClose();
    });
  };
  return (
    <div
      className="backdrop w-full flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-1/2 rounded-lg pb-2 text-black modal translate-x-60 flex flex-col justify-center items-center bg-blue-400"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="bg-white w-full h-7 text-black text-center font-bold">
          Profile
        </h2>
        <form onSubmit={handleSubmit(updateUserData)}>
          <div className="flex gap-2">
            <div className="mb-2">
              <label htmlFor="firstname" className="block text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                {...register("first_name", {
                  required: "firstname is required",
                  maxLength: 50,
                })}
                className="border border-gray-300 rounded w-full py-2 px-3"
                placeholder="First Name"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="lastname" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                {...register("last_name", { required: true, maxLength: 50 })}
                className="border border-gray-300 rounded w-full py-2 px-3"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", { required: true, maxLength: 20 })}
              className="border border-gray-300 rounded w-full py-2 px-3"
              placeholder="Phone"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="image" className="block text-sm font-medium">
              Image
            </label>
            <input
              type="file"
              id="image"
              {...register("image")}
              accept="image/*"
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="bio" className="block text-sm font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              {...register("bio", { required: true, maxLength: 300 })}
              rows={2}
              className="border border-gray-300 rounded w-full py-2 px-3"
              placeholder="Bio"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit">Update</button>
            <Button variant="contained" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
