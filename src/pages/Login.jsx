import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../login.css"; // We'll define styles here

const POWERFLEET_API_URL = import.meta.env.VITE_POWERFLEET_API_URL;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const params = new URLSearchParams();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/brands");
        } else {
            setLoading(false);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        params.append("grant_type", "password");
        params.append("username", username);
        params.append("password", password);
        params.append("scope", "");
        params.append("client_id", "string");
        try {
            const res = await axios.post(
                `${POWERFLEET_API_URL}/login`, params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                }
        });
            console.log("Login success!");
            // guardar token en localStorage
            localStorage.setItem("token", res.data.access_token);
            navigate("/brands")
        } catch (err) {
            console.error("Login error:", err);
            alert("Credenciales inválidas")
        }
    };

    if (loading) {
        return (
            <div className="spinner-container">
            <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="user"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}
