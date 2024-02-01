import { FC } from "react";
import { Outlet } from "react-router-dom";

export const Layout: FC = (): JSX.Element => {
    
  
    return (
      <div className="bg-gray-300 p-2 flex flex-col justify-center items-center max-w-7xl mx-auto">
        <div className="w-full h-[calc(100vh-60px)] pt-2">
            layout
          <Outlet />
        </div>
      </div>
    );
  };