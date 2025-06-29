"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import { Dialog } from "@headlessui/react";
import { Eye, EyeOff } from "lucide-react";
import ListingCard from "../components/listingCard/listingCard";
import FavoriteCard from "../components/favoriteCard/favoriteCard";
import BookedCard from "../components/bookedCard/bookedCard";
import { useAuth } from "../components/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "../components/context/PrivateRoute";


export function ProtectedPageContent() {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    setShowModal(false);

    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };


  const listings = [
    { title: "Sunny Beach Hotel", location: "Minsk, Belarus" },
    { title: "Hostel Relax", location: "Grodno, Belarus" },
  ];

  const favorites = [
    { title: "Northern Guesthouse", location: "Vitebsk, Belarus" },
    { title: "Breeze Hotel", location: "Brest, Belarus" },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto flex flex-col pt-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">User Profile</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-blue-600 rounded-lg hover:bg-secondary transition px-4 py-2"
          >
            Edit Profile
          </button>
        </div>

        <div className="border border-secondary bg-white rounded-2xl mt-5 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-900">
            <Input label="Last Name" value={formData.lastName} />
            <Input label="First Name" value={formData.firstName} />
            <Input label="Email" value={formData.email} />
          </div>
        </div>

        <Section title="My Listings" items={listings} Component={ListingCard} />
        <Section title="Favorites" items={favorites} Component={FavoriteCard} />
        <Section title="Booked" items={favorites} Component={BookedCard} />
      </div>

      <EditModal
        open={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        onChange={setFormData}
        onSave={handleSave}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />
      <ToastContainer />
    </div>
  );
}


function Input({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-hover-main-blue mb-1">{label}</label>
      <input
        type="text"
        readOnly
        value={value}
        className="border border-gray-300 rounded-full px-4 py-2 bg-gray-100"
      />
    </div>
  );
}


function Section({ title, items, Component }: { title: string; items: any[]; Component: any }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-black py-6">{title}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Component key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}

function EditModal({
  open,
  onClose,
  formData,
  onChange,
  onSave,
  showPassword,
  onTogglePassword,
}: {
  open: boolean;
  onClose: () => void;
  formData: any;
  onChange: (data: any) => void;
  onSave: () => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white border border-darkBlue rounded-2xl p-6 w-full max-w-md animate-fade-in">
          <Dialog.Title className="text-xl text-center font-bold mb-4 text-darkBlue">
            Edit Profile
          </Dialog.Title>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-hover-main-blue mb-1">
                First Name
              </label>
              <input
                type="text"
                className="border border-gray-300 px-4 py-2 rounded-full"
                value={formData.firstName}
                onChange={(e) =>
                  onChange({ ...formData, firstName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-hover-main-blue mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="border border-gray-300 px-4 py-2 rounded-full"
                value={formData.lastName}
                onChange={(e) =>
                  onChange({ ...formData, lastName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-hover-main-blue mb-1">
                Email
              </label>
              <input
                type="email"
                className="border border-gray-300 px-4 py-2 rounded-full"
                value={formData.email}
                onChange={(e) =>
                  onChange({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-hover-main-blue mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="border border-gray-300 px-4 py-2 rounded-full w-full pr-10"
                  value={formData.password || ""}
                  onChange={(e) =>
                    onChange({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={onTogglePassword}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={onSave}
                className="py-2 w-24 border border-main-blue bg-main-blue text-white rounded-lg hover:bg-blue-800 duration-200"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="py-2 w-24 border border-gray-300 hover:bg-gray-100 duration-200 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>

  );

}
export default function Page() {
  return (
    <PrivateRoute>
      <ProtectedPageContent />
    </PrivateRoute>
  );
}
