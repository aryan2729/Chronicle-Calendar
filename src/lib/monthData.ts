export interface MonthTheme {
  name: string;
  image: string;
  imageAlt: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  tagline: string;
  season: string;
}

export const MONTH_THEMES: MonthTheme[] = [
  {
    name: "January",
    image: "jan.jpg",
    imageAlt: "Colorful kites in the sky during Makar Sankranti celebration in India",
    accent: "#3a7bd5", accentLight: "#6faaf8", accentDark: "#1e55aa",
    tagline: "Makar Sankranti skies full of bright kites",
    season: "🪁",
  },
  {
    name: "February",
    image: "feb.jpg",
    imageAlt: "Yellow marigold and festive decor for spring celebrations in India",
    accent: "#e05d8a", accentLight: "#f592b4", accentDark: "#b03060",
    tagline: "Spring prayers and festival colors begin",
    season: "🌸",
  },
  {
    name: "March",
    image: "march.jpg",
    imageAlt: "People celebrating Holi with vivid colors",
    accent: "#22c55e", accentLight: "#6ee89a", accentDark: "#15803d",
    tagline: "Holi splashes joy across every street",
    season: "🌿",
  },
  {
    name: "April",
    image: "april.jpg",
    imageAlt: "Baisakhi festival dance and celebration scene",
    accent: "#a855f7", accentLight: "#d08bf8", accentDark: "#7c3aed",
    tagline: "Baisakhi beats and new year celebrations",
    season: "🌷",
  },
  {
    name: "May",
    image: "may.jpg",
    imageAlt: "Temple lights and peaceful evening ambiance in India",
    accent: "#f59e0b", accentLight: "#fcd34d", accentDark: "#d97706",
    tagline: "Sacred evenings under golden temple lights",
    season: "☀️",
  },
  {
    name: "June",
    image: "june.jpg",
    imageAlt: "Rath Yatra procession with decorated chariots",
    accent: "#06b6d4", accentLight: "#56d4f0", accentDark: "#0891b2",
    tagline: "Rath Yatra processions and monsoon devotion",
    season: "🌊",
  },
  {
    name: "July",
    image: "july.jpg",
    imageAlt: "Lit diyas and devotional setup for Guru Purnima",
    accent: "#ef4444", accentLight: "#fca5a5", accentDark: "#dc2626",
    tagline: "Monsoon calm and Guru Purnima prayers",
    season: "🎆",
  },
  {
    name: "August",
    image: "aug.jpg",
    imageAlt: "Janmashtami celebration with festive decorations",
    accent: "#84cc16", accentLight: "#bef264", accentDark: "#65a30d",
    tagline: "Janmashtami spirit and tricolor pride",
    season: "⛰️",
  },
  {
    name: "September",
    image: "sept.jpg",
    imageAlt: "Ganesh Chaturthi idol and festive lights",
    accent: "#f97316", accentLight: "#fdba74", accentDark: "#ea580c",
    tagline: "Ganesh Chaturthi brings devotion and color",
    season: "🍂",
  },
  {
    name: "October",
    image: "oct.jpg",
    imageAlt: "Durga Puja and Navratri celebration lights and decorations",
    accent: "#d97706", accentLight: "#fbbf24", accentDark: "#92400e",
    tagline: "Navratri nights and Durga Puja energy",
    season: "🎃",
  },
  {
    name: "November",
    image: "nov.jpg",
    imageAlt: "Diwali diyas and warm festive lights",
    accent: "#94a3b8", accentLight: "#cbd5e1", accentDark: "#475569",
    tagline: "Diwali nights glow with lamps and joy",
    season: "🍁",
  },
  {
    name: "December",
    image: "dec.jpg",
    imageAlt: "Festive Christmas lights and decorations in India",
    accent: "#60a5fa", accentLight: "#93c5fd", accentDark: "#2563eb",
    tagline: "Year-end lights and winter celebrations",
    season: "✨",
  },
];

export const HOLIDAYS: Record<string, string> = {
  "2025-01-01": "New Year's Day 🎊",
  "2025-01-14": "Makar Sankranti 🪁",
  "2025-01-26": "Republic Day 🇮🇳",
  "2025-02-14": "Valentine's Day 💝",
  "2025-03-17": "Holi 🎨",
  "2025-04-14": "Dr. Ambedkar Jayanti",
  "2025-04-18": "Good Friday ✝️",
  "2025-05-12": "Mother's Day 💐",
  "2025-06-15": "Father's Day 👨",
  "2025-08-15": "Independence Day 🇮🇳",
  "2025-10-02": "Gandhi Jayanti 🕊️",
  "2025-10-20": "Dussehra",
  "2025-10-31": "Halloween 🎃",
  "2025-11-05": "Diwali 🪔",
  "2025-12-25": "Christmas Day 🎄",
  "2025-12-31": "New Year's Eve 🥂",
  "2026-01-01": "New Year's Day 🎊",
  "2026-01-26": "Republic Day 🇮🇳",
  "2026-02-14": "Valentine's Day 💝",
  "2026-03-09": "Holi 🎨",
  "2026-04-03": "Good Friday ✝️",
  "2026-08-15": "Independence Day 🇮🇳",
  "2026-10-02": "Gandhi Jayanti 🕊️",
  "2026-12-25": "Christmas Day 🎄",
};

export const NOTE_TAGS = [
  { label: "Work",     color: "#3a7bd5", emoji: "💼" },
  { label: "Personal", color: "#22c55e", emoji: "🌿" },
  { label: "Travel",   color: "#f59e0b", emoji: "✈️" },
  { label: "Health",   color: "#e05d8a", emoji: "❤️" },
  { label: "Event",    color: "#a855f7", emoji: "🎉" },
  { label: "Reminder", color: "#ef4444", emoji: "🔔" },
];
