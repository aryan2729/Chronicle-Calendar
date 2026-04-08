"use client";

import { useMemo } from "react";
import {
  getDaysInMonth, getFirstDayOfWeek, formatDateKey,
  isInRange, isRangeStart, isRangeEnd, todayKey,
} from "@/lib/calendarUtils";
import { HOLIDAYS } from "@/lib/monthData";
import { MonthTheme } from "@/lib/monthData";
import { Note } from "@/types/calendar";

interface Props {
  year: number;
  month: number;
  theme: MonthTheme;
  rangeStart: string | null;
  rangeEnd: string | null;
  hoverDate: string | null;
  isSelecting: boolean;
  notes: Note[];
  onSelectDate: (key: string) => void;
  onHoverDate: (key: string | null) => void;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarGrid({
  year, month, theme,
  rangeStart, rangeEnd, hoverDate, isSelecting,
  notes, onSelectDate, onHoverDate,
}: Props) {
  const TODAY = useMemo(() => todayKey(), []);

  const effectiveEnd = rangeEnd ?? (isSelecting ? hoverDate : null);

  const cells = useMemo(() => {
    const firstDow = getFirstDayOfWeek(year, month);
    const daysThis  = getDaysInMonth(year, month);
    const daysPrev  = getDaysInMonth(year, month - 1);

    type Cell = { key: string; day: number; kind: "prev" | "cur" | "next" };
    const out: Cell[] = [];

    for (let i = firstDow - 1; i >= 0; i--) {
      const d = daysPrev - i;
      const pm = month === 0 ? 11 : month - 1;
      const py = month === 0 ? year - 1 : year;
      out.push({ key: formatDateKey(py, pm, d), day: d, kind: "prev" });
    }

    for (let d = 1; d <= daysThis; d++)
      out.push({ key: formatDateKey(year, month, d), day: d, kind: "cur" });

    const rem = 42 - out.length;
    for (let d = 1; d <= rem; d++) {
      const nm = month === 11 ? 0 : month + 1;
      const ny = month === 11 ? year + 1 : year;
      out.push({ key: formatDateKey(ny, nm, d), day: d, kind: "next" });
    }
    return out;
  }, [year, month]);

  return (
    <div style={{ padding: "4px 14px 14px", flex: 1 }}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        marginBottom: 2,
      }}>
        {WEEKDAYS.map((d, i) => (
          <div key={d} style={{
            textAlign: "center",
            fontFamily: "'DM Mono',monospace",
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "7px 0 4px",
            color: i >= 5 ? `${theme.accent}cc` : "#3d5270",
          }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px 0" }}>
        {cells.map(({ key, day, kind }, idx) => {
          const dow    = idx % 7;
          const isCur  = kind === "cur";
          const isWknd = dow >= 5;
          const isToday   = key === TODAY;
          const holiday   = isCur ? HOLIDAYS[key] : undefined;
          const hasNote   = isCur && notes.some(n => n.dateKey === key);
          const rStart    = isRangeStart(key, rangeStart, effectiveEnd);
          const rEnd      = isRangeEnd(key, rangeStart, effectiveEnd);
          const inRange   = isInRange(key, rangeStart, effectiveEnd);
          const isSelected = rStart || rEnd;

          const singleDay = rangeStart && effectiveEnd && rangeStart === effectiveEnd;
          let stripBg = "transparent";
          let stripRadius = "0";
          if (!singleDay) {
            if (rStart && effectiveEnd && rangeStart !== effectiveEnd) { stripBg = `${theme.accent}20`; stripRadius = "999px 0 0 999px"; }
            else if (rEnd && rangeStart && rangeStart !== effectiveEnd) { stripBg = `${theme.accent}20`; stripRadius = "0 999px 999px 0"; }
            else if (inRange) { stripBg = `${theme.accent}18`; stripRadius = "0"; }
          }

          const dotColor = isSelected ? "#0a0f1a" : (holiday ? "#f87171" : theme.accent);

          let textColor = "#2d3f5c";
          if (isCur) {
            if (isSelected) textColor = "#0a0f1a";
            else if (isWknd) textColor = `${theme.accentLight}`;
            else textColor = inRange ? "#c8d8f0" : "#9db4cc";
          }

          return (
            <div key={key} style={{ background: stripBg, borderRadius: stripRadius, position: "relative" }}>
              <button
                disabled={!isCur}
                onClick={() => isCur && onSelectDate(key)}
                onMouseEnter={() => onHoverDate(key)}
                onMouseLeave={() => onHoverDate(null)}
                className={`day-btn${isToday && !isSelected ? " today-pulse" : ""}`}
                title={holiday}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  border: isToday && !isSelected
                    ? `2px solid ${theme.accent}`
                    : "2px solid transparent",
                  borderRadius: 8,
                  background: isSelected ? theme.accent : "transparent",
                  cursor: isCur ? "pointer" : "default",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  padding: 0,
                  position: "relative",
                  color: textColor,
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "clamp(10px, 1.8vw, 13px)",
                  fontWeight: isToday || isSelected ? 700 : isWknd ? 500 : 400,
                }}
              >
                <span style={{ lineHeight: 1 }}>{day}</span>

                {(holiday || hasNote) && (
                  <div style={{ display: "flex", gap: 2 }}>
                    {holiday && (
                      <div style={{
                        width: 3, height: 3, borderRadius: "50%",
                        background: dotColor, flexShrink: 0,
                      }} />
                    )}
                    {hasNote && (
                      <div style={{
                        width: 3, height: 3, borderRadius: "50%",
                        background: isSelected ? "#0a0f1a" : theme.accentLight,
                        flexShrink: 0,
                      }} />
                    )}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
