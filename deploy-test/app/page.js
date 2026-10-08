export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#093B23",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: 16,
      }}
    >
      <div>
        <h1 style={{ fontSize: 40, margin: "0 0 8px" }}>Pitch pipeline test</h1>
        <p style={{ fontSize: 20, margin: 0, opacity: 0.85 }}>Deployed from the cloud, no Mac needed.</p>
      </div>
    </main>
  );
}
