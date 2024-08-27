/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormValues } from ".";
import { AUTH_AXIOS, CHAT_AXIOS } from "../../../config/config";
import { AppContext } from "../../../context/store";
import { UserActionTypes } from "../../../@types/context/context.types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: {  },
  } = useForm<LoginFormValues>();
  const {dispatch} = useContext(AppContext);

  const navigation = useNavigate();


  const [loading, setLoading] = useState(false); // State for loading indicator


  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await AUTH_AXIOS.post("/login", data);
      console.log(response.data.user);
      
      const token = response.data.token;
      const username = response.data.user.username;

      dispatch({
        type: UserActionTypes.Login_Success,
        payload: {
          user: response.data.user,
        },
      });

      CHAT_AXIOS.defaults.headers.common.Authorization = "Bearer " + token;

      sessionStorage.setItem("gabe-token", token);
      sessionStorage.setItem("gabe-username", username);

      toast.success(response.data.message, {
        onClose: () => {
          navigation('/')
        }
      });

    } catch (error : any) {
      console.log(error);
      
      toast.error(error.response.data.error);
    } finally {
      setLoading(false); // Set loading to false when request is completed
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-xl font-bold text-[#3cebba]">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl font-bold text-[#3cebba]">
            Password
          </label>
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
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
};
