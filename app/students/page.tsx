import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockReadingSessions, mockStudents } from "@/lib/data/mock-data";
import { formatDate, formatNumber } from "@/lib/utils";

export default function StudentsPage() {
  const latestSessions = mockReadingSessions.reduce<Record<string, typeof mockReadingSessions[number]>>((acc, session) => {
    const current = acc[session.studentId];
    if (!current || new Date(session.date) > new Date(current.date)) {
      acc[session.studentId] = session;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Talebe Listesi</h1>
        <p className="text-sm text-muted-foreground">
          Supabase students tablosu, guardian_links üzerinden RLS ile filtrelenir. Bu liste yalnızca foundation_id eşleşen
          öğrencileri gösterir.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Öğrenciler</CardTitle>
          <CardDescription>Son hız, hata ve trend rozetleri.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Öğrenci</TableHead>
                <TableHead>Medrese</TableHead>
                <TableHead>Okuma Hızı</TableHead>
                <TableHead>Hata</TableHead>
                <TableHead>Son Oturum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudents.map((student) => {
                const session = latestSessions[student.id];
                const speed = student.latestSpeedLpm ?? session?.speedLpm;
                const mistakes = student.latestMistakes ?? session?.mistakes;
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      <Link href={`/students/${student.id}/reading`} className="hover:underline">
                        {student.name}
                      </Link>
                    </TableCell>
                    <TableCell>{student.medrese}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{formatNumber(speed ?? 0, 0)} l/dk</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={mistakes && mistakes <= 2 ? "secondary" : "destructive"}>{mistakes ?? 0}</Badge>
                    </TableCell>
                    <TableCell>
                      {session ? (
                        <span className="text-xs text-muted-foreground">{formatDate(session.date)}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Kayıt yok</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
