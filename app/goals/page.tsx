import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockGoalTemplates } from "@/lib/data/mock-data";

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hedef Şablonları</h1>
          <p className="text-sm text-muted-foreground">
            Vakıf ve medrese planlarını şablonlaştırın. Drizzle ORM ile Supabase goal_templates tablosu yönetilir.
          </p>
        </div>
        <Button>Yeni şablon</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Şablonlar</CardTitle>
          <CardDescription>RLS sayesinde yalnızca kendi vakfınızın şablonlarını görürsünüz.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kod</TableHead>
                <TableHead>Başlık</TableHead>
                <TableHead>Açıklama</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Seçenekler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGoalTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.code}</TableCell>
                  <TableCell>{template.title}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{template.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{template.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 text-xs">
                      {template.enumOptions?.map((option) => (
                        <Badge key={option} variant="secondary">
                          {option}
                        </Badge>
                      ))}
                      {!template.enumOptions?.length && <span>-</span>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Planlama Kılavuzu</CardTitle>
          <CardDescription>Şablonlar Supabase goal_templates tablosuna kaydedilir.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Şablonlar foundation_id sütunu üzerinden RLS ile sınırlandırılır. Her şablon, foundation_goals
            tablosundaki hedefleri üretir.
          </p>
          <p>
            Periodik hedefler <code>period_start</code> ve <code>period_end</code> alanlarıyla tanımlanır.
            Şablon tipine göre <code>target_number</code> veya <code>target_enum</code> doldurulur.
          </p>
          <p>Enum seçenekleri JSONB olarak saklanır, UI&apos;da hızlı seçim sunar.</p>
        </CardContent>
      </Card>
    </div>
  );
}
