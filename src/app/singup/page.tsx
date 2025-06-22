"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/icons/logo.svg";
import Toastify from "toastify-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../components/context/AuthContext";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
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
    }).showToast();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, surname, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      const userData = { name, email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", data.accessToken);

      showToast("Signed up successfully!");
      router.push("/rent");
    } else {
      showToast(data.error || "Registration failed", true);
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
              <label className="block text-sm font-medium text-black w-60">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 text-sm block w-full px-4 py-2 border border-border-grey rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black w-60">Surname</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
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
    </div>
  );
}
