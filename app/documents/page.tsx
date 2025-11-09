import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockDocuments, mockStudents } from "@/lib/data/mock-data";
import { formatDate } from "@/lib/utils";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Belgeler</h1>
        <p className="text-sm text-muted-foreground">
          Supabase documents tablosu gizli belgeleri <code>is_confidential</code> alanıyla işaretler. Guardian kullanıcılar
          yalnızca document_shares kaydı olan belgeleri görebilir.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Belgeler</CardTitle>
          <CardDescription>Paylaşımlar ve gizlilik durumları.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Güncelleme</TableHead>
                <TableHead>Gizli</TableHead>
                <TableHead>Paylaşılan Talebeler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDocuments.map((document) => (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">{document.title}</TableCell>
                  <TableCell>{document.category}</TableCell>
                  <TableCell>{formatDate(document.updatedAt)}</TableCell>
                  <TableCell>
                    <Badge variant={document.isConfidential ? "destructive" : "secondary"}>
                      {document.isConfidential ? "Evet" : "Hayır"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {document.sharedWithStudentIds.length === 0 && <span className="text-xs text-muted-foreground">Vakıf içi</span>}
                      {document.sharedWithStudentIds.map((id) => {
                        const student = mockStudents.find((item) => item.id === id);
                        return (
                          <Badge key={id} variant="outline">
                            {student?.name ?? id}
                          </Badge>
                        );
                      })}
                    </div>
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
