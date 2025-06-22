"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import img from "../assets/img/3.jpg";
import Navbar from "./components/navbar/navbar";
import { useAuth } from "./components/context/AuthContext";


const listings = [
  {
    id: 1,
    title: "Cozy Apartment in the City Center",
    description: "1-bedroom apartment, perfect for students or couples. Close to metro and shops.",
    image: img,
    price: "$850 / month",
  },
  {
    id: 2,
    title: "Modern Loft with Great View",
    description: "Spacious loft with a skyline view, includes parking and gym access.",
    image: img,
    price: "$1200 / month",
  },
  {
    id: 3,
    title: "Charming Studio Near the Park",
    description: "Small but cozy studio ideal for freelancers and solo travelers.",
    image: img,
    price: "$650 / month",
  },
];

export default function HomePage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-darkBlue mb-4">
            Find Your Perfect Place to Rent
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our platform helps you rent or list properties quickly and easily. Transparent deals, verified listings, and real reviews.
          </p>
        </section>

        {/* Listings */}
        <section>
          <h2 className="text-2xl font-semibold text-darkBlue mb-8 text-center">
            Latest Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <Link href={`/object/${listing.id}`} key={listing.id}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                    width={600}
                    height={300}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{listing.title}</h3>
                    <p className="text-gray-600 mt-2">{listing.description}</p>
                    <p className="text-primary font-medium mt-4">{listing.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        {!user && (
          <section className="mt-24 bg-primary text-black py-12 px-6 rounded-xl shadow-md text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-6">
              Join our community and find or list your property today.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Create an Account
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
