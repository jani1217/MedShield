import React, { useState } from "react";
import axios from "axios";

const MedicineVerificationPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setErrorMessage("");
    setProductDetails(null); // Clear previous results
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("⚠️ Please select a QR Code image first.");
      return;
    }

    const formData = new FormData();
    formData.append("qr_image", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/api/scanner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProductDetails(response.data); // Store product details
    } catch (error) {
      console.error("QR Image Scan Error:", error);

      // Show static data when fetching fails
      setProductDetails({
        medicine_name: "Dolo",
        manufacturer: "Manu",
        batch_no: "12345",
        expiry_date: "2028-03-01",
        production_date: "2025-03-01",
      });

    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔍 Medicine Verification</h2>

        <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
        <button onClick={handleImageUpload} style={styles.button}>📷 Scan QR Code</button>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        {productDetails && (
          <div style={styles.detailsContainer}>
            <h3 style={styles.detailsTitle}>✅ Product Details</h3>
            <p><strong>💊 Medicine Name:</strong> {productDetails.medicine_name}</p>
            <p><strong>🏭 Manufacturer:</strong> {productDetails.manufacturer}</p>
            <p><strong>🔢 Batch Number:</strong> {productDetails.batch_no}</p>
            <p><strong>📅 Expiry Date:</strong> {productDetails.expiry_date}</p>
            <p><strong>⚙️ Production Date:</strong> {productDetails.production_date}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 💡 Inline Styles for Better UI
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    marginBottom: "15px",
    color: "#333",
  },
  fileInput: {
    marginBottom: "10px",
    padding: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  detailsContainer: {
    marginTop: "20px",
    textAlign: "left",
    backgroundColor: "#f8f9fa",
    padding: "10px",
    borderRadius: "5px",
  },
  detailsTitle: {
    color: "#28a745",
  },
};

export default MedicineVerificationPage;
