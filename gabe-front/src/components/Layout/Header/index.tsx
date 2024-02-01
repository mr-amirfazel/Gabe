import React from "react";

import GabeHeader from '../../../assets/gabe-header.png'

interface HeaderProps extends React.PropsWithChildren {}
export const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <div className="w-full p-2 flex justify-between items-center bg-slate-800 rounded-t-md">
      <h1 className="font-bold text-zinc-300 text-3xl">Gabe</h1>
      <div className="">
        <img className="rounded-full" src={GabeHeader} alt="GabeHeader" width={50} height={50} />
      </div>
    </div>
  );
};