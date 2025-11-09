"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatDate } from "@/lib/utils";

interface StudentReadingChartsProps {
  speedSeries: { date: string; speed: number }[];
  mistakeSeries: { date: string; mistakes: number }[];
}

export function StudentReadingCharts({ speedSeries, mistakeSeries }: StudentReadingChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="h-80 rounded-lg border bg-background p-4">
        <h3 className="text-sm font-semibold">Okuma Hızı Trend</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={speedSeries}>
            <defs>
              <linearGradient id="speed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip labelFormatter={(value) => formatDate(value)} formatter={(value: number) => `${value} l/dk`} />
            <Area type="monotone" dataKey="speed" stroke="hsl(var(--primary))" fill="url(#speed)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="h-80 rounded-lg border bg-background p-4">
        <h3 className="text-sm font-semibold">Hata Sayısı</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mistakeSeries}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip labelFormatter={(value) => formatDate(value)} />
            <Legend />
            <Bar dataKey="mistakes" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Hata" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
