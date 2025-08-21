import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const POWERFLEET_API_URL = import.meta.env.VITE_POWERFLEET_API_URL;

export default function Cars() {
    const navigate = useNavigate();
    const { brandId } = useParams();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${POWERFLEET_API_URL}/brands/${brandId}/cars`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setCars(res.data);
            } catch (err) {
                console.error("Error cargando los autos", err);
                alert("Error cargando los autos");
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, [brandId]);

    if (loading) {
        return (
            <div className="spinner-container">
            <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: "1rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "1rem"
                }}
            >
                ← Volver
            </button>

            <h2>Autos</h2>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        <Link to={`/brands/${brandId}/cars/${car.id}`}>
                            {car.model}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
