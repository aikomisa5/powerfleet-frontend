import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../car.css"; // We'll define styles here
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import FullscreenModal from "../components/gallery/FullScreenModal";
import Gallery from "../components/gallery/Gallery";



const POWERFLEET_API_URL = import.meta.env.VITE_POWERFLEET_API_URL;

export default function Car() {
    const navigate = useNavigate();
    const { brandId, carId } = useParams();
    const [pictures, setPictures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);


    // Helper to fetch image and convert to base64
    const fetchImageAsBase64 = async (url, token) => {
        try {
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "blob"
            });

            return await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(res.data);
            });
        } catch (err) {
            console.error("Error fetching image", err);
            return null;
        }
    };

    useEffect(() => {
        const fetchCarAndPictures = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                // Fetch picture metadata
                const picsRes = await axios.get(
                    `${POWERFLEET_API_URL}/brands/${brandId}/cars/${carId}/pictures`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                // Fetch each image and convert to base64
                const picsWithBase64 = await Promise.all(
                    picsRes.data.map(async (pic) => {
                        const imageUrl = `${POWERFLEET_API_URL}/brands/${brandId}/cars/${carId}/pictures/${pic.id}`;
                        const base64 = await fetchImageAsBase64(imageUrl, token);
                        return { ...pic, base64 };
                    })
                );

                setPictures(picsWithBase64);
            } catch (err) {
                if (err.response?.status === 401) {
                    alert("Sesión expirada. Redirigiendo al login...");
                    navigate("/login");
                } else {
                    console.error("Error loading car or pictures", err);
                    alert("Error cargando los datos del auto");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCarAndPictures();
    }, [brandId, carId, navigate]);

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

                <LogoutButton /> {/* Botón de cerrar sesión */}
            </div>

            <div>
                <Gallery pictures={pictures} onSelect={(pic) => setSelectedImage(pic)} />

                {selectedImage && (
                    <FullscreenModal
                        image={selectedImage}
                        onClose={() => setSelectedImage(null)}
                    />
                )}

            </div>
        </>
    );
}
