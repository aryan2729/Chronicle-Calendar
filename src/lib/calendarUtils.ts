export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function formatDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseDateKey(key: string): { year: number; month: number; day: number } {
  const [y, m, d] = key.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

export function todayKey(): string {
  const d = new Date();
  return formatDateKey(d.getFullYear(), d.getMonth(), d.getDate());
}

function normRange(start: string, end: string): [string, string] {
  return start <= end ? [start, end] : [end, start];
}

export function isRangeStart(date: string, start: string | null, end: string | null): boolean {
  if (!start) return false;
  const eff = end ?? start;
  const [s] = normRange(start, eff);
  return date === s;
}

export function isRangeEnd(date: string, start: string | null, end: string | null): boolean {
  if (!start || !end) return false;
  const [, e] = normRange(start, end);
  return date === e;
}

export function isInRange(date: string, start: string | null, end: string | null): boolean {
  if (!start || !end) return false;
  const [s, e] = normRange(start, end);
  return date > s && date < e;
}

export function getRangeDays(start: string, end: string): number {
  const [s, e] = normRange(start, end);
  return Math.floor((new Date(e).getTime() - new Date(s).getTime()) / 86_400_000) + 1;
}

export function formatDisplayDate(key: string): string {
  const { year, month, day } = parseDateKey(key);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[month]} ${day}, ${year}`;
}

export function formatShortDate(key: string): string {
  const { month, day } = parseDateKey(key);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[month]} ${day}`;
}
