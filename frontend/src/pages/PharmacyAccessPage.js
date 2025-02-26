import React, { useState } from "react";
import { Container, Typography, Button, TextField, Paper, Box } from "@mui/material";
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
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Pharmacy Prescription Access
        </Typography>

        {/* Input Field */}
        <TextField
          label="Enter or Scan User ID"
          variant="outlined"
          fullWidth
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{ my: 2 }}
        />

        {/* Buttons Section */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={() => setScanning(true)}>
            Scan QR Code
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={!userId}
            onClick={() => console.log("Retrieving prescription for User ID:", userId)}
          >
            Retrieve Prescription
          </Button>
        </Box>

        {/* QR Scanner Section */}
        {scanning && (
          <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
            <QrScanner delay={300} onScan={handleScan} onError={handleError} style={{ width: "100%" }} />
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => setScanning(false)}
            >
              Stop Scanning
            </Button>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default PharmacyAccessPage;
