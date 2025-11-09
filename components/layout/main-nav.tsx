"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Kontrol Paneli" },
  { href: "/goals", label: "Hedefler" },
  { href: "/goals/entries", label: "Hedef Girişleri" },
  { href: "/reports/foundation", label: "Vakıf Raporu" },
  { href: "/students", label: "Talebeler" },
  { href: "/reports/student", label: "Öğrenci Raporu" },
  { href: "/events", label: "Etkinlikler" },
  { href: "/documents", label: "Belgeler" },
  { href: "/contacts", label: "Rehber" },
  { href: "/settings", label: "Ayarlar" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground",
            pathname.startsWith(item.href)
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
