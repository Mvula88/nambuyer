"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Submission, SubmissionStatus } from "@/types";
import StatusBadge from "@/components/StatusBadge";

const statuses: { value: string; label: string }[] = [
  { value: "", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "reviewing", label: "Under Review" },
  { value: "inspection_scheduled", label: "Inspection Scheduled" },
  { value: "offer_made", label: "Offer Made" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "completed", label: "Completed" },
];

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      const supabase = createClient();
      let query = supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter) {
        query = query.eq("status", statusFilter);
      }

      const { data } = await query;
      setSubmissions((data as Submission[]) || []);
      setLoading(false);
    };

    fetchSubmissions();
  }, [statusFilter]);

  const filtered = submissions.filter((s) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      s.reference_number.toLowerCase().includes(term) ||
      s.make.toLowerCase().includes(term) ||
      s.model.toLowerCase().includes(term) ||
      s.seller_name.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading submissions...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Submissions</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage all car submissions
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-3 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by reference, make, model, or seller..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 input-modern"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 input-modern"
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            No submissions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-5 py-3">Reference</th>
                  <th className="px-5 py-3">Car</th>
                  <th className="px-5 py-3">Asking Price</th>
                  <th className="px-5 py-3">Our Offer</th>
                  <th className="px-5 py-3">Seller</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/submissions/${sub.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm font-mono"
                      >
                        {sub.reference_number}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">
                      {sub.year} {sub.make} {sub.model}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-900 font-semibold">
                      {formatCurrency(sub.asking_price)}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">
                      {sub.offer_amount
                        ? formatCurrency(sub.offer_amount)
                        : "—"}
                    </td>
                    <td className="px-5 py-3 text-sm">
                      <div className="text-gray-600">{sub.seller_name}</div>
                      <div className="text-xs text-gray-400">
                        {sub.seller_phone}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500">
                      {sub.seller_location}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={sub.status as SubmissionStatus} />
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-400">
                      {formatDate(sub.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {filtered.length} of {submissions.length} submissions
        </div>
      </div>
    </div>
  );
}
