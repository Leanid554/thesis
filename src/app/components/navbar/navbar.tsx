import React from "react";
import Image from "next/image";
import white_logo from "../../../assets/icons/icon_white.svg";

export default function navbar() {
  return (
    <div className="bg-main-blue">
      <div className="container">
        <div className="pt-12 pb-8 flex justify-between items-center">
          <Image className="w-12" src={white_logo} alt="logo" />
          <div className="text-white flex gap-12">
            {["Rent a place", "Register your object"].map((text, idx) => (
              <h1
                key={idx}
                className="relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {text}
              </h1>
            ))}
          </div>

          <button className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white text-white font-medium transition-all duration-200 hover:bg-white hover:text-main-blue hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
              />
            </svg>
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
