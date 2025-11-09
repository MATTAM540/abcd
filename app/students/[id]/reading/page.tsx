import { notFound } from "next/navigation";

import { StudentReadingCharts } from "@/components/charts/student-reading-charts";
import { ReportExportButtons } from "@/components/reports/report-export-buttons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buildMistakeSeries, buildSpeedSeries, calculateStudentAverages } from "@/lib/analytics/student";
import { mockReadingSessions, mockStudentReportKpi, mockStudents } from "@/lib/data/mock-data";
import { formatDate, formatNumber } from "@/lib/utils";

interface StudentReadingPageProps {
  params: { id: string };
}

export default function StudentReadingPage({ params }: StudentReadingPageProps) {
  const student = mockStudents.find((item) => item.id === params.id);
  if (!student) {
    return notFound();
  }

  const sessions = mockReadingSessions.filter((session) => session.studentId === student.id);
  const speedSeries = buildSpeedSeries(sessions);
  const mistakeSeries = buildMistakeSeries(sessions);
  const averages = calculateStudentAverages(sessions);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{student.name}</h1>
        <p className="text-sm text-muted-foreground">
          Medrese: {student.medrese} • Son hız: {student.latestSpeedLpm ?? "-"} l/dk • Son hata: {student.latestMistakes ?? "-"}
        </p>
      </div>

      <ReportExportButtons
        payload={{
          type: "student",
          period: "monthly",
          periodStart: new Date().toISOString(),
          periodEnd: new Date().toISOString(),
          data: { sessions, averages },
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Okuma Trendleri</CardTitle>
          <CardDescription>Hız ve hata değişimi.</CardDescription>
        </CardHeader>
        <CardContent>
          <StudentReadingCharts speedSeries={speedSeries} mistakeSeries={mistakeSeries} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Oturumlar</CardTitle>
          <CardDescription>reading_sessions tablosundaki kayıtlar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarih</TableHead>
                <TableHead>Eser</TableHead>
                <TableHead>Sayfa</TableHead>
                <TableHead>Hız</TableHead>
                <TableHead>Hata</TableHead>
                <TableHead>Kaynak</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{formatDate(session.date)}</TableCell>
                  <TableCell>{session.workTitle}</TableCell>
                  <TableCell>{session.pageInfo}</TableCell>
                  <TableCell>{formatNumber(session.speedLpm ?? 0, 0)} l/dk</TableCell>
                  <TableCell>
                    <Badge variant={session.mistakes && session.mistakes <= 2 ? "secondary" : "destructive"}>
                      {session.mistakes ?? 0}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{session.source}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rapor Özeti</CardTitle>
          <CardDescription>Haftalık / Aylık / Yıllık KPI</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {Object.entries(mockStudentReportKpi).map(([range, summary]) => (
            <div key={range} className="rounded-lg border p-3 text-sm">
              <div className="font-semibold uppercase">{range}</div>
              <div>Ortalama hız: {summary.averageSpeed} l/dk</div>
              <div>Ortalama hata: {summary.averageMistakes}</div>
              <div>En iyi gelişim: {summary.bestImprovement}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
