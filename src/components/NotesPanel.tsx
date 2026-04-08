"use client";

import { useState, useRef, useEffect } from "react";
import { Note } from "@/types/calendar";
import { NOTE_TAGS } from "@/lib/monthData";
import { MonthTheme } from "@/lib/monthData";
import { formatShortDate, formatDisplayDate } from "@/lib/calendarUtils";

interface Props {
  notes: Note[];
  month: number;
  year: number;
  rangeStart: string | null;
  rangeEnd: string | null;
  theme: MonthTheme;
  onAddNote: (note: Omit<Note, "id" | "createdAt">) => void;
  onUpdateNote: (id: string, text: string) => void;
  onDeleteNote: (id: string) => void;
}

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function NotesPanel({
  notes, month, year, rangeStart, rangeEnd, theme,
  onAddNote, onUpdateNote, onDeleteNote,
}: Props) {
  const [draft, setDraft]       = useState("");
  const [selTag, setSelTag]     = useState(NOTE_TAGS[0]);
  const [collapsed, setCollapsed] = useState(false);
  const textareaRef             = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [draft]);

  function handleAdd() {
    if (!draft.trim()) return;
    onAddNote({
      text: draft.trim(),
      dateKey: rangeStart ?? null,
      tag: selTag.label,
      tagColor: selTag.color,
      tagEmoji: selTag.emoji,
    });
    setDraft("");
  }

  function rangeLabel() {
    if (!rangeStart) return null;
    if (!rangeEnd || rangeEnd === rangeStart) return formatShortDate(rangeStart);
    const [s, e] = rangeStart <= rangeEnd ? [rangeStart, rangeEnd] : [rangeEnd, rangeStart];
    return `${formatShortDate(s)} – ${formatShortDate(e)}`;
  }

  const dateNotes    = notes.filter(n => n.dateKey !== null);
  const generalNotes = notes.filter(n => n.dateKey === null);

  return (
    <div style={{
      borderTop: "1px solid rgba(45,63,92,0.4)",
      display: "flex", flexDirection: "column",
      background: "rgba(9,14,22,0.8)",
      backdropFilter: "blur(10px)",
    }}>

      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: collapsed ? "none" : "1px solid rgba(45,63,92,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 13 }}>📝</span>
          <span style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            fontWeight: 500,
            color: "#5f7896",
            letterSpacing: "0.09em",
            textTransform: "uppercase",
          }}>
            Notes · {MONTH_NAMES[month].slice(0,3)} {year}
          </span>
          {notes.length > 0 && (
            <span style={{
              background: theme.accent, color: "#0a0f1a",
              borderRadius: 99, fontSize: 9, fontWeight: 700,
              padding: "1px 6px", fontFamily: "'DM Mono',monospace",
              lineHeight: 1.4,
            }}>
              {notes.length}
            </span>
          )}
        </div>
        <span style={{
          color: "#4f6785", fontSize: 12,
          transition: "transform 0.2s",
          display: "inline-block",
          transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
        }}>
          ▾
        </span>
      </button>

      {!collapsed && (
        <div style={{ display: "flex", flexDirection: "column" }}>

          <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid rgba(45,63,92,0.25)" }}>

            <div style={{ display: "flex", gap: 5, marginBottom: 8, flexWrap: "wrap" }}>
              {NOTE_TAGS.map(tag => (
                <button
                  key={tag.label}
                  onClick={() => setSelTag(tag)}
                  className="tag-pill"
                  style={{
                    background: selTag.label === tag.label ? `${tag.color}25` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${selTag.label === tag.label ? tag.color : "rgba(45,63,92,0.4)"}`,
                    borderRadius: 99,
                    padding: "3px 9px",
                    fontSize: 10,
                    cursor: "pointer",
                    color: selTag.label === tag.label ? tag.color : "#6f88a4",
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <span>{tag.emoji}</span>
                  <span>{tag.label}</span>
                </button>
              ))}
            </div>

            {rangeLabel() && (
              <div style={{
                fontSize: 10,
                color: theme.accentLight,
                fontFamily: "'DM Mono',monospace",
                marginBottom: 6,
                padding: "4px 8px",
                background: `${theme.accent}12`,
                borderRadius: 6,
                borderLeft: `2px solid ${theme.accent}`,
              }}>
                📅 Linked to: {rangeLabel()}
              </div>
            )}

            <div style={{
              background: "rgba(6,12,22,0.6)",
              borderRadius: 8,
              padding: "8px 10px",
              border: "1px solid rgba(45,63,92,0.4)",
              transition: "border-color 0.15s",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = `${theme.accent}80`)}
            onBlur={e  => (e.currentTarget.style.borderColor = "rgba(45,63,92,0.4)")}
            >
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAdd(); }}
                placeholder={rangeLabel()
                  ? `Add a note for ${rangeLabel()}…`
                  : `Jot something down for ${MONTH_NAMES[month]}…`}
                rows={2}
                style={{ fontSize: 12, lineHeight: 1.55, minHeight: 42, color: "#9eb3cb" }}
              />
            </div>

            <button
              onClick={handleAdd}
              disabled={!draft.trim()}
              style={{
                marginTop: 7,
                width: "100%",
                padding: "7px",
                background: draft.trim() ? theme.accent : "rgba(45,63,92,0.25)",
                color: draft.trim() ? "#0a0f1a" : "#587394",
                border: "none",
                borderRadius: 7,
                fontSize: 11,
                fontWeight: 700,
                cursor: draft.trim() ? "pointer" : "not-allowed",
                fontFamily: "'DM Sans',sans-serif",
                letterSpacing: "0.04em",
                transition: "background 0.2s, color 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              <span>+ Add Note</span>
              <span style={{ fontWeight: 400, opacity: 0.55, fontSize: 9 }}>⌘ ↵</span>
            </button>
          </div>

          <div style={{ maxHeight: 220, overflowY: "auto", padding: "8px 10px 12px" }}>
            {notes.length === 0 ? (
              <div style={{
                textAlign: "center",
                color: "#5f7896",
                fontSize: 11,
                padding: "18px 0",
                fontStyle: "italic",
                fontFamily: "'DM Sans',sans-serif",
              }}>
                No notes yet — select dates and jot one down ✦
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {dateNotes.map(n => (
                  <NoteCard key={n.id} note={n} onUpdate={onUpdateNote} onDelete={onDeleteNote} />
                ))}
                {generalNotes.length > 0 && dateNotes.length > 0 && (
                  <div style={{
                    fontSize: 9, color: "#526b88",
                    fontFamily: "'DM Mono',monospace",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "3px 0",
                  }}>
                    General
                  </div>
                )}
                {generalNotes.map(n => (
                  <NoteCard key={n.id} note={n} onUpdate={onUpdateNote} onDelete={onDeleteNote} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NoteCard({
  note, onUpdate, onDelete,
}: {
  note: Note;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(note.text);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  function handleBlur() {
    setEditing(false);
    draft.trim() ? onUpdate(note.id, draft.trim()) : onDelete(note.id);
  }

  return (
    <div
      className="slide-up"
      style={{
        background: "rgba(6,12,22,0.55)",
        border: "1px solid rgba(45,63,92,0.35)",
        borderLeft: `3px solid ${note.tagColor}`,
        borderRadius: 9,
        padding: "8px 10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 11 }}>{note.tagEmoji}</span>
          <span style={{
            fontSize: 9, fontFamily: "'DM Mono',monospace",
            color: note.tagColor, letterSpacing: "0.06em", fontWeight: 500,
          }}>
            {note.tag.toUpperCase()}
          </span>
          {note.dateKey && (
            <span style={{ fontSize: 9, color: "#6a84a2", fontFamily: "'DM Mono',monospace" }}>
              · {formatDisplayDate(note.dateKey)}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => setEditing(e => !e)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#5f7896", fontSize: 10, padding: "1px 4px",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#8fa0bc")}
            onMouseLeave={e => (e.currentTarget.style.color = "#5f7896")}
            title="Edit"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(note.id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#5f7896", fontSize: 13, lineHeight: 1, padding: "0 2px",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={e => (e.currentTarget.style.color = "#5f7896")}
            title="Delete"
          >
            ×
          </button>
        </div>
      </div>

      {editing ? (
        <textarea
          ref={ref}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={e => { if (e.key === "Escape") { setEditing(false); setDraft(note.text); } }}
          rows={2}
          style={{ fontSize: 12, lineHeight: 1.5, color: "#c8d8f0" }}
        />
      ) : (
        <p
          onClick={() => setEditing(true)}
          style={{
            margin: 0, fontSize: 12, color: "#89a2bc",
            lineHeight: 1.5, cursor: "text",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {note.text}
        </p>
      )}
    </div>
  );
}
