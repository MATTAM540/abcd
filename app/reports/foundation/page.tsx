import { FoundationKpiChart } from "@/components/charts/foundation-kpi-chart";
import { ReportExportButtons } from "@/components/reports/report-export-buttons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockFoundationGoalEntries, mockFoundationKpi, mockGoalTemplates } from "@/lib/data/mock-data";
import { calculateReportingPeriodRange, calculateTrend, groupEntriesByMonth } from "@/lib/analytics/foundation";
import { formatDate, formatNumber, formatPercent } from "@/lib/utils";

const period = "monthly" as const;
const periodRange = calculateReportingPeriodRange(period);

export default function FoundationReportPage() {
  const byMonth = groupEntriesByMonth(mockFoundationGoalEntries);
  const heatmapRows = mockGoalTemplates.map((template) => ({
    template,
    months: Object.entries(byMonth).map(([month, entries]) => {
      const latest = entries
        .filter((entry) => entry.templateId === template.id)
        .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime())[0];
      return {
        month,
        value: latest?.valueNumber ?? (latest?.valueBool ? 1 : 0),
      };
    }),
    trend: calculateTrend(mockFoundationGoalEntries.filter((entry) => entry.templateId === template.id)),
  }));

  const completionData = mockGoalTemplates.map((template) => ({
    name: template.title,
    completionRate: Math.random() * 0.3 + 0.6,
  }));

  const kpi = mockFoundationKpi[period];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Vakıf KPI Raporu</h1>
        <p className="text-sm text-muted-foreground">
          Supabase&apos;daki foundation_reports tablosundan aylık, çeyreklik ve yıllık özetleri üretin. Bu sayfa mock verilerle
          hesaplanan örnek KPI&apos;ları gösterir.
        </p>
      </div>

      <ReportExportButtons
        payload={{
          type: "foundation",
          period,
          periodStart: periodRange.start,
          periodEnd: periodRange.end,
          data: { kpi, heatmapRows },
        }}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Genel Tamamlama</CardDescription>
            <CardTitle className="text-3xl">{formatPercent(kpi.completionRate)}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            En güçlü şablon: {kpi.strongestGoal}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Zayıf Alan</CardDescription>
            <CardTitle className="text-3xl">{kpi.weakestGoal}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Trend iyileştirmesi için girişleri sıklaştırın.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rapor Dönemi</CardDescription>
            <CardTitle className="text-lg">{formatDate(periodRange.start)} – {formatDate(periodRange.end)}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Rapor türü: {period.toUpperCase()}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Şablon Bazlı Tamamlama</CardTitle>
          <CardDescription>Hedef şablonlarının gerçekleşme oranları.</CardDescription>
        </CardHeader>
        <CardContent>
          <FoundationKpiChart data={completionData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hedef Heatmap</CardTitle>
          <CardDescription>Son aylara ait değerler.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead>Şablon</TableHead>
                {Object.keys(byMonth).map((month) => (
                  <TableHead key={month}>{month}</TableHead>
                ))}
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {heatmapRows.map((row) => (
                <TableRow key={row.template.id}>
                  <TableCell className="font-medium">{row.template.title}</TableCell>
                  {row.months.map((month) => (
                    <TableCell key={month.month}>
                      <Badge variant={month.value > 0.7 ? "secondary" : month.value > 0.4 ? "outline" : "destructive"}>
                        {formatNumber(month.value * 100, 0)}%
                      </Badge>
                    </TableCell>
                  ))}
                  <TableCell>
                    <Badge variant={row.trend >= 0 ? "secondary" : "destructive"}>{formatNumber(row.trend, 1)}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
