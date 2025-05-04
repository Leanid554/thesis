"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Image from "next/image";
import uploadIcon from "../../assets/icons/upload.svg";

export default function HotelForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeImage = () => setFile(null);

  return (
    <div>
      <Navbar />
      <div className="max-w-[648px] mx-auto px-4 md:px-0 pt-6 flex flex-col gap-6">
        <h1 className="text-center text-2xl font-bold">Register your object</h1>
        {/* name */}
        <div className="focus-within:text-blue-700">
          <p className="pb-2 text-lg transition-colors text-inherit">
            Name of object
          </p>
          <input
            type="text"
            placeholder="Name of object"
            className="w-full h-14 px-4 text-lg border border-gray-300 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all"
          />
        </div>

        {/* number */}
        <div className="focus-within:text-blue-700">
          <p className="pb-2 text-lg transition-colors text-inherit">Number </p>
          <input
            type="text"
            placeholder="+48 999-23-23"
            className="w-full h-14 px-4 text-lg border border-gray-300 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all"
          />
        </div>

        {/* geo */}
        <div className="focus-within:text-blue-700">
          <p className="pb-2 text-lg transition-colors text-inherit">
            Location{" "}
          </p>
          <input
            type="text"
            placeholder="Lublin"
            className="w-full h-14 px-4 text-lg border border-gray-300 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all"
          />
        </div>
        {/* Info */}
        <div className="focus-within:text-blue-700">
          <p className="pb-2 text-lg transition-colors text-inherit">Info</p>
          <textarea
            placeholder="Opis (opcjonalnie)"
            className="w-full h-32 px-4 pt-4 text-lg text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all resize-none"
          />
        </div>
        <div className="focus-within:text-blue-700">
          <p className="pb-2 text-lg transition-colors text-inherit">
            Select type of object
          </p>
          <select className="w-full h-14 px-4 text-lg border border-gray-300 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all">
            <option value="room">Room</option>
            <option value="hotel">Hotel</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* upload*/}
        <label
          htmlFor="fileInput"
          className="w-full border-2 border-dashed border-blue-500 rounded-lg py-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition"
        >
          {!file && (
            <>
              <Image
                src={uploadIcon}
                alt="upload icon"
                className="w-10 h-10 mb-4"
              />
              <p className="text-purple-main text-lg font-bold">
                Upload photo <span className="font-normal">(general)</span>
              </p>
              <p className="text-purple-main text-lg mt-1">
                lub upuść plik tutaj
              </p>
            </>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {file && (
            <div className="flex flex-col items-center">
              <p className="text-gray-600 text-sm">{file.name}</p>
              <button
                type="button"
                className="text-main-blue text-sm font-bold hover:underline mt-2"
                onClick={removeImage}
              >
                Delete
              </button>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
