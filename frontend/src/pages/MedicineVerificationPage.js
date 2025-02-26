import React, { useState } from "react";
import { Container, Typography, Button, Paper, Box } from "@mui/material";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const MedicineVerificationPage = () => {
  const [barcode, setBarcode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  // Mock Medicine Data
  const mockDatabase = {
    "123456789": {
      name: "Paracetamol",
      brand: "XYZ Pharma",
      status: "Authentic",
      productionDate: "2025-01-15",
      expiryDate: "2027-06-20",
      ingredients: "Paracetamol 500mg",
      purpose: "Pain relief, fever reduction",
      procedure: "Take 1 tablet every 6 hours after meals",
      premium: { reviews: "4.5/5 ⭐", blogs: "Top 5 uses of Paracetamol", cheapestStore: "MediStore - $5.99" }
    },
    "987654321": {
      name: "Fake Drug",
      brand: "Unknown",
      status: "Counterfeit",
      productionDate: "Unknown",
      expiryDate: "Unknown",
      ingredients: "Unknown",
      purpose: "Unknown",
      procedure: "Not safe to consume",
      premium: null
    }
  };

  const handleScan = (err, result) => {
    if (result) {
      setBarcode(result.text);
      setScanning(false);

      // Fetch medicine details
      const medicine = mockDatabase[result.text] || { name: "Unknown", status: "Unverified" };
      setVerificationResult(medicine);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h5">🩺 Medicine Verification</Typography>

      {scanning ? (
        <Box sx={{ mt: 3 }}>
          <BarcodeScannerComponent onUpdate={handleScan} />
          <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => setScanning(false)}>
            Stop Scanning
          </Button>
        </Box>
      ) : (
        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => setScanning(true)}>
          Scan Medicine QR/Barcode
        </Button>
      )}

      {barcode && verificationResult && (
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" color={verificationResult.status === "Authentic" ? "green" : "red"}>
            {verificationResult.name} ({verificationResult.status})
          </Typography>
          <Typography>📆 Production Date: {verificationResult.productionDate}</Typography>
          <Typography>⌛ Expiry Date: {verificationResult.expiryDate}</Typography>
          <Typography>🧪 Ingredients: {verificationResult.ingredients}</Typography>
          <Typography>🔍 Purpose: {verificationResult.purpose}</Typography>
          <Typography>📜 Procedure: {verificationResult.procedure}</Typography>

          {verificationResult.premium && (
            <Box sx={{ mt: 2, bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}>
              <Typography variant="h6">⭐ Premium Features</Typography>
              <Typography>📝 Reviews: {verificationResult.premium.reviews}</Typography>
              <Typography>📖 Related Blogs: {verificationResult.premium.blogs}</Typography>
              <Typography>💰 Cheapest Store: {verificationResult.premium.cheapestStore}</Typography>
            </Box>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default MedicineVerificationPage;
