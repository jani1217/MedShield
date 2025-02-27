import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, Typography, TextField, MenuItem, Button, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const ReportFraudPage = () => {
  const { user } = useContext(AuthContext);
  const [reportData, setReportData] = useState({
    fraudType: "",
    medicineName: "",
    brand: "",
    batchNumber: "",
    description: "",
    proof: null,
  });

  const handleChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setReportData({ ...reportData, proof: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(reportData).forEach((key) => {
      formData.append(key, reportData[key]);
    });
    formData.append("userEmail", user.email);

    try {
      await axios.post("http://localhost:5000/api/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Fraud report submitted successfully!");
      setReportData({
        fraudType: "",
        medicineName: "",
        brand: "",
        batchNumber: "",
        description: "",
        proof: null,
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Report Fraud
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          select
          fullWidth
          label="Fraud Type"
          name="fraudType"
          value={reportData.fraudType}
          onChange={handleChange}
          required
          margin="normal"
        >
          <MenuItem value="Fake Medicine">Fake Medicine</MenuItem>
          <MenuItem value="Pharmacy Issue">Pharmacy Issue</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Medicine Name"
          name="medicineName"
          value={reportData.medicineName}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Brand"
          name="brand"
          value={reportData.brand}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Batch Number (if available)"
          name="batchNumber"
          value={reportData.batchNumber}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={reportData.description}
          onChange={handleChange}
          multiline
          rows={4}
          required
          margin="normal"
        />

        <Box sx={{ my: 2 }}>
          <Typography variant="body2">Upload Proof (optional)</Typography>
          <input type="file" onChange={handleFileChange} />
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Submit Report
        </Button>
      </form>
    </Container>
  );
};

export default ReportFraudPage;
