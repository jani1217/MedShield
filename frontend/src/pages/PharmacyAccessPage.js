import React, { useState } from "react";
import { Container, Typography, Button, TextField } from "@mui/material";
import QrScanner from "react-qr-scanner";

const PharmacyAccessPage = () => {
  const [userId, setUserId] = useState("");
  const [scanning, setScanning] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setUserId(data.text || data); // QR Scanner may return different formats
      setScanning(false); // Stop scanning after successful scan
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h5">Pharmacy Prescription Access</Typography>

      {/* User can enter ID manually */}
      <TextField
        label="Enter or Scan User ID"
        variant="outlined"
        fullWidth
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ margin: "20px 0" }}
      />

      <Button variant="contained" color="primary" onClick={() => setScanning(true)}>
        Scan QR Code
      </Button>

      {scanning && (
        <div style={{ marginTop: "20px" }}>
          <QrScanner
            delay={300}
            onScan={handleScan}
            onError={handleError}
            style={{ width: "100%" }}
          />
          <Button variant="contained" color="secondary" onClick={() => setScanning(false)}>
            Stop Scanning
          </Button>
        </div>
      )}

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={() => console.log("Retrieving prescription for User ID:", userId)}
      >
        Retrieve Prescription
      </Button>
    </Container>
  );
};

export default PharmacyAccessPage;
