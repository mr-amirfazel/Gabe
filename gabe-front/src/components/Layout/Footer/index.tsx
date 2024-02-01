import React from "react";

interface FooterProps extends React.PropsWithChildren {}
export const Footer: React.FunctionComponent<FooterProps> = () => {
  return <h6 className="w-full text-white text-center text-sm bg-slate-800 rounded-b-md">made with ❤️</h6>;
};