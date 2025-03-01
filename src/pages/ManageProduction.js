import React, { useState } from "react";
import { Container, Typography, TextField, Button, Paper, Box } from "@mui/material";
import axios from "axios";

const ManageProduction = () => {
  const [prodName, setProdName] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");
  const [qty] = useState(10); // Default Quantity (Disabled)
  const [manufactureDate] = useState(new Date().toISOString().split("T")[0]); // Current Date (Disabled)
  const [expiryDate] = useState(() => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 3); // Expiry Date: 3 Years from Manufacture Date
    return date.toISOString().split("T")[0];
  });

  const [message, setMessage] = useState("");

  // Submit the product details
  const handleSubmit = () => {
    if (!prodName || !manufacturerName) {
      setMessage("Please enter product name and manufacturer name.");
      return;
    }

    if (prodName.length < 3 || manufacturerName.length < 3) {
      setMessage("Product name and manufacturer name must be at least 3 characters long.");
      return;
    }

    axios.post("http://localhost:5000/api/products/add-product", {
        prod_name: prodName,
        producer_name: manufacturerName,
        qty,
        manufacture_date: manufactureDate,
        expiry_date: expiryDate,
      })
      .then((response) => {
        setMessage(response.data.message);
        setProdName("");
        setManufacturerName("");
      })
      .catch((error) => setMessage("❌ Error adding product."));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Manage Production</Typography>

        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={prodName}
          onChange={(e) => setProdName(e.target.value)}
          sx={{ my: 2 }}
        />

        <TextField
          label="Manufacturer Name"
          variant="outlined"
          fullWidth
          value={manufacturerName}
          onChange={(e) => setManufacturerName(e.target.value)}
          sx={{ my: 2 }}
        />

        <TextField
          label="Quantity"
          type="number"
          variant="outlined"
          fullWidth
          value={qty}
          disabled
          sx={{ my: 2 }}
        />

        <TextField
          label="Manufacture Date"
          type="date"
          variant="outlined"
          fullWidth
          value={manufactureDate}
          disabled
          sx={{ my: 2 }}
        />

        <TextField
          label="Expiry Date"
          type="date"
          variant="outlined"
          fullWidth
          value={expiryDate}
          disabled
          sx={{ my: 2 }}
        />

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Product
          </Button>
        </Box>

        {message && (
          <Typography variant="body1" color="green" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ManageProduction;
