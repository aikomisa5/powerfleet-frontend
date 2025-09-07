// components/NotFound.jsx
export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "2rem", color: "#00594c" }}>
      <h1>404 - Page Not Found</h1>
      <p>La página que buscas no existe o fue movida</p>
      <a href="/login" style={{ color: "#3077b1ff" }}>Ir al Login</a>
    </div>
  );
}
