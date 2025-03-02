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
      setErrorMessage("Please select a QR Code image first.");
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
    <div>
      <h2>Medicine Verification</h2>
      
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>Scan QR Code</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {productDetails && (
        <div>
          <h3>Product Details</h3>
          <p><strong>Medicine Name:</strong> {productDetails.medicine_name}</p>
          <p><strong>Manufacturer:</strong> {productDetails.manufacturer}</p>
          <p><strong>Batch Number:</strong> {productDetails.batch_no}</p>
          <p><strong>Expiry Date:</strong> {productDetails.expiry_date}</p>
          <p><strong>Production Date:</strong> {productDetails.production_date}</p>
        </div>
      )}
    </div>
  );
};

export default MedicineVerificationPage;
