"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  statusLabels,
} from "@/lib/utils";
import {
  Submission,
  SubmissionPhoto,
  SubmissionStatus,
} from "@/types";
import StatusBadge from "@/components/StatusBadge";

const allStatuses: SubmissionStatus[] = [
  "pending",
  "reviewing",
  "inspection_scheduled",
  "offer_made",
  "accepted",
  "rejected",
  "completed",
];

const inputClass =
  "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 input-modern text-sm";

export default function AdminSubmissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [photos, setPhotos] = useState<SubmissionPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [newStatus, setNewStatus] = useState("");
  const [offerAmount, setOfferAmount] = useState("");
  const [offerNotes, setOfferNotes] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectionNotes, setInspectionNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      const { data: sub } = await supabase
        .from("submissions")
        .select("*")
        .eq("id", id)
        .single();

      if (!sub) {
        router.push("/admin/submissions");
        return;
      }

      const { data: pics } = await supabase
        .from("submission_photos")
        .select("*")
        .eq("submission_id", id)
        .order("created_at");

      setSubmission(sub as Submission);
      setPhotos((pics as SubmissionPhoto[]) || []);
      setNewStatus(sub.status);
      setOfferAmount(sub.offer_amount?.toString() || "");
      setOfferNotes(sub.offer_notes || "");
      setInspectionDate(
        sub.inspection_date
          ? new Date(sub.inspection_date).toISOString().slice(0, 16)
          : ""
      );
      setInspectionNotes(sub.inspection_notes || "");
      setLoading(false);
    };

    fetchData();
  }, [id, router]);

  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === submission?.status) return;
    setSaving(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase
      .from("submissions")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      setMessage("Failed to update status.");
    } else {
      setSubmission((prev) =>
        prev ? { ...prev, status: newStatus as SubmissionStatus } : prev
      );
      setMessage("Status updated successfully.");
    }
    setSaving(false);
  };

  const handleOfferSubmit = async () => {
    if (!offerAmount) return;
    setSaving(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase
      .from("submissions")
      .update({
        offer_amount: parseFloat(offerAmount),
        offer_notes: offerNotes || null,
        status: "offer_made",
      })
      .eq("id", id);

    if (error) {
      setMessage("Failed to save offer.");
    } else {
      setSubmission((prev) =>
        prev
          ? {
              ...prev,
              offer_amount: parseFloat(offerAmount),
              offer_notes: offerNotes || null,
              status: "offer_made",
            }
          : prev
      );
      setNewStatus("offer_made");
      setMessage("Offer saved successfully.");
    }
    setSaving(false);
  };

  const handleInspectionSubmit = async () => {
    if (!inspectionDate) return;
    setSaving(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase
      .from("submissions")
      .update({
        inspection_date: new Date(inspectionDate).toISOString(),
        inspection_notes: inspectionNotes || null,
        status: "inspection_scheduled",
      })
      .eq("id", id);

    if (error) {
      setMessage("Failed to schedule inspection.");
    } else {
      setSubmission((prev) =>
        prev
          ? {
              ...prev,
              inspection_date: new Date(inspectionDate).toISOString(),
              inspection_notes: inspectionNotes || null,
              status: "inspection_scheduled",
            }
          : prev
      );
      setNewStatus("inspection_scheduled");
      setMessage("Inspection scheduled successfully.");
    }
    setSaving(false);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);
  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null && i < photos.length - 1 ? i + 1 : i
    );
  }, [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, prevPhoto, nextPhoto]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading submission...</p>
      </div>
    );
  }

  if (!submission) return null;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <Link
            href="/admin/submissions"
            className="text-sm text-blue-600 hover:text-blue-700 mb-1 inline-block"
          >
            &larr; Back to Submissions
          </Link>
          <h1 className="text-2xl font-black text-gray-900 font-mono">
            {submission.reference_number}
          </h1>
          <p className="text-gray-400 text-sm">
            Submitted {formatDateTime(submission.created_at)}
          </p>
        </div>
        <StatusBadge status={submission.status} />
      </div>

      {message && (
        <div
          className={`p-3 rounded-xl mb-6 text-sm ${
            message.includes("Failed")
              ? "bg-red-50 border border-red-200 text-red-600"
              : "bg-green-50 border border-green-200 text-green-600"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Car Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Car Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Make</p>
                <p className="font-medium text-gray-900">{submission.make}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Model</p>
                <p className="font-medium text-gray-900">{submission.model}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Year</p>
                <p className="font-medium text-gray-900">{submission.year}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Mileage</p>
                <p className="font-medium text-gray-900">
                  {submission.mileage.toLocaleString()} km
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Color</p>
                <p className="font-medium text-gray-900">{submission.color}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Transmission</p>
                <p className="font-medium text-gray-900 capitalize">
                  {submission.transmission}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Fuel Type</p>
                <p className="font-medium text-gray-900 capitalize">
                  {submission.fuel_type}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Condition</p>
                <p className="font-medium text-gray-900 capitalize">
                  {submission.condition}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Vehicle Status</p>
                <p className={`font-medium capitalize ${submission.vehicle_status === "accident_damaged" ? "text-red-600" : "text-gray-900"}`}>
                  {submission.vehicle_status?.replace(/_/g, " ") || "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Accident History</p>
                <p className={`font-medium capitalize ${submission.accident_history === "been_in_accident" ? "text-red-600" : "text-green-600"}`}>
                  {submission.accident_history?.replace(/_/g, " ") || "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Service History</p>
                <p className="font-medium text-gray-900 capitalize">
                  {submission.service_history ? `${submission.service_history} service history` : "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Ownership Duration</p>
                <p className="font-medium text-gray-900">
                  {submission.ownership_duration || "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Financed?</p>
                <p className={`font-medium ${submission.is_financed ? "text-amber-600" : "text-green-600"}`}>
                  {submission.is_financed ? "Yes" : "No"}
                </p>
              </div>
              {submission.is_financed && submission.settlement_amount && (
                <div>
                  <p className="text-gray-400 text-xs">Settlement Amount</p>
                  <p className="font-medium text-amber-600">
                    {formatCurrency(submission.settlement_amount)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-xs">Asking Price</p>
                <p className="font-bold text-gray-900 text-base">
                  {formatCurrency(submission.asking_price)}
                </p>
              </div>
            </div>
            {submission.known_issues && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-400 text-xs">Known Issues / Problems</p>
                <p className="text-red-600 text-sm mt-1">
                  {submission.known_issues}
                </p>
              </div>
            )}
            {submission.description && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-400 text-xs">Description</p>
                <p className="text-gray-600 text-sm mt-1">
                  {submission.description}
                </p>
              </div>
            )}
          </div>

          {/* Damage Details — only shown for accident_damaged vehicles */}
          {submission.vehicle_status === "accident_damaged" && (
            <div className="bg-white rounded-2xl border border-red-200 p-5 shadow-sm">
              <h2 className="font-semibold text-red-600 mb-4 text-sm uppercase tracking-wider">
                Damage Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Damage Type</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {submission.damage_type?.replace(/_/g, " ") || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Drivable?</p>
                  <p className={`font-medium ${submission.is_drivable ? "text-green-600" : "text-red-600"}`}>
                    {submission.is_drivable === null ? "—" : submission.is_drivable ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Has Insurance?</p>
                  <p className={`font-medium ${submission.has_insurance ? "text-green-600" : "text-red-600"}`}>
                    {submission.has_insurance === null ? "—" : submission.has_insurance ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Scrap/Parts Interest</p>
                  <p className={`font-medium ${submission.scrap_interest ? "text-amber-600" : "text-gray-900"}`}>
                    {submission.scrap_interest ? "Yes — open to scrap/parts" : "No — full vehicle only"}
                  </p>
                </div>
              </div>
              {submission.damage_description && (
                <div className="mt-4 pt-4 border-t border-red-100">
                  <p className="text-gray-400 text-xs">Damage Description</p>
                  <p className="text-red-600 text-sm mt-1">
                    {submission.damage_description}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Photos */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Photos ({photos.length})
            </h2>
            {photos.length === 0 ? (
              <p className="text-gray-400 text-sm">No photos uploaded.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setLightboxIndex(index)}
                    className="block w-full text-left"
                  >
                    <img
                      src={photo.photo_url}
                      alt={`Car photo ${index + 1}`}
                      className="w-full h-40 object-cover rounded-xl border border-gray-200 hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Seller Info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Seller Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Name</p>
                <p className="font-medium text-gray-900">
                  {submission.seller_name}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Phone</p>
                <p className="font-medium text-gray-900">
                  {submission.seller_phone}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Email</p>
                <p className="font-medium text-gray-900">
                  {submission.seller_email || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Location</p>
                <p className="font-medium text-gray-900">
                  {submission.seller_location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          {/* Update Status */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Update Status
            </h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className={`${inputClass} mb-3`}
            >
              {allStatuses.map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]}
                </option>
              ))}
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={saving || newStatus === submission.status}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "Saving..." : "Update Status"}
            </button>
          </div>

          {/* Make Offer */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Make an Offer
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">
                  Offer Amount (NAD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">
                    N$
                  </span>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    placeholder="e.g. 120000"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">
                  Notes (optional)
                </label>
                <textarea
                  value={offerNotes}
                  onChange={(e) => setOfferNotes(e.target.value)}
                  rows={2}
                  placeholder="Internal notes about the offer..."
                  className={inputClass}
                />
              </div>
              <button
                onClick={handleOfferSubmit}
                disabled={saving || !offerAmount}
                className="w-full bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? "Saving..." : "Save Offer"}
              </button>
            </div>
            {submission.offer_amount && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-xs text-green-600">Current Offer</p>
                <p className="font-bold text-gray-900">
                  {formatCurrency(submission.offer_amount)}
                </p>
              </div>
            )}
          </div>

          {/* Schedule Inspection */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Schedule Inspection
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">
                  Date &amp; Time
                </label>
                <input
                  type="datetime-local"
                  value={inspectionDate}
                  onChange={(e) => setInspectionDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">
                  Notes (optional)
                </label>
                <textarea
                  value={inspectionNotes}
                  onChange={(e) => setInspectionNotes(e.target.value)}
                  rows={2}
                  placeholder="Location, special instructions..."
                  className={inputClass}
                />
              </div>
              <button
                onClick={handleInspectionSubmit}
                disabled={saving || !inspectionDate}
                className="w-full bg-purple-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? "Saving..." : "Schedule Inspection"}
              </button>
            </div>
            {submission.inspection_date && (
              <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-xl">
                <p className="text-xs text-purple-600">Scheduled For</p>
                <p className="font-semibold text-gray-900">
                  {formatDate(submission.inspection_date)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/70 text-sm font-medium">
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Previous button */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <img
            src={photos[lightboxIndex].photo_url}
            alt={`Car photo ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next button */}
          {lightboxIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
