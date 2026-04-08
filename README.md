# Chronicle Calendar

**Live Website:** [Open Chronicle Calendar](https://your-live-website-url.com)

A cinematic, festival themed, interactive wall calendar built with Next.js, React, and TypeScript.

Chronicle is designed to feel like a premium wall planner:
- dynamic month themes with photo + accent glow
- date range selection with hover preview
- contextual notes panel tied to selected dates
- month shortcuts, year controls, and year overview

---

## Table of Contents

- [Overview](#overview)
- [Current Feature Set](#current-feature-set)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [State Model and Data Flow](#state-model-and-data-flow)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [How to Use the Calendar](#how-to-use-the-calendar)
- [Customization Guide](#customization-guide)
- [Known Limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)
- [Scripts](#scripts)
- [Deployment Notes](#deployment-notes)

---

## Overview

Chronicle renders a full-screen monthly calendar experience with:
- a left hero panel (festival image, month branding, selected range badge)
- a right interactive calendar surface (navigation + grid + optional notes)
- dark, high-contrast styling and subtle glow animations

The app is fully client-side and keeps all notes in memory (no backend/database).

---

## Current Feature Set

### Calendar Navigation

- Previous/next month navigation
- Today jump button
- Month shortcut strip with all 12 months
- Year step controls (`‹ year ›`)
- Year overview mode (mini-month grid) with quick month jump

### Selection + Interaction

- Click date once: starts range selection
- Hover while selecting: live preview range
- Click second date: completes range
- Click same selected day again: clears selection
- Keyboard shortcuts:
  - `ArrowLeft` / `ArrowUp`: previous month
  - `ArrowRight` / `ArrowDown`: next month
  - `Escape`: clear range

### Notes Workflow

- Notes panel appears only after date interaction
- Notes can be tagged (`Work`, `Personal`, `Travel`, `Health`, `Event`, `Reminder`)
- Notes can be:
  - linked to selected date/range
  - general (month-level)
- Inline edit and delete support
- Collapsible notes panel with count badge

### Visual/Theming System

- 12 month themes defined in `monthData.ts`
- Month-specific:
  - image
  - accent/accentLight/accentDark colors
  - tagline
  - emoji marker
- Festival-oriented month curation (India-focused theme intent)
- Animated glowing card outline
- Range status strip and legend footer

### Date Intelligence

- Monday-first calendar layout
- Proper spillover cells for previous/next month days
- Holiday markers from `HOLIDAYS` lookup
- Date utility helpers for range boundaries and formatting

---

## Tech Stack

- **Framework:** Next.js `16.2.2` (App Router)
- **Runtime UI:** React `19.2.4`
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind v4 + custom CSS + dynamic inline styles
- **State Management:** React `useReducer` + local component state
- **Linting:** ESLint + `eslint-config-next`

---

## Architecture

### App entry

- `src/app/page.tsx` renders `<Calendar />` directly.
- `src/app/layout.tsx` provides metadata, viewport config, and font preconnect/style links.

### Core UI components

- `Calendar.tsx`
  - top-level orchestrator
  - dispatches reducer actions
  - manages view mode (`month`/`year`) and notes visibility UX
  - controls responsive shell and animation keys

- `CalendarGrid.tsx`
  - builds 42 grid cells (6 weeks)
  - paints range background segments
  - marks today/holiday/note indicators
  - emits date select + hover events

- `HeroPanel.tsx`
  - loads themed image
  - applies overlays, tint, and branding
  - renders selected range badge and month heading

- `YearView.tsx`
  - compact 12-month overview
  - month click jumps back to month view
  - includes year prev/next controls

- `NotesPanel.tsx`
  - compose UI + tags
  - contextual date-linked note creation
  - note list rendering and inline edit/delete

### Data and logic modules

- `calendarReducer.ts`
  - single source of truth for calendar transitions
  - handles navigation, selection, notes CRUD, and view changes

- `calendarUtils.ts`
  - pure date helpers:
    - month lengths
    - first weekday
    - key formatting/parsing
    - range calculations

- `monthData.ts`
  - static thematic metadata and holiday/tag constants

- `types/calendar.ts`
  - all shared TypeScript interfaces and action unions

---

## State Model and Data Flow

Primary state (reducer-managed):
- `year`, `month`
- `rangeStart`, `rangeEnd`
- `hoverDate`, `isSelecting`
- `notes`
- `view` (`month` | `year`)
- `animDirection`

Local UI state (component-managed):
- `animKey`, `animClass` (page transitions)
- `showNotesPanel` (contextual notes UX)

Flow example:
1. user clicks day in `CalendarGrid`
2. `onSelectDate` calls handler in `Calendar.tsx`
3. handler dispatches reducer `SELECT_DATE`
4. derived state updates range + notes panel visibility
5. `HeroPanel`, `CalendarGrid`, and `NotesPanel` re-render from new state

---

## Folder Structure

```text
calendar-app/
├── public/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Calendar.tsx
│   │   ├── CalendarGrid.tsx
│   │   ├── HeroPanel.tsx
│   │   ├── NotesPanel.tsx
│   │   ├── SpiralBinding.tsx
│   │   └── YearView.tsx
│   ├── lib/
│   │   ├── calendarReducer.ts
│   │   ├── calendarUtils.ts
│   │   └── monthData.ts
│   └── types/
│       └── calendar.ts
├── package.json
└── README.md
```

Note: `SpiralBinding.tsx` exists but the spiral strip is not currently rendered in `Calendar.tsx`.

---

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm (or compatible package manager)

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

---

## How to Use the Calendar

### Navigate quickly

- Use top arrows for month navigation.
- Use month shortcut strip for direct month jump.
- Use year control near top for changing year.
- Click month title to toggle year overview.

### Select date/range

- Click any date to start.
- Click another date to complete range.
- Click same selected single day again to clear.
- Press `Escape` anytime to clear range.

### Add notes

- Notes area appears after date interaction.
- Pick a tag.
- Type text.
- Click `+ Add Note` or use `Ctrl/Cmd + Enter`.

---

## Customization Guide

### 1) Update month themes

Edit `src/lib/monthData.ts`:
- `image`
- `imageAlt`
- `accent`, `accentLight`, `accentDark`
- `tagline`
- `season`

### 2) Add holidays

In `HOLIDAYS` (`monthData.ts`), use:
- key format: `YYYY-MM-DD`
- value format: display label (emoji optional)

### 3) Add/edit note tags

In `NOTE_TAGS` (`monthData.ts`), update:
- `label`
- `color`
- `emoji`

### 4) Tweak visuals

- `src/app/globals.css`: keyframes, shared motion/interaction
- `src/components/Calendar.tsx`: shell layout, glow, responsive sizing
- `src/components/HeroPanel.tsx`: image treatment and overlays

---

## Known Limitations

- Notes are in-memory only; refresh clears state.
- Hero images depend on external image host availability.
- No authentication, sync, or multi-user support.
- No timezone-specific holiday engine (static holiday map).

---

## Troubleshooting

### Images not loading

- Check internet connectivity.
- Verify `image` URLs in `monthData.ts`.
- Replace unavailable external URLs with stable hosts or local `public/` assets.

### Text contrast too low

- Adjust colors in:
  - `Calendar.tsx` (footer/labels)
  - `NotesPanel.tsx` (notes/controls)
  - `globals.css` (placeholder/utility tones)

### Layout clipping on smaller screens

- Tune `.calendar-card` height rules in `Calendar.tsx` style block.
- Ensure right panel uses `minHeight: 0` and controlled overflow.

### Lint warnings about `img`

- Current build intentionally uses native `<img>` for visual hero handling.
- You can migrate to `next/image` if you want optimization + remote config.

---

## Scripts

From `package.json`:

- `npm run dev` - start Next.js dev server
- `npm run build` - build production bundle
- `npm run start` - run production server
- `npm run lint` - run ESLint

---

## Deployment Notes

Use the Live Website link above for direct access.
