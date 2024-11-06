
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
                isSubscribe:userData.isSubscribed,
                requestToken:userData.requestToken
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

  
const upgradeToPro = async () => {
    if (!user) return; 

    try {
        const userId = JSON.parse(atob(user.token.split(".")[1])).userId;
        const response = await axios.put(`${api}/user/upgrade/${userId}`);
        
        // Update user details with new subscription and token data
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            isSubscribed: true,
            requestToken: 400 
        }));
        
        console.log("Pro plan activated:", response.data.message);
    } catch (error) {
        console.error("Upgrade to Pro failed:", error);
    }
};


const ApiRequest = async () => {
    try {
        const response = await axios.post('/api/use-api', {
            userId: 'user-id',             
            apiEndpoint: 'some-endpoint',   
            apiParams: {                   
                param1: 'value1',
                param2: 'value2'
            }
        });
        const remainingTokens = response.data.remainingTokens;
        console.log("API request successful, remaining tokens:", remainingTokens);
        console.log("API Data:", response.data.data);  
    } catch (error) {
        if (error.response) {
       
            alert(error.response.data.message); 
        } else {
           
            alert("An error occurred while making the request.");
        }
    }
};


    return (
        <AuthContext.Provider value={{ user, loading, userDetailsLoading, login, signup, logout, userDetails,upgradeToPro }}>
            {children}
        </AuthContext.Provider>
    );
};
