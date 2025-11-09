# Vakıf Öğrenci Takip & Raporlama Sistemi

Next.js 14 (App Router) tabanlı bu referans uygulama, vakıf hedef yönetimi ve talebe okuma performansı takibini tek bir panelde birleştirir. Tailwind CSS + shadcn/ui bileşenleri, Supabase/Postgres veri modeli ve Drizzle ORM ile uyumlu olacak şekilde kurgulanmıştır.

## Özellik Özeti

- **Vakıf Modülü**: Hedef şablonları, dönemsel giriş ekranı ve KPI/heatmap raporları.
- **Talebe Modülü**: Öğrenci listesi, bireysel okuma grafikleri (Recharts) ve dönemsel rapor özetleri.
- **SMS Mock**: Guardian öncelik sırası `baba → diğer veliler` olacak şekilde SMS kuyruğunu taklit eder.
- **Rapor Dışa Aktarım**: PDF/Excel mock export butonları, Netlify Functions ile gerçek exporta hazır.
- **Tema Yönetimi**: next-themes ile kalıcı dark/light seçimi.
- **Supabase Hazırlığı**: Supabase client helper, RLS senaryolarını anlatan sayfalar ve mock veri seti.

## Başlangıç

```bash
npm install
npm run dev
```

- `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` Netlify ortam değişkenleri üzerinden tanımlanmalıdır.
- Tailwind yapılandırması shadcn/ui uyumlu olacak şekilde güncellenmiştir.

## Netlify Dağıtımı

- **Build**: `npm run build`
- **Publish**: `.next`
- Export işlemleri için Netlify Functions altında `lib/export` fonksiyonları temel alınabilir.

## Veri Modeli

`lib/data/mock-data.ts` dosyası Supabase tablolarının TypeScript karşılıklarını ve örnek kayıtları içerir. Raporlama sayfalarında bu veriler kullanılarak hedef/talebe KPI'ları hesaplanır.

## Lisans

MIT
