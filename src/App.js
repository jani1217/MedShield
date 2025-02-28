import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UploadPrescriptionPage from "./pages/PrescriptionUploadPage";
import PharmacyAccessPage from "./pages/PharmacyAccessPage";
import MedicineVerificationPage from "./pages/MedicineVerificationPage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage"; 
import MyPrescriptionPage from "./pages/MyPrescriptionPage";
import ReportFraudPage from "./pages/ReportFraudPage";
import BestStoresPage from "./pages/BestStoresPage";
import PurchaseRegister from "./pages/PurchaseReg";
import StockRegister from "./pages/Stock";
import ProductTable from "./pages/val_com";
import LicenseForm from "./pages/LicenseForm";
import ComplaintTable from "./pages/vi_comp";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignupPage />} />  
        <Route path="/upload-prescription" element={<ProtectedRoute><UploadPrescriptionPage /></ProtectedRoute>} />
        <Route path="/pharmacy-access" element={<ProtectedRoute><PharmacyAccessPage /></ProtectedRoute>} />
        <Route path="/medicine-verification" element={<ProtectedRoute><MedicineVerificationPage /></ProtectedRoute>} />
        <Route path="/my-prescriptions" element={<ProtectedRoute><MyPrescriptionPage /></ProtectedRoute>} />
        <Route path="/report-fraud" element={<ProtectedRoute><ReportFraudPage /></ProtectedRoute>} />
        <Route path="/best-stores" element={<ProtectedRoute><BestStoresPage /></ProtectedRoute>} />
        <Route path="/purchase-register" element={<ProtectedRoute><PurchaseRegister /></ProtectedRoute>} />
        <Route path="/stock-register" element={<ProtectedRoute><StockRegister /></ProtectedRoute>} />
        <Route path="/validate-complaints" element={<ProductTable />} /> 
        <Route path="/issue-licenses" element={<LicenseForm />} />
        <Route path="/view-complaints" element={<ComplaintTable />} /> 
      </Routes>
    </Router>
  );
};

export default App;
