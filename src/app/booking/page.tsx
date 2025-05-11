"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from "@stripe/stripe-js";


export default function BookingPage() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [comment, setComment] = useState("");
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [options, setOptions] = useState({
    parking: false,
    breakfast: false,
    pets: false,
  });
  const stripePromise = loadStripe("pk_test_51RNX5oRpcspzFeghQDdMbGcjV3DTqv8Rej7b5MxM2QhF5P8uizXVZ8tUpmWIAxvp4JI99OCKRsbYliZRIyEyuWRO00wV7uU8ye"); // замени на свой publishable key


  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGuestChange = (key: keyof typeof guests, value: number) => {
    if (value >= 0) {
      setGuests((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleBooking = async () => {
    const stripe = await stripePromise;
  
    if (!stripe) {
      toast.error("Stripe failed to load.");
      return;
    }
  
    // ВРЕМЕННО: имитируем редирект на Stripe Checkout (можно заменить на реальную ссылку)
    toast.success("Redirecting to payment...", { autoClose: 1500 });
  
    setTimeout(() => {
      window.location.href = "/success"; // имитируем успешную оплату
    }, 2000);
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white border border-blue-100 shadow-sm rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-primary mb-6 text-center">Book Your Stay</h1>

        {/* Dates */}
        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-1">Check-in Date</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-1">Check-out Date</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Guests */}
        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-2">Guests</label>
          <div className="flex gap-4">
            <div className="w-full">
              <span className="block text-xs text-gray-500 mb-1">Adults</span>
              <input
                type="number"
                min={1}
                value={guests.adults}
                onChange={(e) => handleGuestChange("adults", parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="w-full">
              <span className="block text-xs text-gray-500 mb-1">Children</span>
              <input
                type="number"
                min={0}
                value={guests.children}
                onChange={(e) => handleGuestChange("children", parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Comment */}
        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Any additional requests..."
          />
        </div>

        {/* Options */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Additional Options</label>
          <div className="flex flex-col gap-2">
            {Object.entries(options).map(([key, value]) => (
              <label key={key} className="inline-flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  className="accent-primary w-5 h-5"
                  checked={value}
                  onChange={() => toggleOption(key as keyof typeof options)}
                />
                <span>
                  {key === "parking" && "Parking"}
                  {key === "breakfast" && "Breakfast Included"}
                  {key === "pets" && "Pets Allowed"}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleBooking}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-2xl transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
