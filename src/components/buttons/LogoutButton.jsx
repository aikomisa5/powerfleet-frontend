function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // simple redirect
  };

  return <button onClick={handleLogout}>Logout</button>;
}
