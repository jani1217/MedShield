import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update if different

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
