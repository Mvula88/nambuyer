"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import { createClient } from "@/lib/supabase-client";
import { formatCurrency, formatDate, formatDateTime, statusLabels } from "@/lib/utils";
import { Submission, SubmissionStatus } from "@/types";

const statusOrder: SubmissionStatus[] = [
  "pending",
  "reviewing",
  "inspection_scheduled",
  "offer_made",
  "accepted",
  "completed",
];

export default function TrackPage() {
  const [reference, setReference] = useState("");
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!reference.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("submissions")
        .select("*")
        .eq("reference_number", reference.trim().toUpperCase())
        .single();

      if (fetchError || !data) {
        setSubmission(null);
        setError("No submission found with that reference number.");
      } else {
        setSubmission(data as Submission);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentStatusIndex = submission
    ? statusOrder.indexOf(submission.status as SubmissionStatus)
    : -1;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
              Submission Tracker
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Track your submission
            </h1>
            <p className="mt-3 text-gray-500">
              Enter your reference number to check the status of your car
              submission.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="e.g. BC-2026-12345"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 input-modern text-sm uppercase font-mono tracking-wider"
              />
              <button
                onClick={handleSearch}
                disabled={loading || !reference.trim()}
                className="btn-glow bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/25 disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? "..." : "Track"}
              </button>
            </div>
          </div>

          {error && searched && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-center text-sm">
              {error}
            </div>
          )}

          {submission && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Reference
                  </p>
                  <p className="font-bold text-lg text-gray-900 font-mono">
                    {submission.reference_number}
                  </p>
                </div>
                <StatusBadge status={submission.status} />
              </div>

              {/* Car Info */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 mb-2">
                  {submission.year} {submission.make} {submission.model}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                  <p>Color: {submission.color}</p>
                  <p>Mileage: {submission.mileage.toLocaleString()} km</p>
                  <p className="capitalize">
                    Transmission: {submission.transmission}
                  </p>
                  <p className="capitalize">
                    Condition: {submission.condition}
                  </p>
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900">
                  Asking Price: {formatCurrency(submission.asking_price)}
                </p>
              </div>

              {/* Offer */}
              {submission.offer_amount && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">
                    Our Offer
                  </p>
                  <p className="text-2xl font-black text-gray-900 mt-1">
                    {formatCurrency(submission.offer_amount)}
                  </p>
                  {submission.offer_notes && (
                    <p className="text-sm text-green-700/70 mt-1">
                      {submission.offer_notes}
                    </p>
                  )}
                </div>
              )}

              {/* Inspection */}
              {submission.inspection_date && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider">
                    Inspection Scheduled
                  </p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {formatDateTime(submission.inspection_date)}
                  </p>
                  {submission.inspection_notes && (
                    <p className="text-sm text-purple-700/70 mt-1">
                      {submission.inspection_notes}
                    </p>
                  )}
                </div>
              )}

              {/* Status Timeline */}
              {submission.status !== "rejected" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 text-sm">
                    Progress
                  </h3>
                  <div className="space-y-3">
                    {statusOrder.map((status, index) => {
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;
                      return (
                        <div key={status} className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                              isCompleted
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "bg-gray-100 border border-gray-200 text-gray-400"
                            } ${isCurrent ? "ring-2 ring-blue-400/30" : ""}`}
                          >
                            {isCompleted ? (
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <span
                            className={`text-sm ${
                              isCompleted
                                ? "text-gray-900 font-medium"
                                : "text-gray-400"
                            }`}
                          >
                            {statusLabels[status]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-400 text-center pt-2">
                Submitted on {formatDate(submission.created_at)}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
