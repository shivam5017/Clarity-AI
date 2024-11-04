// context/AuthContext.js

"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { api } from "@/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [userDetailsLoading, setUserDetailsLoading] = useState(false);

    // Fetch user details based on userId
    const fetchUserDetails = async (userId) => {
        setUserDetailsLoading(true);
        try {
            const response = await axios.get(`${api}/user/${userId}`);
            const userData = response.data.credentials;
            setUserDetails({
                username: userData.username,
                email: userData.email,
            });
        } catch (error) {
            console.error("Failed to fetch user details:", error);
        } finally {
            setUserDetailsLoading(false);
        }
    };

    // Check if a token exists on initial load and set the user state
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            setUser({ token });
            fetchUserDetails(decodedToken.userId).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // Login function to authenticate user and store the token
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${api}/user/login`, { email, password });
            const token = response.data.token;
            localStorage.setItem("token", token);
            setUser({ token });
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            await fetchUserDetails(decodedToken.userId); // Fetch user details immediately after login
            router.push("/dashboard");
        } catch (err) {
            throw new Error(err.response?.data?.message || "Login failed");
        }
    };

    // Signup function to register user and store the token
    const signup = async (username, email, password) => {
        try {
            const response = await axios.post(`${api}/user/register`, { username, email, password });
            const token = response.data.token;
            localStorage.setItem("token", token);
            setUser({ token });
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            await fetchUserDetails(decodedToken.userId); // Fetch user details immediately after signup
            router.push("/dashboard");
        } catch (err) {
            throw new Error(err.response?.data?.message || "Signup failed");
        }
    };

    const logout = async () => {
        const email = user?.email;
        try {
            await axios.post(`${api}/user/logout`, { email });
            localStorage.removeItem("token");
            setUser(null);
            setUserDetails({});
            router.push("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, userDetailsLoading, login, signup, logout, userDetails }}>
            {children}
        </AuthContext.Provider>
    );
};
