"use client";

import { useEffect, useState } from "react";
import { MonthTheme } from "@/lib/monthData";
import { formatShortDate, getRangeDays } from "@/lib/calendarUtils";

interface Props {
  theme: MonthTheme;
  year: number;
  month: number;
  rangeStart: string | null;
  rangeEnd: string | null;
  onClearRange: () => void;
}

export function HeroPanel({ theme, year, rangeStart, rangeEnd, onClearRange }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(false); }, [theme.image]);

  const hasRange = !!(rangeStart && rangeEnd);
  const days = hasRange ? getRangeDays(rangeStart!, rangeEnd!) : 0;

  function rangeLabel() {
    if (!rangeStart) return null;
    if (!rangeEnd || rangeEnd === rangeStart) return formatShortDate(rangeStart);
    const [s, e] = rangeStart <= rangeEnd ? [rangeStart, rangeEnd] : [rangeEnd, rangeStart];
    return `${formatShortDate(s)} – ${formatShortDate(e)}`;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#060c16" }}>

      {!loaded && <div className="shimmer" style={{ position: "absolute", inset: 0 }} />}

      <img
        src={theme.image}
        alt={theme.imageAlt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          filter: "brightness(0.92) contrast(1.08) saturate(1.05)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(to top, rgba(6,12,22,0.76) 0%, rgba(6,12,22,0.38) 42%, rgba(6,12,22,0.1) 72%, transparent 100%),
          linear-gradient(to right, rgba(6,12,22,0.22) 0%, transparent 62%)
        `,
      }} />

      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${theme.accentDark}22 0%, transparent 60%)`,
        mixBlendMode: "screen",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "18px 20px",
      }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "rgba(6,12,22,0.55)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 99,
            padding: "4px 10px",
          }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono',monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Chronicle
            </span>
          </div>
          <span style={{ fontSize: 22, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }}>
            {theme.season}
          </span>
        </div>

        <div>
          {rangeStart && (
            <div className="scale-in" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(6,12,22,0.65)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme.accent}50`,
              borderRadius: 10,
              padding: "6px 12px",
              marginBottom: 12,
            }}>
              <span style={{ fontSize: 14, lineHeight: 1 }}>📅</span>
              <span style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 11,
                color: theme.accentLight,
                letterSpacing: "0.04em",
              }}>
                {rangeLabel()}
                {hasRange && days > 1 && <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: 6 }}>· {days}d</span>}
              </span>
              <button
                onClick={onClearRange}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.3)", fontSize: 14, lineHeight: 1,
                  padding: "0 2px", transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f87171")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                title="Clear selection"
              >
                ×
              </button>
            </div>
          )}

          <p style={{
            margin: "0 0 5px",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          }}>
            {theme.tagline}
          </p>

          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h2 style={{
              margin: 0, lineHeight: 0.9,
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.9rem, 5vw, 2.7rem)",
              fontWeight: 900,
              color: "#ffffff",
              textShadow: "0 2px 20px rgba(0,0,0,0.7)",
              letterSpacing: "-0.01em",
            }}>
              {theme.name.toUpperCase()}
            </h2>
            <span style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "clamp(14px, 2.5vw, 18px)",
              fontWeight: 400,
              color: theme.accentLight,
              textShadow: "0 1px 8px rgba(0,0,0,0.5)",
            }}>
              {year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
