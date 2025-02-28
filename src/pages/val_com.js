import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products") // Backend API
      .then((response) => {
        console.log("API Response:", response.data); // Debugging log
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, bgcolor: "#0a192f", color: "#ffffff", p: 4, borderRadius: 3 }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Product Details
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#1f2a48", color: "white" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Timestamp</TableCell>
              <TableCell sx={{ color: "white" }}>Quantity</TableCell>
              <TableCell sx={{ color: "white" }}>Expiry Date</TableCell>
              <TableCell sx={{ color: "white" }}>Producer</TableCell>
              <TableCell sx={{ color: "white" }}>Customer</TableCell>
              <TableCell sx={{ color: "white" }}>Production Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ textAlign: "center", color: "white" }}>
                  No Products Found
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.prod_id}>
                  <TableCell sx={{ color: "white" }}>{product.prod_name || "N/A"}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {product.timestamp ? new Date(product.timestamp).toLocaleString() : "N/A"}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{product.qty ?? "N/A"}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {product.expiry_date ? new Date(product.expiry_date).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{product.producer_name || "N/A"}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.customer_name || "N/A"}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {product.production_date ? new Date(product.production_date).toLocaleDateString() : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductTable;
