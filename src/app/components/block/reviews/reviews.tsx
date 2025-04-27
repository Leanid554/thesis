import React from "react";
import Image from "next/image";
import iconStar from "./../../../../assets/icons/star.svg";
type ReviewsProps = {
  reviews: string;
};

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-base text-green-600">{reviews}</p>
      <Image src={iconStar} alt="star" className="inline-block" />
    </div>
  );
}
