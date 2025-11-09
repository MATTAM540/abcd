import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockEvents } from "@/lib/data/mock-data";
import { formatDate } from "@/lib/utils";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Etkinlikler</h1>
        <p className="text-sm text-muted-foreground">
          Vakıf personeli etkinlikleri Supabase events tablosuna kaydeder. Guardian kullanıcıları yalnızca paylaşılan
          etkinlikleri görür.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Planlanan Etkinlikler</CardTitle>
          <CardDescription>Hedef kitle ve tarih bilgileri.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Konum</TableHead>
                <TableHead>Hedef</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{formatDate(event.date)}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.targetAudience}</Badge>
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
