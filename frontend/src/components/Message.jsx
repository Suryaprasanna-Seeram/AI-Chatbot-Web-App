export default function Message({ role, text }) {
  return (
    <div style={{ textAlign: role === "user" ? "right" : "left", margin: "8px" }}>
      <div style={{ display: "inline-block", padding: "10px", background: role === "user" ? "#4caf50" : "#333", color: "#fff", borderRadius: "10px" }}>
        {text}
      </div>
    </div>
  );
}
