"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/icons/logo.svg";

export default function SingupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" flex items-center justify-center sm:p-10 bg-white">
        <form
          onSubmit={handleLogin}
          className=" container space-y-6 border border-grey rounded-xl shadow-xl p-5 sm:px-20 sm:pt-10 sm:pb-16"
        >
          <div className="flex flex-col items-center">
            <Image className="pb-3" src={logo} alt="Logo" />

            <h1 className="text-2xl font-bold text-black text-center">
              Welcome!
            </h1>
            <p className="text-base  text-black text-center pt-1">
              Let’s get you set up.
            </p>
            <p className="text-base   text-black text-center">
              Please fill in the details below to create your account.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div>
              <label className="block text-sm font-medium text-black w-60 ">
                Name
              </label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black w-60">
                Surname
              </label>
              <input
                type="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black w-60 ">
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
              <label className="block text-sm font-medium text-black w-60">
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
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-main-blue text-white font-semibold duration-200 rounded-md hover:bg-hover-main-blue transition"
          >
            Sing Up
          </button>
        </form>
      </div>
    </div>
  );
}
