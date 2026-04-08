"use client";

interface Props { count?: number; }

export function SpiralBinding({ count = 20 }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        padding: "10px 24px",
        background: "linear-gradient(180deg,#1e2d45 0%,#162032 100%)",
        borderBottom: "1px solid rgba(45,63,92,0.45)",
        userSelect: "none",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ position: "relative", width: 16, height: 26, flexShrink: 0 }}>
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: 16, height: 13,
            borderRadius: "8px 8px 0 0",
            background: "linear-gradient(180deg,#7c8a9a 0%,#4e5a68 100%)",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.35)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: 16, height: 15,
            borderRadius: "0 0 8px 8px",
            background: "linear-gradient(180deg,#c8cfd8 0%,#8e98a6 100%)",
            boxShadow: "inset 0 -1px 3px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.35)",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 6, height: 6, borderRadius: "50%",
            background: "#0a0f1a",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.7)",
            zIndex: 2,
          }} />
        </div>
      ))}
    </div>
  );
}
