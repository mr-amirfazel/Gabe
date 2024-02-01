import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import './index.css'

import Gabe from "../../../assets/gabe.png"



export const AuthLayout: FC = (): JSX.Element => {

    const location = useLocation();
    const  pathname  = location.pathname.replace("/auth/", "");
    
    

    return (
        <div className="auth-container">
        <div className="glass-box">
            <div className="w-full flex items-center justify-center">
                <img  src={Gabe} alt="gabe_logo" width="120px" height="120px"  />
            </div>
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#3cebba] capitalize">{pathname}</h2>
          <Outlet></Outlet>
        </div>
      </div>
    );
  };