import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockContacts } from "@/lib/data/mock-data";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Rehber</h1>
        <p className="text-sm text-muted-foreground">
          Vakıf çalışanları ve medrese sorumluları listelenir. Guardian kullanıcıları yalnızca paylaşıma açık
          kişileri görür.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>İletişim</CardTitle>
          <CardDescription>Telefon ve e-posta bilgileri.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Soyad</TableHead>
                <TableHead>Görev</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>E-posta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.role}</TableCell>
                  <TableCell>{contact.phone ?? "-"}</TableCell>
                  <TableCell>{contact.email ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
