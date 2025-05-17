import React from "react";
import Image from "next/image";
import img from "../../../assets/img/4.jpg";

type BookedCardProps = {
  title: string;
  location: string;
  onCancel?: () => void;
};

export default function BookedCard({
  title,
  location,
  onCancel,
}: BookedCardProps) {
  return (
    <div className="group border border-secondary rounded-2xl overflow-hidden bg-white hover:bg-blue-50 transition duration-200">
      <div className="bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        <Image src={img} alt="img" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h4 className="text-lg font-semibold text-darkBlue group-hover:underline">
          {title}
        </h4>
        <p className="text-sm text-gray-600">{location}</p>
        <div className="mt-3 flex gap-2 justify-end">
          <button className="text-base bg-primary hover:bg-secondary text-white px-4 py-1.5 rounded-full transition">
            Details
          </button>
          <button
            onClick={onCancel}
            className="text-base font-bold text-red-600 border border-red-300 hover:bg-red-100 px-4 py-1.5 rounded-full transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
