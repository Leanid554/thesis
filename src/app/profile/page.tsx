"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import { Dialog } from "@headlessui/react";
import { Eye, EyeOff } from "lucide-react";
import ListingCard from "../components/listingCard/listingCard";
import FavoriteCard from "../components/favoriteCard/favoriteCard";
import BookedCard from "../components/bookedCard/bookedCard";

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    lastName: "Smith",
    firstName: "John",
    email: "john.smith@example.com",
    password: "mysecret123",
  });

  const [formData, setFormData] = useState({ ...user });

  const handleSave = () => {
    setUser(formData);
    setShowModal(false);
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
      <div className="container mx-auto  flex flex-col pt-10 ">
        {/* Profile Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">User Profile</h2>
          <div className="flex justify-between items-center ">
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary text-blue-300 rounded-lg hover:bg-secondary transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="border border-secondary bg-white rounded-2xl mt-5 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-900">
            {/* Last Name */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold  text-hover-main-blue mb-1">
                Last Name
              </label>
              <input
                type="text"
                readOnly
                value={user.lastName}
                className="border border-gray-300  rounded-full px-4 py-2 bg-gray-100"
              />
            </div>

            {/* First Name */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-hover-main-blue mb-1">
                First Name
              </label>
              <input
                type="text"
                readOnly
                value={user.firstName}
                className="border border-gray-300 rounded-full px-4 py-2 bg-gray-100"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-hover-main-blue mb-1">
                Email
              </label>
              <input
                type="email"
                readOnly
                value={user.email}
                className="border border-gray-300 rounded-full px-4 py-2 bg-gray-100"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="text-sm font-semibold text-hover-main-blue mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                readOnly
                value={user.password}
                className="border border-gray-300 rounded-full px-4 py-2 pr-10 bg-gray-100"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-primary"
                type="button"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div>
          <h3 className="text-xl font-bold text-black py-6">My Listings</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item, idx) => (
              <ListingCard
                key={idx}
                title={item.title}
                location={item.location}
              />
            ))}
          </div>
        </div>

        {/* Favorites */}
        <div>
          <h3 className="text-xl font-bold text-black py-6">Favorites</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item, idx) => (
              <FavoriteCard
                key={idx}
                title={item.title}
                location={item.location}
                onRemove={() => console.log("Removed", item.title)}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-black py-6">Favorites</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item, idx) => (
              <BookedCard
                key={idx}
                title={item.title}
                location={item.location}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white border border-darkBlue rounded-2xl p-6 w-full max-w-md animate-fade-in">
            <Dialog.Title className="text-xl text-center font-bold mb-4 text-darkBlue">
              Edit Profile
            </Dialog.Title>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-hover-main-blue mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 px-4 py-2 rounded-full"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-hover-main-blue mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-300 px-4 py-2 rounded-full"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-hover-main-blue mb-1">
                  Last Name
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 px-4 py-2 rounded-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-hover-main-blue mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="border border-gray-300 px-4 py-2 rounded-full w-full pr-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={handleSave}
                  className="py-2 w-24 border border-main-blue bg-main-blue text-white rounded-lg hover:bg-blue-800 duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="py-2 w-24 border border-gray-300 hover:bg-gray-100 duration-200 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
