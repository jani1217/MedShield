import React, { useState } from "react";
import { Container, Typography, Button, Paper, Box, Input } from "@mui/material";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";

const MedicineVerificationPage = () => {
  const [barcode, setBarcode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const fetchProductDetails = async (barcode) => {
    try {
      const response = await axios.post("http://localhost:5000/api/verify", { barcode });
      setVerificationResult(response.data);
    } catch (error) {
      setVerificationResult({ name: "Unknown", status: "Unverified" });
      console.error("Error fetching product details:", error);
    }
  };

  const handleScan = (err, result) => {
    if (result) {
      setBarcode(result.text);
      setScanning(false);
      fetchProductDetails(result.text);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("qr_code", file);
    formData.append("aes_key", "thisisasecretkey");

    try {
      const response = await axios.post("http://localhost:5000/api/scanner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVerificationResult(response.data);
    } catch (error) {
      console.error("QR Image Scan Error:", error);
      if (error.response && error.response.status === 404) {
        setVerificationResult({ error: "Product not found" });
      } else {
        setVerificationResult({ error: "Error scanning QR code" });
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          🩺 Medicine Verification
        </Typography>

        {scanning ? (
          <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <BarcodeScannerComponent onUpdate={handleScan} />
            <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => setScanning(false)}>
              Stop Scanning
            </Button>
          </Box>
        ) : (
          <>
            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => setScanning(true)}>
              Scan QR/Barcode
            </Button>

            <Typography variant="h6" sx={{ mt: 3 }}>
              OR Upload QR Code Image
            </Typography>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </>
        )}

        {verificationResult && (
          <Paper elevation={3} sx={{ mt: 4, p: 3, textAlign: "left" }}>
            {verificationResult.error ? (
              <Typography color="error">{verificationResult.error}</Typography>
            ) : (
              <>
                <Typography variant="h6" sx={{ color: "green" }}>
                  ✅ {verificationResult.name} ({verificationResult.status})
                </Typography>
                <Typography>🏢 Brand: {verificationResult.brand || "Unknown"}</Typography>
                <Typography>📆 Production Date: {verificationResult.productionDate || "Unknown"}</Typography>
                <Typography>⌛ Expiry Date: {verificationResult.expiryDate || "Unknown"}</Typography>
                <Typography>🧪 Ingredients: {verificationResult.ingredients || "Unknown"}</Typography>
                <Typography>🔍 Purpose: {verificationResult.purpose || "Unknown"}</Typography>
                <Typography>📜 Procedure: {verificationResult.procedure || "Unknown"}</Typography>
              </>
            )}
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default MedicineVerificationPage;
