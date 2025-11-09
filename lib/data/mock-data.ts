import {
  type ContactRecord,
  type DocumentRecord,
  type EventRecord,
  type FoundationGoal,
  type FoundationGoalEntry,
  type GoalTemplate,
  type GuardianLink,
  type ReadingSession,
  type StudentProfile,
} from "@/lib/types";

export const mockGoalTemplates: GoalTemplate[] = [
  {
    id: "gt-1",
    foundationId: "foundation-1",
    code: "EGITIM-01",
    title: "Medrese öğrenci sayısı",
    description: "Aylık toplam kayıtlı öğrenci sayısı",
    type: "number",
  },
  {
    id: "gt-2",
    foundationId: "foundation-1",
    code: "IRSHAD-01",
    title: "Haftalık irşad programı",
    description: "Program düzenlendi mi?",
    type: "boolean",
  },
  {
    id: "gt-3",
    foundationId: "foundation-1",
    code: "ETKINLIK-01",
    title: "Etkinlik katılım seviyesi",
    description: "Katılımcı memnuniyet değerlendirmesi",
    type: "enum",
    enumOptions: ["Zayıf", "Orta", "İyi", "Çok iyi"],
  },
];

export const mockFoundationGoals: FoundationGoal[] = [
  {
    id: "fg-1",
    foundationId: "foundation-1",
    templateId: "gt-1",
    periodStart: "2024-04-01",
    periodEnd: "2024-04-30",
    targetNumber: 180,
  },
  {
    id: "fg-2",
    foundationId: "foundation-1",
    templateId: "gt-2",
    periodStart: "2024-04-01",
    periodEnd: "2024-04-30",
    targetBool: true,
  },
  {
    id: "fg-3",
    foundationId: "foundation-1",
    templateId: "gt-3",
    periodStart: "2024-04-01",
    periodEnd: "2024-04-30",
    targetEnum: "İyi",
  },
];

export const mockFoundationGoalEntries: FoundationGoalEntry[] = [
  {
    id: "fge-1",
    foundationId: "foundation-1",
    templateId: "gt-1",
    valueNumber: 170,
    recordedAt: "2024-04-28",
    createdBy: "user-1",
  },
  {
    id: "fge-2",
    foundationId: "foundation-1",
    templateId: "gt-1",
    valueNumber: 185,
    recordedAt: "2024-03-28",
    createdBy: "user-2",
  },
  {
    id: "fge-3",
    foundationId: "foundation-1",
    templateId: "gt-2",
    valueBool: true,
    recordedAt: "2024-04-26",
    createdBy: "user-1",
  },
  {
    id: "fge-4",
    foundationId: "foundation-1",
    templateId: "gt-3",
    valueEnum: "Çok iyi",
    recordedAt: "2024-04-25",
    createdBy: "user-1",
  },
];

export const mockStudents: StudentProfile[] = [
  {
    id: "student-1",
    foundationId: "foundation-1",
    name: "Ahmed Yılmaz",
    medrese: "Fatih Medresesi",
    isMinor: true,
    latestSpeedLpm: 132,
    latestMistakes: 3,
  },
  {
    id: "student-2",
    foundationId: "foundation-1",
    name: "Zeynep Kaya",
    medrese: "Üsküdar Medresesi",
    isMinor: false,
    latestSpeedLpm: 148,
    latestMistakes: 1,
  },
  {
    id: "student-3",
    foundationId: "foundation-1",
    name: "Mustafa Demir",
    medrese: "Eyüp Medresesi",
    isMinor: true,
    latestSpeedLpm: 120,
    latestMistakes: 4,
  },
];

