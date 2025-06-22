"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Image from "next/image";
import uploadIcon from "../../assets/icons/upload.svg";
import PrivateRoute from "../components/context/PrivateRoute";


function HotelForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [info, setInfo] = useState("");
  const [type, setType] = useState("room");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          number,
          location,
          info,
          type,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert("Object registered successfully!");
    } catch (error) {
      alert("Network error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-[648px] mx-auto px-4 md:px-0 pt-6 pb-10 flex flex-col gap-6">
        <h1 className="text-center text-xl font-bold">Register your object</h1>

        <div className="focus-within:text-blue-700">
          <p className="pb-2 text-base">Name of object</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of object"
            className="w-full h-14 px-4 border rounded-full"
          />
        </div>

        <div className="focus-within:text-blue-700">
          <p className="pb-2 text-base">Number</p>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="+48 999-23-23"
            className="w-full h-14 px-4 border rounded-full"
          />
        </div>

        <div className="focus-within:text-blue-700">
          <p className="pb-2 text-base">Location</p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Lublin"
            className="w-full h-14 px-4 border rounded-full"
          />
        </div>

        <div className="focus-within:text-blue-700">
          <p className="pb-2 text-base">Info</p>
          <textarea
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Opis (opcjonalnie)"
            className="w-full h-32 px-4 pt-4 border rounded-xl"
          />
        </div>

        <div className="focus-within:text-blue-700 relative w-full">
          <p className="pb-2 text-base">Select type of object</p>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-14 pr-12 pl-4 border rounded-full"
          >
            <option value="room">Room</option>
            <option value="hotel">Hotel</option>
            <option value="other">Other</option>
          </select>
        </div>

        <label
          htmlFor="fileInput"
          className="w-full border-2 border-dashed border-blue-500 rounded-lg py-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition"
        >
          {files.length === 0 ? (
            <>
              <Image src={uploadIcon} alt="upload icon" className="w-10 h-10 mb-4" />
              <p className="text-purple-main text-lg font-bold">
                Upload photo <span className="font-normal">(general)</span>
              </p>
              <p className="text-purple-main text-lg mt-1">lub upuść plik tutaj</p>
            </>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-2">
                  <p className="text-gray-600 text-sm">{file.name}</p>
                  <button
                    type="button"
                    className="text-main-blue text-sm font-bold hover:underline"
                    onClick={() => removeImage(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-800 text-white text-base px-14 py-3 rounded-full"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default function HotelFormPage() {
  return (
    <PrivateRoute>
      <HotelForm />
    </PrivateRoute>
  );
}
