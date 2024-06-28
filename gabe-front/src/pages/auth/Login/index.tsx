/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { AXIOS } from "../../../config/axios.config";
import { AppContext } from "../../../context/store";
import { UserActionTypes } from "../../../@types/context/context.types";

interface LoginFormValues {
  username: string;
  password: string;
}

export const Login: FC = () => {
  const { register, handleSubmit , formState: { errors } } = useForm<LoginFormValues>();

  const {
    state: { user },
    dispatch,
  } = useContext(AppContext);
  const navigation = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    // Handle form submission with the data
    console.log(errors);
    
    console.log(data);

    AXIOS.post('/login/', data).then(result =>{
        dispatch({
          type: UserActionTypes.Login_Success,
          payload: {
            refresh: result.data.refresh,
            access: result.data.access,
            username: data.username
          }
        })

        AXIOS.defaults.headers.common.Authorization =
        "Bearer " + result.data.access;
      navigation("/");

      localStorage.setItem("access", result.data.access)
      localStorage.setItem("refresh", result.data.refresh)
      
    })
    
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-xl font-bold text-[#3cebba]">Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl font-bold text-[#3cebba]">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <Link className="text-lg" to={"/auth/signup"}>
            Don't have an account? Sign Up!
          </Link>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 w-full"
        >
          Login
        </button>
      </form>
    </>
  );
};
