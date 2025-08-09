"use client";
import Image from "next/image";
import img from "./../../../assets/img/4.jpg";
import Delete from "./../../../assets/img/delete.png";
import Plus from "./plus/plus";
import Reviews from "./reviews/reviews";
import { useState } from "react";

interface BlockProps {
  isDeletemode?: boolean;
  discription:string;
  title: string;
  reviews?: string;
  tags?: string[];
  image?: string;
  onDelete?: () => void;
  imgWidth:string;
}

export default function Block({
  isDeletemode = false,
  discription,
  title,
  reviews,
  tags = [],
  image,
  onDelete,
  imgWidth
}: BlockProps) {
  return (
  <div className="rounded-2xl border border-gray-200">
      <div className="flex flex-col gap-5 lg:gap-0 xs:flex-row p-5">
        <div className="w-full xs:w-1/2">
          <Image
            src={image || img}
            alt={title}
            width={400}
            height={300}
            className={`${imgWidth} h-auto object-cover rounded`}
          />
        </div>
        <div className="w-full xs:w-1/2">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <h1 className="text-base">
                <strong>Hotel:</strong> {title}
              </h1>
              {reviews && <Reviews reviews={reviews} />}
            </div>
            {isDeletemode && (
              <div
                className="h-7 w-7 rounded-full duration-300 hover:bg-red-300 flex justify-center items-center"
                onClick={onDelete}
              >
                <button className="w-5 h-5 flex justify-center items-center">
                  <Image src={Delete} alt="" className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <p className="text-sm">{discription}</p>

          {tags.length > 0 && (
            <div className="flex pt-2 gap-2 flex-wrap">
              {tags.map((tag, i) => (
                <Plus key={i} text={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
