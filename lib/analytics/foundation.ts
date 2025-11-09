import { differenceInCalendarMonths, parseISO } from "date-fns";

import {
  type FoundationGoal,
  type FoundationGoalEntry,
  type GoalTemplate,
} from "@/lib/types";

interface GoalPerformance {
  templateId: string;
  completionRate: number;
  latestEntryDate?: string;
}

export function calculateGoalCompletion(
  goals: FoundationGoal[],
  entries: FoundationGoalEntry[],
  templateId: string
): GoalPerformance {
  const goal = goals.find((g) => g.templateId === templateId);
  if (!goal) {
    return { templateId, completionRate: 0 };
  }

  const goalEntries = entries.filter((entry) => entry.templateId === templateId);
  if (!goalEntries.length) {
    return { templateId, completionRate: 0 };
  }

  const latest = goalEntries.reduce((latestEntry, entry) =>
    !latestEntry || new Date(entry.recordedAt) > new Date(latestEntry.recordedAt) ? entry : latestEntry
  );

  let completionRate = 0;

  if (goal.targetNumber !== undefined && latest.valueNumber !== undefined) {
    completionRate = latest.valueNumber / goal.targetNumber;
  } else if (goal.targetBool !== undefined && latest.valueBool !== undefined) {
    completionRate = goal.targetBool === latest.valueBool ? 1 : 0;
  } else if (goal.targetEnum && latest.valueEnum) {
    completionRate = goal.targetEnum === latest.valueEnum ? 1 : 0.5;
  } else if (goal.targetText && latest.valueText) {
    completionRate = latest.valueText.length > 0 ? 1 : 0;
  }

  return {
    templateId,
    completionRate,
    latestEntryDate: latest.recordedAt,
  };
}

export function summarizeFoundationKpi(
  templates: GoalTemplate[],
  goals: FoundationGoal[],
  entries: FoundationGoalEntry[]
) {
  const performances = templates.map((template) =>
    calculateGoalCompletion(goals, entries, template.id)
  );

  const totalCompletion =
    performances.reduce((total, perf) => total + perf.completionRate, 0) /
    Math.max(performances.length, 1);

  const sortedPerformances = [...performances].sort((a, b) => b.completionRate - a.completionRate);
  const strongest = sortedPerformances[0];
  const weakest = sortedPerformances[sortedPerformances.length - 1];

  return {
    totalCompletion,
    strongestTemplateId: strongest?.templateId,
    weakestTemplateId: weakest?.templateId,
  };
}

export function calculateReportingPeriodRange(period: "monthly" | "quarterly" | "yearly") {
  const end = new Date();
  const monthOffset = period === "monthly" ? 1 : period === "quarterly" ? 3 : 12;
  const start = new Date(end);
  start.setMonth(end.getMonth() - monthOffset + 1, 1);
  return { start: start.toISOString(), end: end.toISOString() };
}

export function groupEntriesByMonth(entries: FoundationGoalEntry[]) {
  return entries.reduce<Record<string, FoundationGoalEntry[]>>((acc, entry) => {
    const monthKey = entry.recordedAt.slice(0, 7);
    acc[monthKey] = acc[monthKey] ?? [];
    acc[monthKey].push(entry);
    return acc;
  }, {});
}

export function calculateTrend(entries: FoundationGoalEntry[]) {
  if (entries.length < 2) {
    return 0;
  }

  const sorted = [...entries].sort(
    (a, b) => parseISO(a.recordedAt).getTime() - parseISO(b.recordedAt).getTime()
  );
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  if (first.valueNumber === undefined || last.valueNumber === undefined) {
    return 0;
  }

  const months = Math.max(1, differenceInCalendarMonths(parseISO(last.recordedAt), parseISO(first.recordedAt)));
  const delta = last.valueNumber - first.valueNumber;
  return delta / months;
}
