import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chronicle — Interactive Wall Calendar",
  description: "A polished, interactive wall calendar with date range selection, notes, and month themes. Built with Next.js, TypeScript & Tailwind CSS.",
  keywords: ["calendar", "interactive", "wall calendar", "date picker", "notes"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1220",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
