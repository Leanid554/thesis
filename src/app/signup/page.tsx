"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/icons/logo.svg";
import Toastify from "toastify-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../components/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type DecodedToken = {
  firstName: string;
  lastName: string;
  email: string;
  exp: number;
  iat: number;
};

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: firstName, surname: lastName, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      try {
        const userData = {
          firstName: data.user.name,
          lastName: data.user.surname,
          email: data.user.email,
        };


        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", data.accessToken);

        toast.success("Signed up successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => router.push("/"), 3000);
      } catch (err) {
        toast.success("Invalid token received", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      toast.error(data.error || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen container">
      <div className="flex items-center justify-center sm:p-10 bg-white">
        <form
          onSubmit={handleRegister}
          className="container space-y-6 border border-grey rounded-xl shadow-xl p-5 sm:px-20 sm:pt-10 sm:pb-16"
        >
          <div className="flex flex-col items-center">
            <Image className="pb-3" src={logo} alt="Logo" />
            <h1 className="text-2xl font-bold text-black text-center">Welcome!</h1>
            <p className="text-base text-black text-center pt-1">Let’s get you set up.</p>
            <p className="text-base text-black text-center">
              Please fill in the details below to create your account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div>
              <label className="block text-sm font-medium text-black w-60">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="mt-1 text-sm block w-full px-4 py-2 border border-border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black w-60">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="mt-1 text-sm block w-full px-4 py-2 border border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black w-60">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 text-sm block w-full px-4 py-2 border border-border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black w-60">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 text-sm block w-full px-4 py-2 border border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-main-blue text-white font-semibold duration-200 rounded-md hover:bg-hover-main-blue transition"
          >
            Sign Up
          </button>

          <div className="flex justify-center items-center text-sm">
            <p className="flex gap-1">
              Already have an
              <Link href="/login">
                <span className="text-blue-700">account</span>?
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
