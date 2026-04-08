import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(150deg,#050a13 0%,#0a1220 100%)",
      gap: 20,
      fontFamily: "'DM Sans', sans-serif",
      padding: 24,
      textAlign: "center",
    }}>
      <p style={{ fontSize: 40, margin: 0 }}>🗓️</p>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.4rem,4vw,2rem)",
        fontWeight: 900,
        color: "#9db4cc",
        margin: 0,
      }}>
        404 — Date Not Found
      </h2>
      <p style={{ color: "#2d3f5c", fontSize: 13, margin: 0 }}>
        This page doesn&apos;t exist on any calendar.
      </p>
      <Link href="/" style={{
        background: "#3a7bd5",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "10px 24px",
        fontSize: 13,
        fontWeight: 600,
        textDecoration: "none",
        letterSpacing: "0.04em",
      }}>
        Back to Calendar
      </Link>
    </div>
  );
}
