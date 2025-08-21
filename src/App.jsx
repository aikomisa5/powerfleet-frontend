import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Brands from "./pages/Brands";
import Cars from "./pages/Cars";
import Car from "./pages/Car";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/brands" element={<ProtectedRoute><Brands /></ProtectedRoute>} />
        <Route path="/brands/:brandId/cars" element={<ProtectedRoute><Cars /></ProtectedRoute>} />
        <Route path="/brands/:brandId/cars/:carId" element={<ProtectedRoute><Car /></ProtectedRoute>} />

        {/* Default redirect: if root, go to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
