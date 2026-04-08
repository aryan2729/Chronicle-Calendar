"use client";

export default function Error({ reset }: { reset: () => void }) {
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
      <p style={{ fontSize: 32, margin: 0 }}>📅</p>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.2rem,4vw,1.8rem)",
        fontWeight: 700,
        color: "#9db4cc",
        margin: 0,
      }}>
        Something went wrong
      </h2>
      <p style={{ color: "#2d3f5c", fontSize: 14, margin: 0 }}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          background: "#3a7bd5",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.04em",
        }}
      >
        Try again
      </button>
    </div>
  );
}
