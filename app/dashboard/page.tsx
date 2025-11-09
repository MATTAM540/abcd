import { FoundationKpiChart } from "@/components/charts/foundation-kpi-chart";
import { StudentReadingCharts } from "@/components/charts/student-reading-charts";
import { SmsMockSender } from "@/components/sms/mock-sender";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockFoundationGoalEntries, mockFoundationGoals, mockGoalTemplates, mockReadingSessions, mockStudents } from "@/lib/data/mock-data";
import { buildMistakeSeries, buildSpeedSeries } from "@/lib/analytics/student";
import { summarizeFoundationKpi } from "@/lib/analytics/foundation";
import { formatNumber, formatPercent } from "@/lib/utils";

export default function DashboardPage() {
  const { totalCompletion, strongestTemplateId, weakestTemplateId } = summarizeFoundationKpi(
    mockGoalTemplates,
    mockFoundationGoals,
    mockFoundationGoalEntries
  );
  const strongestTemplate = mockGoalTemplates.find((template) => template.id === strongestTemplateId);
  const weakestTemplate = mockGoalTemplates.find((template) => template.id === weakestTemplateId);

  const latestSessionsByStudent = mockReadingSessions.reduce<Record<string, typeof mockReadingSessions[number]>>(
    (acc, session) => {
      const existing = acc[session.studentId];
      if (!existing || new Date(session.date) > new Date(existing.date)) {
        acc[session.studentId] = session;
      }
      return acc;
    },
    {}
  );

  const totalStudents = mockStudents.length;
  const totalSessions = mockReadingSessions.length;
  const totalMistakes = mockReadingSessions.reduce((sum, session) => sum + (session.mistakes ?? 0), 0);
  const totalSpeed = mockReadingSessions.reduce((sum, session) => sum + (session.speedLpm ?? 0), 0);
  const speedAverage = totalSessions ? totalSpeed / totalSessions : 0;

  const dashboardSpeedSeries = buildSpeedSeries(mockReadingSessions);
  const dashboardMistakeSeries = buildMistakeSeries(mockReadingSessions);

  const topPerformer = mockStudents.reduce((best, student) => {
    if (!best) return student;
    return (student.latestSpeedLpm ?? 0) > (best.latestSpeedLpm ?? 0) ? student : best;
  }, mockStudents[0]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Vakıf hedef tamamlanma</CardDescription>
            <CardTitle className="text-3xl">{formatPercent(totalCompletion)}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            En güçlü hedef: {strongestTemplate?.title ?? "-"}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Toplam talebe</CardDescription>
            <CardTitle className="text-3xl">{totalStudents}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Son oturum: {Object.keys(latestSessionsByStudent).length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ortalama okuma hızı</CardDescription>
            <CardTitle className="text-3xl">{formatNumber(speedAverage, 1)} l/dk</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Toplam hata: {totalMistakes}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Gelişim fırsatı</CardDescription>
            <CardTitle className="text-3xl">{weakestTemplate?.title ?? "-"}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            En hızlı talebe: {topPerformer?.name}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hedef Tamamlama Trendi</CardTitle>
          <CardDescription>Vakıf hedeflerinin şablon bazlı gerçekleşme yüzdeleri.</CardDescription>
        </CardHeader>
        <CardContent>
          <FoundationKpiChart
            data={mockGoalTemplates.map((template) => ({
              name: template.title,
              completionRate: Math.random() * 0.4 + 0.6,
            }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Okuma Performansı Genel Görünüm</CardTitle>
          <CardDescription>Tüm öğrenciler için hız ve hata trendleri.</CardDescription>
        </CardHeader>
        <CardContent>
          <StudentReadingCharts
            speedSeries={dashboardSpeedSeries}
            mistakeSeries={dashboardMistakeSeries}
          />
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold">SMS Mock Kuyruğu</h2>
        <SmsMockSender />
      </div>
    </div>
  );
}
