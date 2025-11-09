import { parseISO } from "date-fns";

import { type ReadingSession } from "@/lib/types";

export function buildSpeedSeries(sessions: ReadingSession[]) {
  return sessions
    .filter((session) => session.speedLpm !== undefined)
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .map((session) => ({
      date: session.date,
      speed: session.speedLpm ?? 0,
    }));
}

export function buildMistakeSeries(sessions: ReadingSession[]) {
  return sessions
    .filter((session) => session.mistakes !== undefined)
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .map((session) => ({
      date: session.date,
      mistakes: session.mistakes ?? 0,
    }));
}

export function calculateStudentAverages(sessions: ReadingSession[]) {
  const speedValues = sessions
    .map((session) => session.speedLpm)
    .filter((value): value is number => value !== undefined);
  const mistakeValues = sessions
    .map((session) => session.mistakes)
    .filter((value): value is number => value !== undefined);

  const averageSpeed = speedValues.length
    ? speedValues.reduce((sum, value) => sum + value, 0) / speedValues.length
    : 0;
  const averageMistakes = mistakeValues.length
    ? mistakeValues.reduce((sum, value) => sum + value, 0) / mistakeValues.length
    : 0;

  return { averageSpeed, averageMistakes };
}
