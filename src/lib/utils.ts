import { SubmissionStatus } from "@/types";

export function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `BC-${year}-${random}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NA", {
    style: "currency",
    currency: "NAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-NA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-NA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const statusLabels: Record<SubmissionStatus, string> = {
  pending: "Pending Review",
  reviewing: "Under Review",
  inspection_scheduled: "Inspection Scheduled",
  offer_made: "Offer Made",
  accepted: "Accepted",
  rejected: "Rejected",
  completed: "Completed",
};

export const statusColors: Record<SubmissionStatus, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  reviewing: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  inspection_scheduled: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  offer_made: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  accepted: "bg-green-500/10 text-green-400 border border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
  completed: "bg-gray-500/10 text-gray-300 border border-gray-500/20",
};
