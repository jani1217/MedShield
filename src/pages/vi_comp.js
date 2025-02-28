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

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/comp") // ✅ Ensure correct API path
      .then((response) => {
        console.log("API Response:", response.data); // Debugging log
        setComplaints(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, bgcolor: "#0a192f", color: "#ffffff", p: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Complaints
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#1f2a48", color: "white" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Product ID</TableCell>
              <TableCell sx={{ color: "white" }}>Type</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: "center", color: "white" }}>
                  No Complaints Found
                </TableCell>
              </TableRow>
            ) : (
              complaints.map((complaint) => (
                <TableRow key={complaint.prod_id}>
                  <TableCell sx={{ color: "white" }}>{complaint.prod_id || "N/A"}</TableCell>
                  <TableCell sx={{ color: "white" }}>{complaint.type_com || "N/A"}</TableCell>
                  <TableCell sx={{ color: "white" }}>{complaint.Description || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ComplaintTable;
