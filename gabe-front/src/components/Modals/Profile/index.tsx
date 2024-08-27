/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useContext, useEffect, useState } from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { AppContext } from "../../../context/store";
// import { CHAT_AXIOS } from "../../../config/config";
// import { UserActionTypes, UserAppState } from "../../../@types/context/context.types";
import { getUserByUsername } from "../../../services/user.service";

interface ProfileProps extends React.PropsWithChildren {
  onClose: () => void;
}

export const Profile: FC<ProfileProps> = ({ onClose }) => {
  const {
    state: { user }
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true); // Set to true initially to show loading state

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: user.firstname || '',
      last_name: user.lastname || '',
      phone: user.phone || '',
      image: user.image || '',
      bio: user.bio || '',
    },
  });

  useEffect(() => {
    const username = sessionStorage.getItem("gabe-username");

    if (username) {
      getUserByUsername(username).then(fetchedUser => {
          reset({
            first_name: fetchedUser.firstname,
            last_name: fetchedUser.lastname,
            phone: fetchedUser.phone,
            image: fetchedUser.image,
            bio: fetchedUser.bio,
          });
        })
        .catch(error => {
          console.error(error);
          // Handle the error (e.g., show an error message)
        })
        .finally(() => {
          setIsLoading(false); // Ensure loading state is turned off
        });
    } else {
      // Handle case where no username is found
      setIsLoading(false); // Ensure loading state is turned off
    }
  }, [user, reset]);

  const updateUserData = (data: any) => {
    console.log('updated user: ', data);

    // CHAT_AXIOS.patch(`/users/${user.id}/`, data).then((res) => {
    //   dispatch({
    //     type: UserActionTypes.Update_profile,
    //     payload: {
    //       image: res.data.avatar ? res.data.avatar : "",
    //       firstname: res.data.first_name,
    //       lastname: res.data.last_name,
    //       phonenumber: res.data.phone,
    //       bio: res.data.bio,
    //       id: res.data.id,
    //     },
    //   });
    //   alert("data updated successfully");
    //   onClose();
    // });
  };

  return(
    <div
      className="backdrop w-full h-full flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-1/3 h-[90%] rounded-lg pb-2 text-white modal translate-x-[80%] flex flex-col items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isLoading && <p className="text-center h-full w-full">Loading....</p>}
        {!isLoading && 
        (<>
        <h2 className="bg-white w-full h-7 text-black text-center font-bold">
          Profile
        </h2>
        <form className="flex flex-col justify-around h-full" onSubmit={handleSubmit(updateUserData)}>
          <div>
            <div className="flex gap-2">
              <div className="mb-2">
                <label htmlFor="firstname" className="profile__label block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  {...register("first_name", {
                    required: "First name is required",
                    maxLength: 50,
                  })}
                  className="text-black border border-gray-300 rounded w-full py-2 px-3"
                  placeholder="First Name"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="lastname" className="profile__label block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  {...register("last_name", { required: true, maxLength: 50 })}
                  className="text-black border border-gray-300 rounded w-full py-2 px-3"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="phone" className="profile__label block text-sm font-medium">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                {...register("phone", { required: true, maxLength: 20 })}
                className="text-black border border-gray-300 rounded w-full py-2 px-3"
                placeholder="Phone"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="image" className="profile__label block text-sm font-medium">
                Image
              </label>
              <input
                type="file"
                id="image"
                {...register("image")}
                accept="image/*"
                className="text-black border border-gray-300 rounded w-full py-2 px-3"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="bio" className="profile__label block text-sm font-medium">
                Bio
              </label>
              <textarea
                id="bio"
                {...register("bio", { required: true, maxLength: 300 })}
                rows={2}
                className="text-black border border-gray-300 rounded w-full py-2 px-3"
                placeholder="Bio"
              />
            </div>
          </div>
          <div className="flex w-full justify-between gap-3">
            <Button variant="contained" type="submit" className="flex-1">Update</Button>
            <Button variant="outlined" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
        </>)}
      </div>
    </div>
  );
};
