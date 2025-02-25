import React, { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const MedicineVerificationPage = () => {
  const [barcode, setBarcode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const mockDatabase = {
    "123456789": { name: "Paracetamol", brand: "XYZ Pharma", status: "Authentic" },
    "987654321": { name: "Fake Drug", brand: "Unknown", status: "Counterfeit" },
  };

  const handleScan = (err, result) => {
    if (result) {
      setBarcode(result.text);
      setScanning(false);

      // Mock verification logic
      const medicine = mockDatabase[result.text] || { name: "Unknown", status: "Unverified" };
      setVerificationResult(medicine);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h5">Medicine Verification</Typography>

      {scanning ? (
        <div>
          <BarcodeScannerComponent onUpdate={handleScan} />
          <Button variant="contained" color="secondary" onClick={() => setScanning(false)}>
            Stop Scanning
          </Button>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={() => setScanning(true)}>
          Scan Medicine Barcode
        </Button>
      )}

      {barcode && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Scanned Barcode: {barcode}</Typography>
          {verificationResult && (
            <Typography variant="h6" color={verificationResult.status === "Authentic" ? "green" : "red"}>
              Medicine: {verificationResult.name} ({verificationResult.status})
            </Typography>
          )}
        </div>
      )}
    </Container>
  );
};

export default MedicineVerificationPage;
