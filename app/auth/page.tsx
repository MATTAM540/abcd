import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Supabase ile giriş yap</CardTitle>
          <CardDescription>Vakıf veya veli hesabınızla oturum açın.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input id="email" type="email" placeholder="ornek@vakif.org" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full">Giriş yap</Button>
          <p className="text-xs text-muted-foreground">
            Supabase Auth entegrasyonu için <code>auth/v1/token</code> endpointleri kullanılacaktır. RLS
            kuralları rol bazlı yönlendirme ile tetiklenir.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
