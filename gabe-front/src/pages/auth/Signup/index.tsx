import { FC } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./index.css";
import { AXIOS } from "../../../config/config";

export const Signup: FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: unknown) => {
    AXIOS.post("/register", data).then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: true })}
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Username"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Password"
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
        <div className="mb-2">
          <Link className="text-lg" to={"/auth/login"}>
            Already have an Account? Login!
          </Link>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 w-full"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};
