"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Delete from "./../../assets/img/delete.png";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "@headlessui/react";
export default function ChangeModePage() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  type User = {
    id: number | string;
    name: string;
    surname: string;
    email: string;
  };

  useEffect(() => {
    if (activeTab === "users") {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => {
          setUsers([]);
          toast.error(err);
        });
    }
  }, [activeTab]);

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      const res = await fetch(`/api/users/${userToDelete.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      toast.success("User deleted");
    } catch (err) {
      toast.error(String(err));
    } finally {
      setIsOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="font-bold text-3xl pt-20">Management</h1>
        <div className="flex gap-4 pt-4">
          <button
            className={`h-7 relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
              ${activeTab === "users" ? "after:w-full" : "after:w-0"}`}
            onClick={() => setActiveTab("users")}
          >
            <p>Users</p>
          </button>

          <button
            className={`h-7 relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
              ${activeTab === "announcements" ? "after:w-full" : "after:w-0"}`}
            onClick={() => setActiveTab("announcements")}
          >
            <p>Announcements</p>
          </button>
        </div>
        <div className="pt-8">
          {activeTab === "users" && (
            <div>
              <p className="text-xl">List Users</p>
              <div className="flex flex-col gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-[150px_200px_200px_400px_50px] rounded-lg border border-blue-400 py-2 px-2  items-center w-fit"
                  >
                    <p className="flex gap-1 items-baseline">
                      <span className="font-semibold text-sm">Name:</span>
                      {user.name}
                    </p>
                    <p className="flex gap-1 items-baseline">
                      <span className="font-semibold text-sm">Surname:</span>
                      {user.surname}
                    </p>
                    <p className="flex gap-1 items-baseline">
                      <span className="font-semibold text-sm">Surname:</span>
                      {user.name}
                    </p>
                    <p className="flex gap-1 items-baseline">
                      <span className="font-semibold text-sm">Email:</span>
                      {user.email}
                    </p>
                    <div
                      className="h-7 w-7 rounded-full duration-300 hover:bg-red-300 flex justify-center items-center"
                      onClick={() => {
                        setIsOpen(true);
                        setUserToDelete(user);
                      }}
                    >
                      <button className="w-5 h-5 flex justify-center items-center">
                        <Image src={Delete} alt="" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "announcements" && (
            <div>
              <p>Anc</p>
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-50 inset-0 flex items-center justify-center"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-40"
          aria-hidden="true"
        />
        <div className="relative bg-white p-6 rounded-xl w-[400px] mx-auto flex flex-col justify-center items-center shadow-lg z-50">
          <Dialog.Title className="text-xl font-bold mb-4">
            Delete User
          </Dialog.Title>
          <p className="mb-6 text-gray-700">
            Are you sure you want to delete the user?
          </p>
          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
      <ToastContainer />
    </div>
  );
}
