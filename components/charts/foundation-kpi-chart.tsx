"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatPercent } from "@/lib/utils";

interface FoundationKpiChartProps {
  data: { name: string; completionRate: number }[];
}

export function FoundationKpiChart({ data }: FoundationKpiChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs" />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatPercent(value, 0)}
          />
          <Tooltip formatter={(value: number) => formatPercent(value)} />
          <Bar dataKey="completionRate" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
