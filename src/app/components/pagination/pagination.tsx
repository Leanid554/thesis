"use client";
import React from "react";
import Image from "next/image";
import left from "../../../assets/img/left.png";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center  text-lg disabled:opacity-30"
      >
        <Image src={left} className="w-5 h-5" alt="" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = currentPage === page;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`text-sm h-10 w-10 rounded-full transition 
                ${isActive ? "bg-blue-500 text-white" : "text-black"}`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center  text-lg disabled:opacity-30"
      >
        <Image src={left} className="w-5 h-5 rotate-180" alt="" />
      </button>
    </div>
  );
}
