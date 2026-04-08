export interface Note {
  id: string;
  dateKey: string | null;  // null = general month note
  text: string;
  tag: string;
  tagColor: string;
  tagEmoji: string;
  createdAt: number;
}

export interface CalendarState {
  year: number;
  month: number;
  rangeStart: string | null;
  rangeEnd: string | null;
  isSelecting: boolean;
  hoverDate: string | null;
  notes: Note[];
  view: "month" | "year";
  animDirection: "next" | "prev";
}

export type CalendarAction =
  | { type: "NAVIGATE"; direction: "next" | "prev" }
  | { type: "JUMP_TO_MONTH"; year: number; month: number }
  | { type: "SELECT_DATE"; dateKey: string }
  | { type: "HOVER_DATE"; dateKey: string | null }
  | { type: "CLEAR_RANGE" }
  | { type: "ADD_NOTE"; note: Omit<Note, "id" | "createdAt"> }
  | { type: "UPDATE_NOTE"; id: string; text: string }
  | { type: "DELETE_NOTE"; id: string }
  | { type: "SET_VIEW"; view: "month" | "year" };
