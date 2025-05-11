"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react"; // npm install lucide-react

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white border border-blue-200 shadow-md rounded-2xl p-10 max-w-md w-full text-center animate-fade-in">
        <CheckCircle className="mx-auto mb-4 text-primary" size={60} />
        <h1 className="text-2xl font-bold text-primary mb-2">Booking Confirmed</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your reservation. A confirmation email has been sent to you.
        </p>
        <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition">
                Back to Home
            </button>
        </Link>
      </div>
    </div>
  );
}
