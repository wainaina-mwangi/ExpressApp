import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between p-4 sm:px-24 sm:p-6 top-0 absolute">
      <img src={assets.logo} alt="logo" className="w-28 sm:w-32" />
      <button className="border-gray-500 border items-center rounded-full flex gap-2 px-6 py-2 text-grey-800 hover:bg-grey-100 transition-all bg-gray-100 ">
        Login <img src={assets.arrow_icon} alt="" />
      </button>
    </div>
  );
};

export default Navbar;
