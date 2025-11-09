import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { foundationRoles, roleLabels } from "@/lib/auth/roles";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Ayarlar</h1>
        <p className="text-sm text-muted-foreground">
          Tema, Supabase anahtarları ve rol bazlı erişim ayarları.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
          <CardDescription>Dark/Light seçimleri next-themes aracılığıyla kalıcı tutulur.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <ModeToggle />
          <p className="text-sm text-muted-foreground">
            Kullanıcı tercihi localStorage üzerinde saklanır ve sunucu tarafında hydration uyarısı engellenir.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supabase Entegrasyonu</CardTitle>
          <CardDescription>Ortam değişkenleri Netlify üzerinden yönetilir.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <div>
            <Label htmlFor="supabase-url">Supabase URL</Label>
            <Input id="supabase-url" placeholder="https://project.supabase.co" />
          </div>
          <div>
            <Label htmlFor="supabase-key">Anon Key</Label>
            <Input id="supabase-key" placeholder="public-anon-key" />
          </div>
          <p className="md:col-span-2 text-xs text-muted-foreground">
            RLS kuralları Supabase üzerinde tanımlanır. Next.js tarafında createBrowserClient kullanılarak oturum yönetilir.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Roller ve Yetkiler</CardTitle>
          <CardDescription>foundation_admin tüm izinlere sahiptir, guardian yalnızca öğrencilerini görür.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {foundationRoles.map((role) => (
            <Badge key={role} variant="secondary">
              {roleLabels[role]}
            </Badge>
          ))}
          <Badge variant="outline">{roleLabels.guardian}</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
