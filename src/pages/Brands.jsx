import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const POWERFLEET_API_URL = import.meta.env.VITE_POWERFLEET_API_URL;

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${POWERFLEET_API_URL}/brands`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setBrands(res.data);
            } catch (err) {
                let msg = "Error cargando las marcas de los autos"
                console.error(msg, err);
                alert(msg)
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
            <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            <h2>Powerfleet</h2>
            <ul>
                {brands.map((model) => (
                    <li key={model.id}>
                        <Link to={`/brands/${model.id}/cars`}>{model.name}</Link>
                    </li>

                ))}
            </ul>
        </div>
    );
}
