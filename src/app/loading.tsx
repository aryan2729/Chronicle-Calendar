export default function Loading() {
  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(150deg,#050a13 0%,#0a1220 100%)",
      gap: 16,
    }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "2px solid rgba(45,63,92,0.4)",
        borderTop: "2px solid #3a7bd5",
        animation: "spin 0.9s linear infinite",
      }} />
      <p style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.12em",
        color: "#1e2d45",
        textTransform: "uppercase",
        margin: 0,
      }}>
        Chronicle
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
