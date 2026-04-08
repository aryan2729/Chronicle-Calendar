"use client";

import { MONTH_THEMES } from "@/lib/monthData";
import { getDaysInMonth, getFirstDayOfWeek, formatDateKey, todayKey } from "@/lib/calendarUtils";
import { MonthTheme } from "@/lib/monthData";

interface Props {
  year: number;
  currentMonth: number;
  onSelectMonth: (month: number) => void;
  onChangeYear: (delta: number) => void;
  theme: MonthTheme;
}

const WD = ["M","T","W","T","F","S","S"];

function MiniMonth({ year, month, isActive, accent, onClick }: {
  year: number; month: number; isActive: boolean; accent: string; onClick: () => void;
}) {
  const TODAY   = todayKey();
  const first   = getFirstDayOfWeek(year, month);
  const daysInM = getDaysInMonth(year, month);
  const mTheme  = MONTH_THEMES[month];

  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInM; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <button
      onClick={onClick}
      style={{
        background: isActive ? `${accent}18` : "rgba(15,22,35,0.55)",
        border: `1px solid ${isActive ? accent + "70" : "rgba(45,63,92,0.3)"}`,
        borderRadius: 10,
        padding: "10px 8px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s",
      }}
      onMouseEnter={e => {
        if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(45,63,92,0.3)";
      }}
      onMouseLeave={e => {
        if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(15,22,35,0.55)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 11, fontWeight: 700,
          color: isActive ? accent : "#4a607a",
        }}>
          {mTheme.name.slice(0, 3).toUpperCase()}
        </span>
        <span style={{ fontSize: 10 }}>{mTheme.season}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1, marginBottom: 2 }}>
        {WD.map((d, i) => (
          <div key={i} style={{
            fontSize: 6.5, textAlign: "center",
            fontFamily: "'DM Mono',monospace",
            color: "#1e2d45",
          }}>{d}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "1px 0" }}>
        {cells.map((d, i) => {
          const isToday = d !== null
            && formatDateKey(year, month, d) === TODAY;
          return (
            <div key={i} style={{
              fontSize: 6.5, textAlign: "center",
              lineHeight: "12px",
              color: isToday ? accent : d ? "#2d3f5c" : "transparent",
              fontWeight: isToday ? 700 : 400,
              background: isToday ? `${accent}30` : "transparent",
              borderRadius: 2,
              fontFamily: "'DM Mono',monospace",
            }}>
              {d ?? "·"}
            </div>
          );
        })}
      </div>
    </button>
  );
}

export function YearView({ year, currentMonth, onSelectMonth, onChangeYear, theme }: Props) {
  return (
    <div className="flip-in" style={{ padding: "12px 14px", overflow: "auto", flex: 1 }}>
      <div style={{
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}>
        <button
          onClick={() => onChangeYear(-1)}
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            border: "1px solid rgba(45,63,92,0.4)",
            background: "rgba(16,24,38,0.9)",
            color: "#557092",
            fontSize: 15,
            cursor: "pointer",
          }}
          aria-label="Previous year"
          title="Previous year"
        >
          ‹
        </button>
        <span style={{
          fontFamily: "'DM Mono',monospace",
          letterSpacing: "0.08em",
          color: theme.accentLight,
          fontSize: 12,
        }}>
          {year}
        </span>
        <button
          onClick={() => onChangeYear(1)}
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            border: "1px solid rgba(45,63,92,0.4)",
            background: "rgba(16,24,38,0.9)",
            color: "#557092",
            fontSize: 15,
            cursor: "pointer",
          }}
          aria-label="Next year"
          title="Next year"
        >
          ›
        </button>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 8,
      }}>
        {Array.from({ length: 12 }, (_, i) => (
          <MiniMonth
            key={i}
            year={year}
            month={i}
            isActive={i === currentMonth}
            accent={theme.accent}
            onClick={() => onSelectMonth(i)}
          />
        ))}
      </div>
    </div>
  );
}
