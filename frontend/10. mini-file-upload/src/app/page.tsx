export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "2rem"
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Welcome to file upload
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        A simple, beautiful homepage .
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#fff",
            color: "#f5576c",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
           <a href="/upload"> Get Started</a>
        </div>
        <div
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "rgba(255,255,255,0.3)",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Learn More
        </div>
      </div>
    </div>
  );
}
