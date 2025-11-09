import { type ReportExportPayload } from "@/lib/types";

export async function exportReportToPdf(payload: ReportExportPayload) {
  // Netlify Function entegrasyonunda bu metot serverless olarak çalıştırılabilir.
  console.info("PDF export mocked", payload);
  return new Blob([JSON.stringify(payload, null, 2)], { type: "application/pdf" });
}
