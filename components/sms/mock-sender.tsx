"use client";

import { useState } from "react";

import { mockGuardianLinks, mockStudents } from "@/lib/data/mock-data";
import { type SmsQueueItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const smsTemplates = {
  reminder: "{ogrenci_adi} için {etkinlik} hatırlatması {tarih}",
  goal: "{ogrenci_adi} hedefi: {hedef}",
  reading: "{ogrenci_adi} okuma hızı {hiz} l/dk, yanlış {yanlis}",
};

type TemplateKey = keyof typeof smsTemplates;

function resolveGuardianPhone(studentId: string) {
  const guardians = mockGuardianLinks.filter((link) => link.studentId === studentId);
  const father = guardians.find((link) => link.relation === "baba" && link.phone);
  if (father?.phone) return { phone: father.phone, guardianId: father.id };

  const primary = guardians.find((link) => link.phone);
  if (primary?.phone) return { phone: primary.phone, guardianId: primary.id };

  return undefined;
}

export function SmsMockSender() {
  const [templateKey, setTemplateKey] = useState<TemplateKey>("reading");
  const [queue, setQueue] = useState<SmsQueueItem[]>([]);

  const sendSms = (studentId: string) => {
    const student = mockStudents.find((item) => item.id === studentId);
    if (!student) return;

    const guardian = resolveGuardianPhone(studentId);
    if (!guardian) {
      alert(`Öğrenci ${student.name} için uygun veli numarası bulunamadı.`);
      return;
    }

    const template = smsTemplates[templateKey];
    const message = template
      .replace("{ogrenci_adi}", student.name)
      .replace("{hiz}", String(student.latestSpeedLpm ?? "-"))
      .replace("{yanlis}", String(student.latestMistakes ?? "-"))
      .replace("{hedef}", "Aylık hedef")
      .replace("{tarih}", new Date().toLocaleDateString("tr-TR"))
      .replace("{etkinlik}", "Etkinlik");

    const item: SmsQueueItem = {
      id: `sms-${Date.now()}`,
      studentId,
      guardianId: guardian.guardianId,
      phone: guardian.phone,
      message,
      templateKey,
      status: "mocked",
      createdAt: new Date().toISOString(),
    };

    setQueue((prev) => [item, ...prev]);
  };

  return (
    <div className="space-y-4 rounded-lg border bg-background p-4">
      <div>
        <Label className="mb-2 block text-sm font-semibold">SMS Şablonu</Label>
        <div className="grid gap-2 md:grid-cols-2">
          {Object.entries(smsTemplates).map(([key, value]) => (
            <label key={key} className="flex cursor-pointer items-start gap-2 rounded-md border p-3">
              <input
                type="radio"
                name="sms-template"
                value={key}
                checked={templateKey === key}
                onChange={() => setTemplateKey(key as TemplateKey)}
              />
              <div>
                <div className="text-sm font-semibold uppercase">{key}</div>
                <div className="text-xs text-muted-foreground">{value}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        {mockStudents.map((student) => (
          <div key={student.id} className="rounded-md border p-3">
            <div className="text-sm font-semibold">{student.name}</div>
            <div className="text-xs text-muted-foreground">{student.medrese}</div>
            <Button className="mt-3 w-full" onClick={() => sendSms(student.id)}>
              Mock SMS Gönder
            </Button>
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-sm font-semibold">SMS Kuyruğu</h4>
        <div className="mt-2 space-y-2 text-xs">
          {queue.length === 0 && <div className="text-muted-foreground">Henüz SMS gönderilmedi.</div>}
          {queue.map((item) => (
            <div key={item.id} className="rounded border bg-muted/40 p-2">
              <div className="font-medium">{item.phone}</div>
              <div>{item.message}</div>
              <div className="text-[10px] uppercase text-muted-foreground">Durum: {item.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
