import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from "@mui/material";
import axios from "axios";

const StockRegister = () => {
  const [stock, setStock] = useState([]);
  const [newStock, setNewStock] = useState({
    medicineName: "",
    quantity: "",
    expiryDate: "",
    supplier: "",
  });

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await axios.get("/api/stock");
      setStock(response.data);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  const handleChange = (e) => {
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  const handleAddStock = async () => {
    if (!newStock.medicineName || !newStock.quantity || !newStock.expiryDate || !newStock.supplier) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("/api/stock", newStock);
      fetchStock(); // Refresh list
      setNewStock({ medicineName: "", quantity: "", expiryDate: "", supplier: "" });
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📦 Stock Register
      </Typography>

      {/* New Stock Form */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Add New Stock</Typography>
        <TextField label="Medicine Name" name="medicineName" value={newStock.medicineName} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        <TextField label="Quantity" name="quantity" type="number" value={newStock.quantity} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        <TextField label="Expiry Date" name="expiryDate" type="date" value={newStock.expiryDate} onChange={handleChange} fullWidth sx={{ mt: 2 }} InputLabelProps={{ shrink: true }} />
        <TextField label="Supplier" name="supplier" value={newStock.supplier} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        <Button variant="contained" color="primary" onClick={handleAddStock} sx={{ mt: 2 }}>
          Add Stock
        </Button>
      </Paper>

      {/* Stock Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Medicine</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Expiry Date</strong></TableCell>
              <TableCell><strong>Supplier</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stock.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.medicineName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.expiryDate}</TableCell>
                <TableCell>{item.supplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StockRegister;
