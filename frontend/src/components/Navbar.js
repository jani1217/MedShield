import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ background: "#2E3B55" }}>
      <Toolbar>
        {/* App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MedShield
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color={isActive("/") ? "secondary" : "inherit"} component={Link} to="/">
            Home
          </Button>
          {user ? (
            <>
              <Button color={isActive("/upload-prescription") ? "secondary" : "inherit"} component={Link} to="/upload-prescription">
                Upload Prescription
              </Button>
              <Button color={isActive("/pharmacy-access") ? "secondary" : "inherit"} component={Link} to="/pharmacy-access">
                Pharmacy Access
              </Button>
              <Button color={isActive("/medicine-verification") ? "secondary" : "inherit"} component={Link} to="/medicine-verification">
                Medicine Verification
              </Button>
              <Button color="error" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color={isActive("/auth") ? "secondary" : "inherit"} component={Link} to="/auth">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
