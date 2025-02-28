import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";

const LicenseForm = () => {
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [open, setOpen] = useState(false); // Snackbar for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setOpen(true); // Show success popup

      // Clear the form fields after submission
      setEmail("");
      setProductName("");
      setQuantity("");
    } catch (error) {
      console.error("Error issuing license:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 4, bgcolor: "#1f2a48", color: "white", borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Issue Product License
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Manufacturer Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2, bgcolor: "white" }}
            required
          />
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ mb: 2, bgcolor: "white" }}
            required
          />
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ mb: 2, bgcolor: "white" }}
            required
          />

          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "#4CAF50", color: "white" }}>
            Issue License
          </Button>
        </form>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
          License Issued Successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LicenseForm;
