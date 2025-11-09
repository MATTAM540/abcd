"use client";

import { useState } from "react";

import { exportReportToExcel } from "@/lib/export/excel";
import { exportReportToPdf } from "@/lib/export/pdf";
import { type ReportExportPayload } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function ReportExportButtons({ payload }: { payload: ReportExportPayload }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (type: "pdf" | "excel") => {
    setIsExporting(true);
    try {
      const exporter = type === "pdf" ? exportReportToPdf : exportReportToExcel;
      const file = await exporter(payload);
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${payload.type}-raporu.${type === "pdf" ? "pdf" : "xlsx"}`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => handleExport("pdf")} disabled={isExporting} variant="secondary">
        PDF olarak indir
      </Button>
      <Button onClick={() => handleExport("excel")} disabled={isExporting}>
        Excel olarak indir
      </Button>
    </div>
  );
}
