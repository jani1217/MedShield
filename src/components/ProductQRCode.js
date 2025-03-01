import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductQRCode = ({ productId }) => {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setQrCode(response.data.qr_code); // QR Code is stored in Base64
      } catch (error) {
        console.error("Error fetching QR Code:", error);
      }
    };

    if (productId) fetchQRCode();
  }, [productId]);

  return (
    <div>
      {qrCode ? (
        <img src={qrCode} alt="QR Code" width="200" height="200" />
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default ProductQRCode;
