import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from "@mui/material";
import axios from "axios";

const PurchaseRegister = () => {
  const [purchases, setPurchases] = useState([]);
  const [newPurchase, setNewPurchase] = useState({
    medicineName: "",
    quantity: "",
    buyerName: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get("/api/purchases");
      setPurchases(response.data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  const handleChange = (e) => {
    setNewPurchase({ ...newPurchase, [e.target.name]: e.target.value });
  };

  const handleAddPurchase = async () => {
    if (!newPurchase.medicineName || !newPurchase.quantity || !newPurchase.buyerName) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("/api/purchases", newPurchase);
      fetchPurchases(); // Refresh list
      setNewPurchase({ medicineName: "", quantity: "", buyerName: "", date: new Date().toISOString().split("T")[0] });
    } catch (error) {
      console.error("Error adding purchase:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🛒 Purchase Register
      </Typography>

      {/* New Purchase Form */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Add New Purchase</Typography>
        <TextField label="Medicine Name" name="medicineName" value={newPurchase.medicineName} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        <TextField label="Quantity" name="quantity" type="number" value={newPurchase.quantity} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        <TextField label="Buyer Name" name="buyerName" value={newPurchase.buyerName} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        <TextField label="Date" name="date" type="date" value={newPurchase.date} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        <Button variant="contained" color="primary" onClick={handleAddPurchase} sx={{ mt: 2 }}>
          Add Purchase
        </Button>
      </Paper>

      {/* Purchase Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Medicine</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Buyer</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase, index) => (
              <TableRow key={index}>
                <TableCell>{purchase.medicineName}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>{purchase.buyerName}</TableCell>
                <TableCell>{purchase.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PurchaseRegister;
