import { ReportExportButtons } from "@/components/reports/report-export-buttons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockReadingSessions, mockStudentReportKpi, mockStudents } from "@/lib/data/mock-data";
import { formatDate, formatNumber } from "@/lib/utils";

export default function StudentReportPage() {
  const grouped = mockStudents.map((student) => {
    const sessions = mockReadingSessions.filter((session) => session.studentId === student.id);
    const totalSessions = sessions.length;
    const lastSession = sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    const averageSpeed =
      sessions.reduce((sum, session) => sum + (session.speedLpm ?? 0), 0) / Math.max(totalSessions, 1);

    return {
      student,
      totalSessions,
      lastSession,
      averageSpeed,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Öğrenci Raporları</h1>
        <p className="text-sm text-muted-foreground">
          Haftalık, aylık ve yıllık dönemler için hız ve hata özetleri.
        </p>
      </div>

      <ReportExportButtons
        payload={{
          type: "student",
          period: "monthly",
          periodStart: new Date().toISOString(),
          periodEnd: new Date().toISOString(),
          data: { grouped, kpi: mockStudentReportKpi },
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Performans Tablosu</CardTitle>
          <CardDescription>Tüm öğrencilerin temel metrikleri.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Öğrenci</TableHead>
                <TableHead>Seans</TableHead>
                <TableHead>Ortalama hız</TableHead>
                <TableHead>Son seans</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grouped.map(({ student, totalSessions, lastSession, averageSpeed }) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{totalSessions}</TableCell>
                  <TableCell>{formatNumber(averageSpeed, 1)} l/dk</TableCell>
                  <TableCell>{lastSession ? formatDate(lastSession.date) : "Yok"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dönemsel KPI</CardTitle>
          <CardDescription>Okuma hızı ve hata ortalamaları.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {Object.entries(mockStudentReportKpi).map(([period, summary]) => (
            <div key={period} className="rounded-lg border p-3 text-sm">
              <div className="font-semibold uppercase">{period}</div>
              <div>Ortalama hız: {summary.averageSpeed}</div>
              <div>Ortalama hata: {summary.averageMistakes}</div>
              <div>En iyi gelişim: {summary.bestImprovement}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