export const mockReadingSessions: ReadingSession[] = [
  {
    id: "rs-1",
    studentId: "student-1",
    date: "2024-04-02",
    workTitle: "Kur'an-ı Kerim",
    pageInfo: "Cüz 12",
    speedLpm: 128,
    mistakes: 4,
    source: "manual",
  },
  {
    id: "rs-2",
    studentId: "student-1",
    date: "2024-04-16",
    workTitle: "Kur'an-ı Kerim",
    pageInfo: "Cüz 13",
    speedLpm: 134,
    mistakes: 2,
    source: "manual",
  },
  {
    id: "rs-3",
    studentId: "student-2",
    date: "2024-04-05",
    workTitle: "Risale-i Nur",
    pageInfo: "Mektubat",
    speedLpm: 150,
    mistakes: 1,
    source: "pdf",
  },
  {
    id: "rs-4",
    studentId: "student-2",
    date: "2024-03-22",
    workTitle: "Risale-i Nur",
    pageInfo: "Lem'alar",
    speedLpm: 142,
    mistakes: 2,
    source: "excel",
  },
  {
    id: "rs-5",
    studentId: "student-3",
    date: "2024-04-11",
    workTitle: "Kur'an-ı Kerim",
    pageInfo: "Cüz 5",
    speedLpm: 122,
    mistakes: 5,
    source: "manual",
  },
];

export const mockDocuments: DocumentRecord[] = [
  {
    id: "doc-1",
    foundationId: "foundation-1",
    title: "Burs Başvuru Formu",
    category: "Burs",
    isConfidential: false,
    sharedWithStudentIds: [],
    updatedAt: "2024-04-20",
  },
  {
    id: "doc-2",
    foundationId: "foundation-1",
    title: "Ahmed Yılmaz Performans Raporu",
    category: "Rapor",
    isConfidential: true,
    sharedWithStudentIds: ["student-1"],
    updatedAt: "2024-04-15",
  },
];

export const mockGuardianLinks: GuardianLink[] = [
  {
    id: "gl-1",
    studentId: "student-1",
    relation: "baba",
    phone: "+905001112233",
  },
  {
    id: "gl-2",
    studentId: "student-1",
    relation: "anne",
    phone: "+905009998877",
  },
  {
    id: "gl-3",
    studentId: "student-2",
    relation: "diger",
    phone: "+905007778866",
  },
];

export const mockEvents: EventRecord[] = [
  {
    id: "event-1",
    foundationId: "foundation-1",
    title: "Ramazan Buluşması",
    description: "Vakıf gönüllüleri ile iftar programı",
    date: "2024-04-06",
    location: "Eyüp",
    targetAudience: "all",
  },
  {
    id: "event-2",
    foundationId: "foundation-1",
    title: "Öğrenci Kampı",
    description: "Yaz kampı planlama",
    date: "2024-05-01",
    location: "Sapanca",
    targetAudience: "students",
  },
];

export const mockContacts: ContactRecord[] = [
  {
    id: "contact-1",
    foundationId: "foundation-1",
    name: "Mehmet Kara",
    role: "Medrese Sorumlusu",
    phone: "+905551112233",
    email: "mehmet@vakif.org",
  },
  {
    id: "contact-2",
    foundationId: "foundation-1",
    name: "Ayşe Demir",
    role: "Vakıf Koordinatörü",
    phone: "+905441234567",
    email: "ayse@vakif.org",
  },
];

export const mockStudentReportKpi = {
  weekly: {
    averageSpeed: 136,
    averageMistakes: 2.4,
    bestImprovement: "Ahmed Yılmaz",
  },
  monthly: {
    averageSpeed: 138,
    averageMistakes: 2.1,
    bestImprovement: "Zeynep Kaya",
  },
  yearly: {
    averageSpeed: 130,
    averageMistakes: 2.8,
    bestImprovement: "Mustafa Demir",
  },
};

export const mockFoundationKpi = {
  monthly: {
    completionRate: 0.86,
    strongestGoal: "Haftalık irşad programı",
    weakestGoal: "Medrese öğrenci sayısı",
  },
  quarterly: {
    completionRate: 0.81,
    strongestGoal: "Etkinlik katılım seviyesi",
    weakestGoal: "Medrese öğrenci sayısı",
  },
  yearly: {
    completionRate: 0.79,
    strongestGoal: "Haftalık irşad programı",
    weakestGoal: "Medrese öğrenci sayısı",
  },
};
