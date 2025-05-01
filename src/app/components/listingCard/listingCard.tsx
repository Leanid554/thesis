import React from "react";
import Image from "next/image";
import img from "../../../assets/img/3.jpg";

type ListingCardProps = {
  title: string;
  location: string;
};

export default function ListingCard({ title, location }: ListingCardProps) {
  return (
    <div className="group border border-primary rounded-2xl overflow-hidden bg-white hover:shadow-lg transition">
      <div className=" bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
        <Image src={img} alt="img"></Image>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <h4 className="text-lg font-semibold text-darkBlue ">{title}</h4>
        <p className="text-sm text-gray-600">{location}</p>
        <div className="mt-3 flex justify-end">
          <button className="text-base bg-blue-500 hover:bg-hover-main-blue duration-200 text-white  bg-primary px-4 py-1.5 rounded-full hover:bg-secondary transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
