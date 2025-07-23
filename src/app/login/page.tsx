"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/icons/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/context/AuthContext";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  firstName: string;
  lastName: string;
  email: string;
  exp: number;
  iat: number;
  role: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),

    });

    const data = await res.json();

    if (res.ok) {
      try {
        const decoded: DecodedToken = jwtDecode(data.accessToken);

        const userData = {
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          email: decoded.email,
          role: decoded.role,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", data.accessToken);

        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => router.push("/"), 1000);

      } catch (err) {
        toast.error("Invalid token received", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Login failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex items-center justify-center sm:p-10 bg-white">
        <form
          onSubmit={handleLogin}
          className="container space-y-6 border border-grey rounded-xl shadow-xl p-5 sm:px-20 sm:pt-10 sm:pb-16"
        >
          <div className="flex flex-col items-center">
            <Image className="pb-3" src={logo} alt="Logo" />
            <h1 className="text-2xl font-bold text-black text-center">Welcome back</h1>
            <p className="text-base text-black text-center pt-1">Glad to see you again!</p>
            <p className="text-base text-black text-center">Login to your account below</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black w-80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 text-sm block w-full px-4 py-2 border border-border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black w-80">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 text-sm block w-full px-4 py-2 border border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-main-blue text-white font-semibold duration-200 rounded-md hover:bg-hover-main-blue transition"
          >
            Log in
          </button>

          <div className="flex justify-center items-center text-sm">
            <p className="flex gap-1">
              You don't have an
              <Link href="/signup">
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
