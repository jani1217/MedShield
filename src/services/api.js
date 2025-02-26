import axios from "axios";

// Use the deployed backend URL from Render
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api"; 

export const signup = async (userData) => {
    return await axios.post(`${API_BASE_URL}/signup`, userData);
};

export const login = async (userData) => {
    return await axios.post(`${API_BASE_URL}/login`, userData);
};

export const fetchPrescriptions = async (token) => {
    return await axios.get(`${API_BASE_URL}/prescriptions`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
