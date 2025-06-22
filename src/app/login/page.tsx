"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/icons/logo.svg";
import Toastify from "toastify-js";
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
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const showToast = (text: string, isError = false) => {
    Toastify({
      text,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: isError ? "#ef4444" : "#2bd12b",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "8px",
        fontSize: "14px",
        maxWidth: "300px",
        zIndex: "9999",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      },
      className: "toastify-progress",
    }).showToast();
  };

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
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", data.accessToken);

        showToast("Logged in successfully!");
        setTimeout(() => router.push("/"), 1000);
      } catch (err) {
        showToast("Invalid token received", true);
      }
    } else {
      showToast(data.error || "Login failed", true);
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
    </div>
  );
}
