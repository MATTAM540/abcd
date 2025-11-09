export type GoalValueType = "number" | "boolean" | "text" | "enum";

export interface GoalTemplate {
  id: string;
  foundationId: string;
  code: string;
  title: string;
  description?: string;
  type: GoalValueType;
  enumOptions?: string[];
}

export interface FoundationGoal {
  id: string;
  foundationId: string;
  templateId: string;
  periodStart: string;
  periodEnd: string;
  targetNumber?: number;
  targetText?: string;
  targetBool?: boolean;
  targetEnum?: string;
}

export interface FoundationGoalEntry {
  id: string;
  foundationId: string;
  templateId: string;
  valueNumber?: number;
  valueText?: string;
  valueBool?: boolean;
  valueEnum?: string;
  recordedAt: string;
  createdBy: string;
}

export interface FoundationReportSummary {
  id: string;
  foundationId: string;
  period: "monthly" | "quarterly" | "yearly";
  periodStart: string;
  periodEnd: string;
  kpiSummary: Record<string, unknown>;
}

export interface StudentProfile {
  id: string;
  foundationId: string;
  name: string;
  medrese: string;
  isMinor: boolean;
  latestSpeedLpm?: number;
  latestMistakes?: number;
}

export interface ReadingSession {
  id: string;
  studentId: string;
  date: string;
  workTitle: string;
  pageInfo?: string;
  speedLpm?: number;
  mistakes?: number;
  source: "manual" | "excel" | "pdf";
}

export interface DocumentRecord {
  id: string;
  foundationId: string;
  title: string;
  category: string;
  isConfidential: boolean;
  sharedWithStudentIds: string[];
  updatedAt: string;
}

export interface EventRecord {
  id: string;
  foundationId: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  targetAudience: "foundation" | "students" | "guardians" | "all";
}

export interface ContactRecord {
  id: string;
  foundationId: string;
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export interface GuardianLink {
  id: string;
  studentId: string;
  relation: "baba" | "anne" | "diger";
  phone?: string;
  email?: string;
}

export type Role =
  | "foundation_admin"
  | "foundation_editor"
  | "foundation_viewer"
  | "guardian";

export interface Profile {
  id: string;
  foundationId?: string;
  role: Role;
}

export interface SmsQueueItem {
  id: string;
  studentId: string;
  guardianId?: string;
  phone: string;
  message: string;
  templateKey: string;
  status: "mocked" | "pending" | "sent";
  createdAt: string;
}

export interface ReportExportPayload {
  type: "foundation" | "student";
  period: "monthly" | "quarterly" | "yearly" | "weekly";
  periodStart: string;
  periodEnd: string;
  data: Record<string, unknown>;
}
