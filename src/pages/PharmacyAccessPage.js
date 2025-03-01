import React, { useState } from "react";
import { Container, Typography, Button, Paper, Box } from "@mui/material";

const PharmacyAccessPage = () => {
  const [prescription, setPrescription] = useState(null);

  const handleScanClick = () => {
    // Default prescription details
    const defaultPrescription = {
      patientName: "John Doe",
      age: 35,
      doctor: "Dr. Smith",
      medicines: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Amoxicillin", dosage: "250mg", frequency: "Three times a day" },
      ],
      instructions: "Take medicines after meals. Stay hydrated."
    };
    setPrescription(defaultPrescription);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Pharmacy Prescription Access
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleScanClick}>
            Scan QR Code
          </Button>
        </Box>

        {prescription && (
          <Paper elevation={2} sx={{ p: 2, mt: 2, textAlign: "left" }}>
            <Typography variant="h6">Prescription Details</Typography>
            <Typography><strong>Patient:</strong> {prescription.patientName} (Age: {prescription.age})</Typography>
            <Typography><strong>Doctor:</strong> {prescription.doctor}</Typography>
            <Typography><strong>Medicines:</strong></Typography>
            <ul>
              {prescription.medicines.map((med, index) => (
                <li key={index}>{med.name} - {med.dosage} ({med.frequency})</li>
              ))}
            </ul>
            <Typography><strong>Instructions:</strong> {prescription.instructions}</Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default PharmacyAccessPage;
