import { CalendarState, CalendarAction, Note } from "@/types/calendar";

function uid(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

export const initialState: CalendarState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  rangeStart: null,
  rangeEnd: null,
  isSelecting: false,
  hoverDate: null,
  notes: [],
  view: "month",
  animDirection: "next",
};

export function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case "NAVIGATE": {
      const delta = action.direction === "next" ? 1 : -1;
      let m = state.month + delta;
      let y = state.year;
      if (m > 11) { m = 0;  y++; }
      if (m < 0)  { m = 11; y--; }
      return { ...state, month: m, year: y, animDirection: action.direction };
    }

    case "JUMP_TO_MONTH":
      return { ...state, month: action.month, year: action.year, view: "month" };

    case "SELECT_DATE": {
      const { dateKey } = action;
      if (!state.rangeStart || (state.rangeStart && state.rangeEnd)) {
        return { ...state, rangeStart: dateKey, rangeEnd: null, isSelecting: true };
      }
      if (dateKey === state.rangeStart) {
        return { ...state, rangeEnd: dateKey, isSelecting: false };
      }
      return { ...state, rangeEnd: dateKey, isSelecting: false };
    }

    case "HOVER_DATE":
      return { ...state, hoverDate: action.dateKey };

    case "CLEAR_RANGE":
      return { ...state, rangeStart: null, rangeEnd: null, isSelecting: false, hoverDate: null };

    case "ADD_NOTE": {
      const note: Note = { ...action.note, id: uid(), createdAt: Date.now() };
      return { ...state, notes: [note, ...state.notes] };
    }

    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map(n => n.id === action.id ? { ...n, text: action.text } : n),
      };

    case "DELETE_NOTE":
      return { ...state, notes: state.notes.filter(n => n.id !== action.id) };

    case "SET_VIEW":
      return { ...state, view: action.view };

    default:
      return state;
  }
}
