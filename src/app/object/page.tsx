"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import iconBookMark from "./../../assets/icons/bookmark_blue.svg";
import iconBookMarkBorder from "./../../assets/icons/bookmark_blue_border.svg";
import Image from "next/image";
import img from "../../assets/img/nurseman.png";
import img2 from "../../assets/img/3.jpg";
import img3 from "../../assets/img/4.jpg";
import Plus from "../components/block/plus/plus";
import leftIcon from "../../assets/icons/blue_arrow_left_drop.svg";
import rightIcon from "../../assets/icons/blue_arrow_right_drop.svg";
import Reviews from "../components/block/reviews/reviews";
import Link from "next/link";

export default function HotelDetailPage() {
  const images = [img, img2, img3];
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div>
      <Navbar />
      <div className="container py-8  relative">
        <div className="relative">
          <Image
            src={images[currentImage]}
            alt={`Hotel image ${currentImage + 1}`}
            className="w-full h-60 xs:h-[600px]  rounded-2xl cursor-pointer"
            onClick={toggleFullscreen}
          />
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          >
            <Image src={leftIcon} className="w-3 mr-[2px]" alt="left" />
          </button>

          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          >
            <Image src={rightIcon} className="w-3 ml-[2px]" alt="right" />
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 overflow-hidden mt-6 p-6 bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl  md:text-2xl font-bold">Start Way Hotel</h1>
            <div className="flex items-center gap-6">
              <Reviews reviews="4.5" />
              <div onClick={toggleBookmark} className="cursor-pointer">
                <Image
                  src={isBookmarked ? iconBookMark : iconBookMarkBorder}
                  alt="bookmark"
                  className=" inline-block w-4"
                />
              </div>
            </div>
          </div>

          <p className="text-gray-600 mt-4">
            Cozy hotel with a sea view. Free Wi-Fi, excellent breakfast, and a
            great location near the beach.
          </p>

          {/* Amenities */}
          <div className="mt-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">Amenities</h2>
            <div className="flex gap-2 flex-wrap">
              {["WiFi", "WC", "Food", "Sea View"].map((amenity, idx) => (
                <Plus key={idx} text={amenity} />
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Guest Reviews
            </h2>
            <div className="space-y-4">
              {[
                { name: "Alex", text: "Great hotel, clean and cozy!" },
                {
                  name: "Marina",
                  text: "Very friendly staff, delicious breakfast.",
                },
              ].map((review, idx) => (
                <div key={idx} className="border rounded-xl p-4 bg-gray-50">
                  <p className="text-gray-700">{review.text}</p>
                  <p className="text-sm text-gray-500 mt-2">– {review.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link href={`/booking`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-2xl transition">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={toggleFullscreen}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
          >
            ×
          </button>

          <Image
            src={images[currentImage]}
            alt="Fullscreen hotel"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
