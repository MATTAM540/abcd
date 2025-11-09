import { type ReportExportPayload } from "@/lib/types";

export async function exportReportToExcel(payload: ReportExportPayload) {
  console.info("Excel export mocked", payload);
  return new Blob([JSON.stringify(payload, null, 2)], { type: "application/vnd.ms-excel" });
}
