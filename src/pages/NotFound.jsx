// components/NotFound.jsx
export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <a href="/login" style={{ color: "#007bff" }}>Go to Login</a>
    </div>
  );
}
