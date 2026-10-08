import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  subtitle?: string;
  trend?: string;
  trendType?: "positive" | "warning" | "neutral";
  color?: "emerald" | "blue" | "amber" | "purple" | "rose";
}

const colorStyles = {
  emerald: {
    bg: "bg-emerald-50 text-emerald-600",
    border: "hover:border-emerald-300",
    glow: "bg-emerald-500/10",
    pill: "bg-emerald-100/80 text-emerald-800",
  },
  blue: {
    bg: "bg-blue-50 text-blue-600",
    border: "hover:border-blue-300",
    glow: "bg-blue-500/10",
    pill: "bg-blue-100/80 text-blue-800",
  },
  amber: {
    bg: "bg-amber-50 text-amber-600",
    border: "hover:border-amber-300",
    glow: "bg-amber-500/10",
    pill: "bg-amber-100/80 text-amber-800",
  },
  purple: {
    bg: "bg-purple-50 text-purple-600",
    border: "hover:border-purple-300",
    glow: "bg-purple-500/10",
    pill: "bg-purple-100/80 text-purple-800",
  },
  rose: {
    bg: "bg-rose-50 text-rose-600",
    border: "hover:border-rose-300",
    glow: "bg-rose-500/10",
    pill: "bg-rose-100/80 text-rose-800",
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  trendType = "neutral",
  color = "emerald",
}: StatCardProps) {
  const c = colorStyles[color] || colorStyles.emerald;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 ${c.border}`}
    >
      {/* Ambient background soft glow */}
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${c.glow} blur-xl transition-all group-hover:scale-125`} />

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {Icon && (
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl p-2.5 transition-colors group-hover:scale-105 ${c.bg}`}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>

        <div className="mt-2 flex items-center justify-between text-xs">
          {subtitle && (
            <span className="text-slate-500 font-medium">
              {subtitle}
            </span>
          )}

          {trend && (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${c.pill}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
