import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const POWERFLEET_API_URL = import.meta.env.VITE_POWERFLEET_API_URL;

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            navigate("/login");
            return;
        }

        axios.get(`${POWERFLEET_API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => setIsAuth(true))
            .catch(() => {
                localStorage.removeItem("token");
                setIsAuth(false);
                navigate("/login");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return isAuth ? children : <Navigate to="/login" />;
}
