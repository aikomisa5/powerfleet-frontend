import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../brands.css"; // We'll define styles here

import toyotaImg from "../assets/toyota.png";
import renaultImg from "../assets/renault.png";
import kiaImg from "../assets/kia.png";
import nissanImg from "../assets/nissan.png";
import dodgeImg from "../assets/dodge.png";
import fiatImg from "../assets/fiat.png";
import fordImg from "../assets/ford.png";
import fotonImg from "../assets/foton.png";
import hyundaiImg from "../assets/hyundai.png";
import ivecoImg from "../assets/iveco.png";
import mercedesImg from "../assets/mercedes.png";
import scaniaImg from "../assets/scania.png";
import volkswagenImg from "../assets/volkswagen.png";
import volvoImg from "../assets/volvo.png";

const POWERFLEET_API_URL = import.meta.env.VITE_POWERFLEET_API_URL;

const brandImages = {
    Renault: renaultImg,
    Toyota: toyotaImg,
    Kia: kiaImg,
    Nissan: nissanImg,
    Dodge: dodgeImg,
    Fiat: fiatImg,
    Ford: fordImg,
    Foton: fotonImg,
    Hyundai: hyundaiImg,
    Iveco: ivecoImg,
    Mercedes: mercedesImg,
    Scania: scaniaImg,
    Volkswagen: volkswagenImg,
    Volvo: volvoImg
};


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
        <div className="brands-wrapper">
            <div className="brands">
                <h2>Home</h2>
                <ul className="brand-list">
                    {brands.map((model) => (
                        <li key={model.id} className="brand-item">
                            <Link to={`/brands/${model.id}/cars`} className="brand-link">
                                <img
                                    src={brandImages[model.name]}
                                    alt={model.name}
                                    className="brand-image"
                                />
                            </Link>
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
}
