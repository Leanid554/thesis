"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar/navbar";
import FiltersPanel from "../components/filtersPanel/filtersPanel";
import Sidebar from "../components/sidebar/sidebar";
import Block from "../components/block/block";
import Pagination from "../components/pagination/pagination";
import PrivateRoute from "../components/context/PrivateRoute";


function ProtectedPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const allBlocks = Array.from({ length: 10 }, (_, i) => i + 1);

  const blocksPerPage = 3;
  const totalPages = Math.ceil(allBlocks.length / blocksPerPage);

  const startIndex = (currentPage - 1) * blocksPerPage;
  const endIndex = startIndex + blocksPerPage;
  const visibleBlocks = allBlocks.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col xl:flex-row w-full gap-4 container">
        <div className="w-100% xl:w-[20%]">
          <FiltersPanel />
        </div>
        <div className="w-100% xl:w-[80%]">
          <Sidebar />
          <div className="pt-4 flex flex-col gap-4">
            {visibleBlocks.map((block, index) => (
              <Link href={`/object/`} key={index}>
                <Block key={index} />
              </Link>
            ))}
          </div>

          {allBlocks.length > blocksPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <PrivateRoute>
      <ProtectedPageContent />
    </PrivateRoute>
  );
}
