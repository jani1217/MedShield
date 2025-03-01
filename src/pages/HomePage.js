import React, { useContext } from "react";
import { Container, Typography, Grid, Paper, Avatar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center", bgcolor: "#0a192f", color: "#ffffff", p: 5, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to MedShield 🏥
        </Typography>
        <Typography variant="body1" color="gray">
          MedShield helps you verify medicines, manage prescriptions, report counterfeit drugs, and find the best pharmacies.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" component={Link} to="/auth" sx={{ mx: 1 }}>
            Login
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/signup" sx={{ mx: 1 }}>
            Sign Up
          </Button>
        </Box>
      </Container>
    );
  }

  const role = user?.role || "user";
  const dashboardItems = {
    user: [
      { title: " MediScan", link: "/medicine-verification" },
      { title: " My Prescription", link: "/my-prescriptions" },
      { title: " Report Fraud", link: "/report-fraud" },
      { title: " Best Stores", link: "/top-stores" },
    ],
    doctor: [
      { title: " Add Prescription", link: "/upload-prescription" },
      { title: " Verify Medicines", link: "/medicine-verification" },
      { title: " Patient Reports", link: "/patient-reports" },
    ],
    pharmacist: [
      { title: " View Prescriptions", link: "/pharmacy-access" },
      {title: " Verify Medicines", link: "/medicine-verification" },
      { title: "Purchase Register", link: "/purchase-register" }, // New
      { title: "Stock Register", link: "/stock-register" }, // New
    ],
    rootuser: [
      { title: " Suspicious Transactions ", link: "/validate-complaints" },
      { title: "View Complaints", link: "/view-complaints" },
      { title: "Issue Licenses", link: "/issue-licenses" },
    ],
    manufacturer: [
      { title: " View Barcodes", link: "/view-barcodes" },
      { title: "Manage Production", link: "/manage-production" },
    ],
    admin: [
      { title: "Manage Users", link: "/manage-users" },
      { title: "System Reports", link: "/system-reports" },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, bgcolor: "#0a192f", color: "#ffffff", p: 5, borderRadius: 3 }}>
      <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center", gap: 2, bgcolor: "#1f2a48" }}>
        <Avatar sx={{ width: 60, height: 60, bgcolor: "#6a8caf" }}>{role.charAt(0).toUpperCase()}</Avatar>
        <Box>
          <Typography variant="h6" color="white">Welcome, {user?.name || "User"}</Typography>
          <Typography variant="body2" color="gray">Role: {role.charAt(0).toUpperCase() + role.slice(1)}</Typography>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        {dashboardItems[role].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link to={item.link} style={{ textDecoration: "none" }}>
              <Paper elevation={5} sx={boxStyle}>
                <Typography variant="h6" color="white">{item.title}</Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const boxStyle = {
  p: 3,
  textAlign: "center",
  bgcolor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  transition: "0.3s",
  '&:hover': { bgcolor: "rgba(255, 255, 255, 0.2)", transform: "scale(1.05)" },
};

export default Dashboard;
