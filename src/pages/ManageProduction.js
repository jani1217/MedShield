import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, MenuItem, Button, Paper, Box } from "@mui/material";
import axios from "axios";

const ManageProduction = () => {
  const [prodName, setProdName] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [message, setMessage] = useState("");

  // Fetch manufacturers from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/manufacturers")
      .then(response => setManufacturers(response.data))
      .catch(error => console.error("Error fetching manufacturers:", error));
  }, []);

  // Submit the product details
  const handleSubmit = () => {
    if (!prodName || !selectedManufacturer) {
      setMessage("Please enter product name and select a manufacturer.");
      return;
    }

    axios.post("http://localhost:5000/add-product", {
      prod_name: prodName,
      producer_name: selectedManufacturer
    })
    .then(response => {
      setMessage(response.data.message);
      setProdName("");
      setSelectedManufacturer("");
    })
    .catch(error => setMessage("Error adding product."));
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
          select
          label="Select Manufacturer"
          fullWidth
          value={selectedManufacturer}
          onChange={(e) => setSelectedManufacturer(e.target.value)}
          sx={{ my: 2 }}
        >
          {manufacturers.map((manufacturer) => (
            <MenuItem key={manufacturer.name} value={manufacturer.name}>
              {manufacturer.name}
            </MenuItem>
          ))}
        </TextField>

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
