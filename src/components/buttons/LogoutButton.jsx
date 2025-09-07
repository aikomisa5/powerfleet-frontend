import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // SPA navigation
  };

  return <button onClick={handleLogout}>Cerrar Sesión</button>;
}

export default LogoutButton;