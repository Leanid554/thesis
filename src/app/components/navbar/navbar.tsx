"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import white_logo from "../../../assets/icons/icon_white.svg";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);

  const navLinks = ["Rent a place", "Register your object"];

  useEffect(() => {
    if (menuOpen) {
      setIsVisible(true);
      setTimeout(() => setAnimateOpen(true), 10);
    } else {
      setAnimateOpen(false);
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);
  return (
    <div className="bg-main-blue">
      <div className="container">
        <div className="pt-4 pb-4 flex justify-between items-center">
          <Link href={`/home`}>
            <Image className="w-12" src={white_logo} alt="logo" />
          </Link>
          {/* desktop menu */}
          <div className="hidden md:flex text-white gap-12">
            {navLinks.map((text, idx) => (
              <Link
                key={idx}
                href={idx === 0 ? "/rent" : "/register"}
                className="relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {text}
              </Link>
            ))}
          </div>

          {/* burger icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* profile button */}

          <div className="hidden md:block">
            <Link href={`/profile`}>
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
            </Link>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {isVisible && (
        <div className="relative md:hidden">
          <div
            className={`absolute top-full left-0 w-full bg-main-blue z-10 origin-top transform transition-all duration-300 ease-in-out ${
              animateOpen
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex flex-col items-start gap-4 pb-6 pt-2 text-white px-4 container">
              {navLinks.map((text, idx) => (
                <Link
                  key={idx}
                  href={idx === 0 ? "/rent" : "/register"}
                  className="text-base border-b border-white/30 pb-1 w-full"
                >
                  {text}
                </Link>
              ))}
              <Link href={`/profile`}>
                <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white text-white text-sm font-medium transition hover:bg-white hover:text-main-blue">
                  <span>Profile</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
