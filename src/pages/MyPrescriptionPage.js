import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, Grid, Divider } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const MyPrescriptionPage = () => {
  const { user } = useContext(AuthContext);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/prescriptions/${user.email}`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [user.email]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        My Prescriptions
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription) => {
            const isExpired = new Date(prescription.expiryDate) < new Date();
            return (
              <Grid item xs={12} key={prescription._id}>
                <Card sx={{ background: isExpired ? "#f5f5f5" : "#fff", opacity: isExpired ? 0.6 : 1 }}>
                  <CardContent>
                    <Typography variant="h6">{prescription.medicineName}</Typography>
                    <Typography variant="body2">Dosage: {prescription.dosage}</Typography>
                    <Typography variant="body2">Date Issued: {new Date(prescription.issuedDate).toLocaleDateString()}</Typography>
                    <Typography variant="body2" color={isExpired ? "error" : "textPrimary"}>
                      {isExpired ? "Expired" : "Valid"}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">
                      <strong>Prescribed by:</strong> {prescription.doctorName} ({prescription.doctorContact})
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography>No prescriptions found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default MyPrescriptionPage;
