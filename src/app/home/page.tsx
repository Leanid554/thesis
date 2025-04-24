"use client";
import React from "react";
import Navbar from "../components/navbar/navbar";
import FiltersPanel from "../components/filtersPanel/filtersPanel";
import Sidebar from "../components/sidebar/sidebar";

export default function page() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col xl:flex-row w-full gap-4 container">
        <div className="w-100% xl:w-[20%]">
          <FiltersPanel />
        </div>
        <div className="w-100% xl:w-[80%]">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
