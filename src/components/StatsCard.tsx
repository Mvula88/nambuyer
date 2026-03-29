interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color: "blue" | "yellow" | "green" | "purple";
}

const colorMap = {
  blue: "bg-blue-50 border-blue-200 text-blue-600",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-600",
  green: "bg-green-50 border-green-200 text-green-600",
  purple: "bg-purple-50 border-purple-200 text-purple-600",
};

export default function StatsCard({
  title,
  value,
  subtitle,
  color,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 card-hover shadow-sm">
      <div
        className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${colorMap[color]}`}
      >
        <span className="text-lg font-bold">#</span>
      </div>
      <p className="text-xs text-gray-500 uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
