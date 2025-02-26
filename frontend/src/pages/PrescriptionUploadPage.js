import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Typography, Button } from "@mui/material";
import axios from "axios";

const PrescriptionUploadPage = () => {
  const [file, setFile] = useState(null);
  const [hashId, setHashId] = useState("");
  const [uploadStatus, setUploadStatus] = useState(""); // To show success/error messages
  const { user } = useContext(AuthContext); // Get user data from AuthContext

  const generateHashId = () => {
    return "PRESC-" + Math.random().toString(36).substring(2, 12);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setHashId(generateHashId());
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("hashId", hashId);
    
    try {
      const response = await axios.post("http://localhost:5000/api/prescriptions/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`, // Pass token for authentication
        },
      });

      setUploadStatus(`Upload successful! Prescription ID: ${response.data.prescriptionId}`);
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      console.error("Error uploading prescription:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h5">Upload Prescription</Typography>
      
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        style={{ marginTop: "20px" }}
        onChange={handleFileChange}
      />

      {file && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Selected File: {file.name}</Typography>
          <Typography variant="h6" color="blue">Generated Hash ID: {hashId}</Typography>
          <Button variant="contained" color="primary" onClick={handleUpload} style={{ marginTop: "10px" }}>
            Upload Prescription
          </Button>
        </div>
      )}

      {uploadStatus && (
        <Typography variant="h6" color={uploadStatus.includes("failed") ? "red" : "green"} style={{ marginTop: "20px" }}>
          {uploadStatus}
        </Typography>
      )}
    </Container>
  );
};

export default PrescriptionUploadPage;
