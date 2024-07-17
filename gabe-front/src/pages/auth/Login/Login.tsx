import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormValues } from ".";
import { AUTH_AXIOS, CHAT_AXIOS } from "../../../config/config";
import { AppContext } from "../../../context/store";
import { UserActionTypes } from "../../../@types/context/context.types";

export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { _ },
  } = useForm<LoginFormValues>();
  const {dispatch} = useContext(AppContext);

  const navigation = useNavigate();



  const onSubmit: SubmitHandler<LoginFormValues> =  (data) => {
    // Handle form submission with the data

    AUTH_AXIOS.post("/login", data).then((response) => {
      console.log(response.data);

      const token = response.data.token;
      const username = response.data.user.username;

      dispatch({
        type: UserActionTypes.Login_Success,
        payload: {
          user: response.data.user
        }
      })

      CHAT_AXIOS.defaults.headers.common.Authorization =
        "Bearer " + token;


      sessionStorage.setItem("gabe-token", token);
      sessionStorage.setItem("gabe-username", username);


      navigation('/')
    });

    
    

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
          Login
        </button>
      </form>
    </>
  );
};
