import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const mockUser = { username, token: "mockToken123" }; // Replace with real backend later
    login(mockUser);
    navigate("/"); // Redirect to Home
  };

  return (
    <Box sx={{ width: "300px", margin: "auto", mt: 5, textAlign: "center" }}>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Username"
        fullWidth
        sx={{ mt: 2 }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        sx={{ mt: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default AuthPage;
