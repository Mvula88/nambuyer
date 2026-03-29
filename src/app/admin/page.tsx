"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Submission } from "@/types";
import StatsCard from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";

interface Stats {
  total: number;
  pending: number;
  offersMade: number;
  completedThisMonth: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    offersMade: 0,
    completedThisMonth: 0,
  });
  const [recent, setRecent] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      const { data: all } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (all) {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        setStats({
          total: all.length,
          pending: all.filter((s) => s.status === "pending").length,
          offersMade: all.filter((s) => s.status === "offer_made").length,
          completedThisMonth: all.filter(
            (s) =>
              s.status === "completed" &&
              new Date(s.created_at) >= monthStart
          ).length,
        });

        setRecent(all.slice(0, 10) as Submission[]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of car submissions and activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Submissions" value={stats.total} color="blue" />
        <StatsCard title="Pending Review" value={stats.pending} color="yellow" />
        <StatsCard title="Offers Made" value={stats.offersMade} color="purple" />
        <StatsCard title="Completed This Month" value={stats.completedThisMonth} color="green" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Submissions</h2>
          <Link
            href="/admin/submissions"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            No submissions yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-5 py-3">Reference</th>
                  <th className="px-5 py-3">Car</th>
                  <th className="px-5 py-3">Asking Price</th>
                  <th className="px-5 py-3">Seller</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((sub) => (
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
                    <td className="px-5 py-3 text-sm text-gray-500">
                      {sub.seller_name}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={sub.status} />
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
      </div>
    </div>
  );
}
