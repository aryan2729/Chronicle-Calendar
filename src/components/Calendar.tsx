"use client";

import { useReducer, useCallback, useRef, useEffect, useState } from "react";
import { calendarReducer, initialState } from "@/lib/calendarReducer";
import { MONTH_THEMES } from "@/lib/monthData";
import { getRangeDays } from "@/lib/calendarUtils";
import { HeroPanel } from "./HeroPanel";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";
import { YearView } from "./YearView";
import { Note } from "@/types/calendar";

const navBtn: React.CSSProperties = {
  width: 32, height: 32,
  borderRadius: 8,
  background: "rgba(45,63,92,0.25)",
  border: "1px solid rgba(45,63,92,0.45)",
  color: "#4a607a",
  fontSize: 18,
  cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  lineHeight: 1,
  flexShrink: 0,
};

const MONTH_SHORT_NAMES = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function Calendar() {
  const [state, dispatch]     = useReducer(calendarReducer, initialState);
  const [animKey, setAnimKey] = useState(0);
  const [animClass, setAnimClass] = useState("flip-in");
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const prevMonthRef = useRef({ month: state.month, year: state.year });

  const theme = MONTH_THEMES[state.month];

  useEffect(() => {
    const prev = prevMonthRef.current;
    if (prev.month !== state.month || prev.year !== state.year) {
      setAnimClass(state.animDirection === "next" ? "flip-in" : "flip-in-reverse");
      setAnimKey(k => k + 1);
      prevMonthRef.current = { month: state.month, year: state.year };
    }
  }, [state.month, state.year, state.animDirection]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        dispatch({ type: "NAVIGATE", direction: "next" });
      if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        dispatch({ type: "NAVIGATE", direction: "prev" });
      if (e.key === "Escape")
        dispatch({ type: "CLEAR_RANGE" });
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSelectDate = useCallback((key: string) => {
    const isSameSingleDaySelection =
      state.rangeStart === key &&
      state.rangeEnd === key;

    if (isSameSingleDaySelection) {
      dispatch({ type: "CLEAR_RANGE" });
      setShowNotesPanel(false);
      return;
    }

    dispatch({ type: "SELECT_DATE", dateKey: key });
    setShowNotesPanel(true);
  }, [state.rangeStart, state.rangeEnd]);

  const handleHoverDate = useCallback((key: string | null) => {
    dispatch({ type: "HOVER_DATE", dateKey: key });
  }, []);

  const handleAddNote = useCallback((note: Omit<Note, "id" | "createdAt">) => {
    dispatch({ type: "ADD_NOTE", note });
  }, []);

  const handleUpdateNote = useCallback((id: string, text: string) => {
    dispatch({ type: "UPDATE_NOTE", id, text });
  }, []);

  const handleDeleteNote = useCallback((id: string) => {
    dispatch({ type: "DELETE_NOTE", id });
  }, []);

  const handleNavigate = useCallback((dir: "next" | "prev") => {
    dispatch({ type: "NAVIGATE", direction: dir });
  }, []);

  const handleJumpToMonth = useCallback((month: number) => {
    dispatch({ type: "JUMP_TO_MONTH", year: state.year, month });
  }, [state.year]);

  const handleChangeYear = useCallback((delta: number) => {
    dispatch({ type: "JUMP_TO_MONTH", year: state.year + delta, month: state.month });
  }, [state.year, state.month]);

  const toggleView = useCallback(() => {
    dispatch({ type: "SET_VIEW", view: state.view === "month" ? "year" : "month" });
  }, [state.view]);

  const monthNotes = state.notes.filter(n => {
    if (!n.dateKey) return true;
    const [y, m] = n.dateKey.split("-").map(Number);
    return y === state.year && m === state.month + 1;
  });

  const rangeDays =
    state.rangeStart && state.rangeEnd
      ? getRangeDays(state.rangeStart, state.rangeEnd)
      : 0;

  return (
    <>
      <div style={{
        minHeight: "100dvh",
        background: `
          radial-gradient(ellipse at 15% 50%,  ${theme.accentDark}1a 0%, transparent 55%),
          radial-gradient(ellipse at 85% 10%, ${theme.accent}0e 0%, transparent 50%),
          radial-gradient(ellipse at 50% 90%, ${theme.accentDark}10 0%, transparent 50%),
          linear-gradient(150deg, #050a13 0%, #0a1220 50%, #0d1828 100%)
        `,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(10px, 3vw, 36px)",
        transition: "background 0.7s ease",
        position: "relative",
        overflow: "hidden",
      }}>

        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }} />

        <div
          className="calendar-card"
          style={{
            position: "relative", zIndex: 1,
            width: "100%",
            maxWidth: 940,
            maxHeight: "min(84dvh, 760px)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `
              0 0 0 1px rgba(45,63,92,0.45),
              0 0 0 1px ${theme.accent}22 inset,
              0 0 22px ${theme.accent}26,
              0 24px 60px rgba(0,0,0,0.65),
              0 60px 120px rgba(0,0,0,0.4),
              0 0 80px ${theme.accent}12
            `,
            background: "#0a1220",
            display: "flex",
            flexDirection: "column",
            transition: "box-shadow 0.7s ease",
          }}
        >
          <div
            className="cal-body"
            style={{ display: "flex", flexDirection: "row", flex: 1, minHeight: 0 }}
          >

            <div
              className="hero-col"
              style={{
                width: "36%",
                minWidth: 190,
                maxWidth: 320,
                minHeight: 420,
                flexShrink: 0,
                position: "relative",
              }}
            >
              <HeroPanel
                theme={theme}
                year={state.year}
                month={state.month}
                rangeStart={state.rangeStart}
                rangeEnd={state.rangeEnd}
                onClearRange={() => dispatch({ type: "CLEAR_RANGE" })}
              />
            </div>

            <div style={{
              flex: 1, minWidth: 0, minHeight: 0,
              display: "flex", flexDirection: "column",
              background: "rgba(8,13,20,0.98)",
              borderLeft: "1px solid rgba(45,63,92,0.25)",
              overflow: "hidden",
            }}>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px 8px",
                borderBottom: "1px solid rgba(45,63,92,0.25)",
                flexShrink: 0,
                gap: 8,
              }}>
                <button
                  onClick={() => handleNavigate("prev")}
                  style={navBtn}
                  className="nav-btn"
                  aria-label="Previous month"
                >
                  ‹
                </button>

                <button
                  onClick={toggleView}
                  title={state.view === "month" ? "Open year overview" : "Close year overview"}
                  style={{
                    flex: 1,
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
                    padding: "4px 6px", borderRadius: 8,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(45,63,92,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  <span style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(14px, 2.8vw, 17px)",
                    fontWeight: 700,
                    color: theme.accentLight,
                    lineHeight: 1,
                    letterSpacing: "0.01em",
                  }}>
                    {MONTH_THEMES[state.month].name}
                  </span>
                  <span style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    color: "#2d3f5c",
                    lineHeight: 1,
                  }}>
                    {state.year}{" "}
                    <span style={{ opacity: 0.6 }}>{state.view === "year" ? "▴" : "▾"}</span>
                  </span>
                </button>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "2px 6px",
                  borderRadius: 8,
                  background: "rgba(10,20,33,0.88)",
                  border: "1px solid rgba(45,63,92,0.3)",
                }}>
                  <button
                    onClick={() => handleChangeYear(-1)}
                    style={{ ...navBtn, width: 24, height: 24, fontSize: 14, borderRadius: 6 }}
                    className="nav-btn"
                    aria-label="Previous year"
                    title="Previous year"
                  >
                    ‹
                  </button>
                  <span style={{
                    minWidth: 44,
                    textAlign: "center",
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "#6f8db1",
                  }}>
                    {state.year}
                  </span>
                  <button
                    onClick={() => handleChangeYear(1)}
                    style={{ ...navBtn, width: 24, height: 24, fontSize: 14, borderRadius: 6 }}
                    className="nav-btn"
                    aria-label="Next year"
                    title="Next year"
                  >
                    ›
                  </button>
                </div>

                <button
                  onClick={() => {
                    const now = new Date();
                    dispatch({ type: "JUMP_TO_MONTH", year: now.getFullYear(), month: now.getMonth() });
                  }}
                  style={{
                    ...navBtn,
                    width: "auto",
                    padding: "0 9px",
                    fontSize: 9,
                    letterSpacing: "0.07em",
                    fontFamily: "'DM Mono',monospace",
                    fontWeight: 500,
                    color: "#3d5270",
                  }}
                  className="nav-btn"
                  title="Jump to today"
                >
                  TODAY
                </button>

                <button
                  onClick={() => handleNavigate("next")}
                  style={navBtn}
                  className="nav-btn"
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
                gap: 6,
                padding: "8px 12px",
                borderBottom: "1px solid rgba(45,63,92,0.2)",
                background: "linear-gradient(180deg, rgba(8,14,24,0.95) 0%, rgba(7,12,21,0.9) 100%)",
              }}>
                {MONTH_SHORT_NAMES.map((name, idx) => {
                  const active = idx === state.month;
                  return (
                    <button
                      key={name}
                      onClick={() => handleJumpToMonth(idx)}
                      aria-label={`Jump to ${MONTH_THEMES[idx].name}`}
                      title={`${MONTH_THEMES[idx].name} ${state.year}`}
                      style={{
                        borderRadius: 8,
                        border: `1px solid ${active ? `${theme.accent}70` : "rgba(45,63,92,0.3)"}`,
                        background: active ? `${theme.accent}20` : "rgba(14,22,36,0.8)",
                        color: active ? theme.accentLight : "#47607d",
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 10,
                        letterSpacing: "0.05em",
                        padding: "6px 0",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>

              <div
                key={`${animKey}-${state.view}`}
                className={animClass}
                style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}
              >
                {state.view === "year" ? (
                  <YearView
                    year={state.year}
                    currentMonth={state.month}
                    onSelectMonth={handleJumpToMonth}
                    onChangeYear={handleChangeYear}
                    theme={theme}
                  />
                ) : (
                  <CalendarGrid
                    year={state.year}
                    month={state.month}
                    theme={theme}
                    rangeStart={state.rangeStart}
                    rangeEnd={state.rangeEnd}
                    hoverDate={state.hoverDate}
                    isSelecting={state.isSelecting}
                    notes={monthNotes}
                    onSelectDate={handleSelectDate}
                    onHoverDate={handleHoverDate}
                  />
                )}
              </div>

              {state.rangeStart && (
                <div
                  className="fade-in"
                  style={{
                    padding: "6px 14px",
                    borderTop: "1px solid rgba(45,63,92,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0,
                    gap: 8,
                  }}
                >
                  <span style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    color: "#2d3f5c",
                    letterSpacing: "0.04em",
                  }}>
                    {state.rangeEnd
                      ? `${rangeDays} day${rangeDays !== 1 ? "s" : ""} selected`
                      : "Click a second date to complete range"}
                  </span>
                  {state.rangeEnd && (
                    <button
                      onClick={() => dispatch({ type: "CLEAR_RANGE" })}
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        borderRadius: 5,
                        color: "#f87171",
                        fontSize: 9,
                        padding: "2px 8px",
                        cursor: "pointer",
                        fontFamily: "'DM Sans',sans-serif",
                        letterSpacing: "0.05em",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.2)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
                    >
                      Clear ×
                    </button>
                  )}
                </div>
              )}

              {showNotesPanel && state.rangeStart && (
                <NotesPanel
                  notes={monthNotes}
                  month={state.month}
                  year={state.year}
                  rangeStart={state.rangeStart}
                  rangeEnd={state.rangeEnd}
                  theme={theme}
                  onAddNote={handleAddNote}
                  onUpdateNote={handleUpdateNote}
                  onDeleteNote={handleDeleteNote}
                />
              )}
            </div>
          </div>

          <div style={{
            padding: "7px 16px",
            background: "rgba(6,10,18,0.8)",
            borderTop: "1px solid rgba(45,63,92,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 9,
              color: "#526b88",
              letterSpacing: "0.08em",
            }}>
              CHRONICLE · WALL CALENDAR
            </span>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { dot: "#3a7bd5", label: "Range" },
                { dot: "#f87171", label: "Holiday" },
                { dot: "#9db4cc", label: "Note" },
              ].map(({ dot, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: dot }} />
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "#5f7896", letterSpacing: "0.06em" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          position: "fixed", bottom: 14, right: 16, zIndex: 10,
          fontFamily: "'DM Mono',monospace",
          fontSize: 9,
          color: "#1a2638",
          letterSpacing: "0.07em",
          pointerEvents: "none",
        }}>
          ← → navigate · ESC clear
        </div>
      </div>

      <style>{`
        .calendar-card {
          height: min(84dvh, 760px);
          animation: cardGlowPulse 3.8s ease-in-out infinite;
        }
        @keyframes cardGlowPulse {
          0%, 100% {
            box-shadow:
              0 0 0 1px rgba(45,63,92,0.45),
              0 0 0 1px ${theme.accent}22 inset,
              0 0 18px ${theme.accent}1e,
              0 24px 60px rgba(0,0,0,0.65),
              0 60px 120px rgba(0,0,0,0.4),
              0 0 80px ${theme.accent}10;
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(45,63,92,0.55),
              0 0 0 1px ${theme.accent}2f inset,
              0 0 30px ${theme.accent}35,
              0 24px 60px rgba(0,0,0,0.65),
              0 60px 120px rgba(0,0,0,0.42),
              0 0 100px ${theme.accent}1a;
          }
        }
        @media (max-width: 600px) {
          .calendar-card {
            height: auto;
            max-height: none;
          }
          .cal-body { flex-direction: column !important; }
          .hero-col {
            width: 100% !important;
            max-width: none !important;
            min-height: 160px !important;
            height: 170px !important;
          }
        }
        @media (min-width: 601px) and (max-width: 820px) {
          .calendar-card {
            height: min(86dvh, 700px);
          }
          .hero-col {
            width: 30% !important;
            min-height: 380px !important;
          }
        }
        @media (min-width: 821px) and (max-width: 1080px) {
          .calendar-card {
            height: min(86dvh, 730px);
          }
          .hero-col {
            min-height: 400px !important;
          }
        }
      `}</style>
    </>
  );
}
