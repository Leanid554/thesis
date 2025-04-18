"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/icons/logo.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" flex items-center justify-center sm:p-10 bg-white  ">
        <form
          onSubmit={handleLogin}
          className=" container space-y-6 border border-grey rounded-xl shadow-xl p-5 sm:px-20 sm:pt-10 sm:pb-16 "
        >
          <div className="flex flex-col items-center">
            <Image className="pb-3" src={logo} alt="Logo" />

            <h1 className="text-2xl font-bold text-black text-center">
              Welcome back
            </h1>
            <p className="text-base  text-black text-center pt-1">
              Glad to see you again!
            </p>
            <p className="text-base   text-black text-center">
              Login to your account below
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black w-80">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black w-80">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-main-blue text-white font-semibold duration-200 rounded-md hover:bg-hover-main-blue transition"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
