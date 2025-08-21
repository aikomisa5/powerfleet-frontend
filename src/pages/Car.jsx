import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {pictures.map((pic) => (
                    <div key={pic.id} style={{ width: "300px", textAlign: "center" }}>
                        {pic.base64 ? (
                            <img
                                src={pic.base64}
                                alt={pic.description}
                                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                                onClick={() => {
                                    setSelectedImage(pic);
                                    setShowModal(true);
                                }}
                            />
                        ) : (
                            <p>Imagen no disponible</p>
                        )}
                        <p>{pic.description}</p>
                    </div>
                ))}
            </div>

            {showModal && selectedImage && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setShowModal(false)}
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "30px",
                            background: "transparent",
                            border: "none",
                            fontSize: "2rem",
                            color: "#fff",
                            cursor: "pointer"
                        }}
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>

                    {/* Image and Description */}
                    <div style={{ maxWidth: "90%", maxHeight: "90%", textAlign: "center" }}>
                        <img
                            src={selectedImage.base64}
                            alt={selectedImage.description}
                            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                        />
                        <p style={{ color: "#fff", marginTop: "1rem" }}>
                            {selectedImage.description}
                        </p>
                    </div>
                </div>
            )}


        </div>
    );
}
