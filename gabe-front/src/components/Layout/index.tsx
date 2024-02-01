import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout: FC = (): JSX.Element => {
    
  
    return (
      <div className="bg-gray-300 p-2 flex flex-col justify-center items-center  mx-auto">
        <Header />
        <div className="w-full h-[calc(100vh-110px)] pt-2">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };