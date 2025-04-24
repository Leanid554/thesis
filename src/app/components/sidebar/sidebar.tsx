"use client";
import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser } from "react-icons/fa";

export default function SearchBar() {
  const [search, setSearch] = useState({
    profile: "",
    location: "",
    contract: "",
    workTime: "",
    workType: "",
    place: "",
  });

  const handleChange = (key: string, value: string) => {
    setSearch((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log("Wyszukiwanie:", search);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-4 shadow-md mt-5">
      <div className="flex flex-wrap xl:flex-nowrap gap-4 mb-4">
        <div className="flex items-center w-full xl:w-1/3 bg-gray-50 rounded-full px-4 py-2">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Profil zawodowy"
            value={search.profile}
            onChange={(e) => handleChange("profile", e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <div className="flex items-center w-full xl:w-1/3 bg-gray-50 rounded-full px-4 py-2">
          <FaMapMarkerAlt className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Lokalizacja"
            value={search.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white text-sm rounded-full px-6 py-2 flex items-center gap-2  whitespace-nowrap"
        >
          Szukaj <FaSearch />
        </button>
      </div>

      {/* dropdown*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <Select
          placeholder="Rodzaj umowy"
          value={search.contract}
          onChange={(val) => handleChange("contract", val)}
          options={["o pracę", "o dzieło", "zlecenie", "B2B"]}
        />
        <Select
          placeholder="Wymiar pracy"
          value={search.workTime}
          onChange={(val) => handleChange("workTime", val)}
          options={["pełen etat", "3/4 etatu", "1/2 etatu", "na godziny"]}
        />
        <Select
          placeholder="Tryb pracy"
          value={search.workType}
          onChange={(val) => handleChange("workType", val)}
          options={["stacjonarny", "zdalny", "hybrydowy"]}
        />
        <Select
          placeholder="Miejsce pracy"
          value={search.place}
          onChange={(val) => handleChange("place", val)}
          options={["Lublin", "Gdańsk", "Warszawa", "Poznań"]}
        />
      </div>
    </div>
  );
}

function Select({
  placeholder,
  value,
  onChange,
  options,
}: {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 rounded-full px-4 py-2 text-sm text-gray-700 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
