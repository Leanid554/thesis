"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Image from "next/image";
import img from "../../../assets/img/nurseman.png";
import img2 from "../../../assets/img/3.jpg";
import img3 from "../../../assets/img/4.jpg";
import Plus from "../../components/block/plus/plus";
import leftIcon from "../../../assets/icons/blue_arrow_left_drop.svg";
import rightIcon from "../../../assets/icons/blue_arrow_right_drop.svg";
import iconBookMark from "../../../assets/icons/bookmark_blue.svg";
import iconBookMarkBorder from "../../../assets/icons/bookmark_blue_border.svg";
import Reviews from "../../components/block/reviews/reviews";
import Link from "next/link";
import { useParams } from "next/navigation";
import { json } from "stream/consumers";
import { toast, ToastContainer } from "react-toastify";

type Announcement = {
  id: number;
  name: string;
  info: string | "";
  flavors: string[];
  images: string[];
};

export default function HotelDetailPage() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/objects?id=${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("failed to load")))
      .then((data) =>
        setAnnouncement(Array.isArray(data.items) ? data.items[0] : data)
      )
      .catch((err) => {
        toast.error(err);
        setAnnouncement(null);
      });
  }, [id]);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (!announcement) {
    return (
      <div>
        <Navbar />
        <div className="container py-8">Loading…</div>
        <ToastContainer />
      </div>
    );
  }
  const images = announcement.images?.length
    ? announcement.images
    : ["/no-image.png"];
  const prevImage = () =>
    setCurrentImage((p) => (p === 0 ? images.length - 1 : p - 1));
  const nextImage = () =>
    setCurrentImage((p) => (p === images.length - 1 ? 0 : p + 1));

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div>
      <Navbar />
      <div className="container py-8 relative">
        <div className="relative">
          <Image
            src={images[currentImage]}
            alt={`image ${currentImage + 1}`}
            width={1200}
            height={600}
            className="w-full h-60 xs:h-[600px] rounded-2xl object-cover cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
              >
                <Image src={leftIcon} alt="left" className="w-3 mr-[2px]" />
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
              >
                <Image src={rightIcon} alt="right" className="w-3 ml-[2px]" />
              </button>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 overflow-hidden mt-6 p-6 bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">
              {announcement.name}
            </h1>
            <div className="flex items-center gap-6">
              <Reviews reviews="4.5" />
              <button onClick={() => setIsBookmarked((v) => !v)}>
                <Image
                  src={isBookmarked ? iconBookMark : iconBookMarkBorder}
                  alt="bookmark"
                  className="inline-block w-4"
                />
              </button>
            </div>
          </div>

          <p className="text-gray-600 mt-4">
            {announcement.info || "No description provided."}
          </p>

          {!!announcement.flavors.length && (
            <div className="mt-6">
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Amenities
              </h2>
              <div className="flex gap-2 flex-wrap">
                {announcement.flavors.map((t, i) => (
                  <Plus key={i} text={t} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Link href={`/booking/${announcement.id}`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-2xl transition">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
          >
            ×
          </button>
          <Image
            src={images[currentImage]}
            alt="fullscreen"
            width={1600}
            height={900}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
