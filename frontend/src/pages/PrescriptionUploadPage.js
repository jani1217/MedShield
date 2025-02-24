import React, { useState } from "react";
import { Container, Typography, Button, TextField } from "@mui/material";

const PrescriptionUploadPage = () => {
  const [file, setFile] = useState(null);
  const [hashId, setHashId] = useState("");

  const generateHashId = () => {
    return "PRESC-" + Math.random().toString(36).substring(2, 12);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setHashId(generateHashId());
  };

  const handleUpload = () => {
    if (file) {
      alert(`Prescription uploaded successfully! Hash ID: ${hashId}`);
      // TODO: Send file to backend
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
    </Container>
  );
};

export default PrescriptionUploadPage;
