"use client";
import Image from "next/image";
import img from "./../../../assets/img/nurseman.png";

import Plus from "./plus/plus";
import Reviews from "./reviews/reviews";

export default function Block() {
  return (
    <div className="rounded-2xl border border-gray-200">
      <div className="flex flex-col gap-5 lg:gap-0 xs:flex-row p-5">
        <div className="w-full xs:w-1/2">
          <Image src={img} className="w-96" alt="nurseman" />
        </div>
        <div className="w-full xs:w-1/2">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <h1 className="text-base">
                <strong>Hotel:</strong> Start Way
              </h1>
              <Reviews reviews="4.5" />
            </div>
          </div>

          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            minus quisquam possimus reprehenderit excepturi id corporis suscipit
            tenetur! Quam cupiditate dolore distinctio officia nesciunt
            blanditiis ratione deleniti omnis repellat quasi.
          </p>
          <div className="flex pt-2 gap-2">
            <Plus text="wifi" />
            <Plus text="wc" />
            <Plus text="food" />
            <Plus text="sea" />
          </div>
        </div>
      </div>
    </div>
  );
}
