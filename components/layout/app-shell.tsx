import * as React from "react";

import { ModeToggle } from "@/components/mode-toggle";
import { MainNav } from "@/components/layout/main-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Vakıf Takip
            </span>
            <MainNav />
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <div className="hidden text-sm font-medium md:block">
              Hoş geldiniz, <span className="font-semibold">foundation_admin</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-8">{children}</div>
      </main>
    </div>
  );
}
