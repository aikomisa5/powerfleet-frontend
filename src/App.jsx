import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Brands from "./pages/Brands";
import Cars from "./pages/Cars";
import Car from "./pages/Car";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import HeaderBanner from './components/HeaderBanner';

const POWERFLEET_API_URL = import.meta.env.VITE_POWERFLEET_API_URL;

function App() {
  useEffect(() => {
    console.log("GET Hello about to be executed...");
    const interval = setInterval(() => {
      fetch(`${POWERFLEET_API_URL}/hello`)
      .then(() => console.log("GET Hello successful"))
      .catch((err) => console.error("GET Hello failed", err))
    }, 600000); // cada 10 minutos

    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);

  return (
    <BrowserRouter>
    <HeaderBanner /> {/* This will show on all pages */}
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/brands" element={<ProtectedRoute><Brands /></ProtectedRoute>} />
        <Route path="/brands/:brandId/cars" element={<ProtectedRoute><Cars /></ProtectedRoute>} />
        <Route path="/brands/:brandId/cars/:carId" element={<ProtectedRoute><Car /></ProtectedRoute>} />

        {/* Default redirect: if root, go to login */}
        <Route path="/" element={<Login to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
