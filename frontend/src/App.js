import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UploadPrescriptionPage from "./pages/PrescriptionUploadPage";
import PharmacyAccessPage from "./pages/PharmacyAccessPage";
import MedicineVerificationPage from "./pages/MedicineVerificationPage";
import Navbar from "./components/Navbar";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/upload-prescription" element={<ProtectedRoute><UploadPrescriptionPage /></ProtectedRoute>} />
        <Route path="/pharmacy-access" element={<ProtectedRoute><PharmacyAccessPage /></ProtectedRoute>} />
        <Route path="/medicine-verification" element={<ProtectedRoute><MedicineVerificationPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
