// File: summaryCard.tsx

import React from "react";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

function SummaryCard({ icon, title, value, color }: SummaryCardProps) {
  const bgClass =
    { blue: "bg-blue-100", pink: "bg-pink-100", green: "bg-green-100" }[
      color
    ] || "bg-gray-100";
  const textClass =
    { blue: "text-blue-500", pink: "text-pink-500", green: "text-green-500" }[
      color
    ] || "text-gray-500";

  return (
    <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-md">
      <div className={`p-3 rounded-full ${bgClass} ${textClass}`}>{icon}</div>
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
