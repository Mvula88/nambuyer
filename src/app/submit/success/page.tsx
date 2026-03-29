"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="w-20 h-20 bg-green-50 border border-green-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-black text-gray-900 mb-3">
        Submission Received!
      </h1>
      <p className="text-gray-500 mb-8">
        Thank you for submitting your car. Our team will review your details and
        get back to you shortly.
      </p>

      {ref && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">
            Your Reference Number
          </p>
          <p className="text-3xl font-black text-gray-900 tracking-wider">{ref}</p>
          <p className="text-xs text-gray-500 mt-2">
            Save this number to track your submission status.
          </p>
        </div>
      )}

      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-8 text-left">
        <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
          What happens next?
        </h2>
        <ol className="space-y-4 text-sm text-gray-500">
          <li className="flex gap-3 items-start">
            <span className="w-7 h-7 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
              1
            </span>
            <span className="pt-0.5">Our team reviews your submission within 24 hours.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="w-7 h-7 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
              2
            </span>
            <span className="pt-0.5">We contact you to schedule an in-person inspection and test drive.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="w-7 h-7 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
              3
            </span>
            <span className="pt-0.5">After inspection, we make you a fair offer.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="w-7 h-7 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
              4
            </span>
            <span className="pt-0.5">Accept the offer and get paid instantly!</span>
          </li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/track"
          className="btn-glow bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/25"
        >
          Track Your Submission
        </Link>
        <Link
          href="/"
          className="bg-gray-100 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="text-center text-gray-400">Loading...</div>
            }
          >
            <SuccessContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
