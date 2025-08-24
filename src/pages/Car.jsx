import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "../car.css"; // We'll define styles here

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

            <h3>Fotos</h3>
<Swiper spaceBetween={10} slidesPerView={1}>
  {pictures.map((pic, index) => (
    <SwiperSlide key={pic.id}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          cursor: "pointer"
        }}
        onClick={() => {
          setSelectedImage(index);
          setShowModal(true);
        }}
      >
        <img
          src={pic.base64}
          alt={pic.description}
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
        />
        <p style={{ marginTop: "8px", fontSize: "14px", color: "#555", textAlign: "center" }}>
          {pic.description}
        </p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

        </div>
    );
}
