import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const ManageProduction = () => {
  const [prodName, setProdName] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");
  const [productsroutes, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const qty = 40; // Default Quantity (Disabled)
  const manufactureDate = new Date().toISOString().split("T")[0];
  const expiryDate = (() => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 3);
    return date.toISOString().split("T")[0];
  })();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/productsroutes");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Submit new product
  const handleSubmit = async () => {
    if (!prodName || !manufacturerName) {
      setMessage("Please enter product name and manufacturer name.");
      return;
    }
    if (prodName.length < 3 || manufacturerName.length < 3) {
      setMessage("Product name and manufacturer name must be at least 3 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/productsroutes/add-product", {
        prod_name: prodName,
        producer_name: manufacturerName,
        qty,
        manufacture_date: manufactureDate,
        expiry_date: expiryDate,
      });
      setMessage(response.data.message);
      setProdName("");
      setManufacturerName("");
      fetchProducts(); // Refresh product list
    } catch (error) {
      setMessage("❌ Error adding product.");
    }
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

      {/* Product List Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Product Name</b></TableCell>
              <TableCell><b>Manufacturer</b></TableCell>
              <TableCell><b>Product ID</b></TableCell>
              <TableCell><b>QR Code</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsroutes.map((product) => (
              <TableRow key={product.productId}>
                <TableCell>{product.prod_name}</TableCell>
                <TableCell>{product.producer_name}</TableCell>
                <TableCell>{product.productId}</TableCell>
                <TableCell>
        <a href={product.qr_code} download={`QR_${product.productId}.png`}>
          <Button variant="contained" color="secondary">
            Download QR
          </Button>
        </a>
      </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageProduction;
