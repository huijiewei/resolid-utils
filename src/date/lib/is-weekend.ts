import type { DateInput } from "./types";
import { toDate } from "./to-date";

export function isWeekend(input: DateInput): boolean {
  const day = toDate(input).getDay();

  return day == 0 || day == 6;
}
