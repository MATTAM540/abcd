import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockFoundationGoalEntries, mockGoalTemplates } from "@/lib/data/mock-data";
import { formatDate } from "@/lib/utils";

export default function GoalEntriesPage() {
  const entryRows = mockFoundationGoalEntries.map((entry) => {
    const template = mockGoalTemplates.find((item) => item.id === entry.templateId);
    const value =
      entry.valueNumber ?? entry.valueEnum ?? entry.valueText ?? (entry.valueBool ? "Evet" : "Hayır");

    return {
      id: entry.id,
      templateTitle: template?.title ?? "-",
      value,
      recordedAt: entry.recordedAt,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hızlı Hedef Girişi</h1>
          <p className="text-sm text-muted-foreground">
            Vakıf personeli aylık veya haftalık hedef gerçekleşmelerini buradan kaydeder. Grid girişi Drizzle actionlarıyla
            Supabase&apos;e aktarılır.
          </p>
        </div>
        <Button>Yeni kayıt</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Son Girişler</CardTitle>
          <CardDescription>foundation_goal_entries tablosuna kaydedilen değerler.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hedef</TableHead>
                <TableHead>Değer</TableHead>
                <TableHead>Kayıt Tarihi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entryRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.templateTitle}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{formatDate(row.recordedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Toplu Giriş</CardTitle>
          <CardDescription>Şablon bazlı grid formu.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockGoalTemplates.map((template) => (
              <div key={template.id} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{template.title}</div>
                    <div className="text-xs text-muted-foreground">{template.description}</div>
                  </div>
                  <Badge variant="outline">{template.type}</Badge>
                </div>
                <Input placeholder="Değer girin" />
                <Button className="w-full" variant="secondary">
                  Kaydet
                </Button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Grid formu server action ile Supabase&apos;e gönderilir ve RLS sayesinde foundation_id eşleşmesi kontrol edilir.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
