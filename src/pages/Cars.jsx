import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../cars.css"; // We'll define styles here
import renaultImg from "../assets/renault.png";
import toyotaImg from "../assets/toyota.png";
import LogoutButton from "../components/buttons/LogoutButton";

const POWERFLEET_API_URL = import.meta.env.VITE_POWERFLEET_API_URL;

const brandImages = {
    Renault: renaultImg,
    Toyota: toyotaImg,
};


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
        <>
            <div className="header-row" >
                <button onClick={() => navigate(-1)} className="back-button">
                    ← Volver
                </button>

            </div>

            <div className="brands-wrapper">
                <div className="brands">
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
            </div>
        </>
    );
}
