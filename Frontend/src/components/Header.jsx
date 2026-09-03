import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className=" bg-grey-500 flex flex-col items-center mt-40 px-4 text-center ">
      <img
        src={assets.header_img}
        alt=""
        className="rounded-full w-36 h-36 mb-6"
      />
      <h1 className="gap-3 flex items-center text-xl sm:text-3xl font-medium mb-2">
        Hey Developer{" "}
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />{" "}
      </h1>
      <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
        welcome to our app
      </h2>
      <p className="mb-2">hey good to see you now lets get you started</p>
      <button className="border border-grey-500 px-8 py-3 rounded-full mb-4">
        Get Started
      </button>
    </div>
  );
};

export default Header;
