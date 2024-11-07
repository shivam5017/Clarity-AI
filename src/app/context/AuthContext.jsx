"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { api } from "@/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    user: null,
    userDetails: {}, 
    templates: [], 
    templatesLoading: false, 
    templatesError: null, 
    loading: true,
    userDetailsLoading: false,
    upgradeLoading: false,
  });

  const updateAuthState = (updatedValues) => {
    setAuthState((prev) => ({ ...prev, ...updatedValues }));
  };

  // Fetch user details based on userId
  const fetchUserDetails = async (userId) => {
    updateAuthState({ userDetailsLoading: true });
    try {
      const response = await axios.get(`${api}/user/${userId}`);
      const { username, email, isSubscribed, requestToken, _id } = response.data.credentials;
      updateAuthState({
        userDetails: { username, email, isSubscribed, requestToken, _id },
      });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      updateAuthState({ userDetailsLoading: false });
    }
  };

  const fetchTemplates = async () => {
    const token = authState.user?.token; 
  
    if (!token) {
      console.error("No token found");
      return;
    }
  
    if (authState.templates.length > 0) return; 
  
    updateAuthState({ templatesLoading: true, templatesError: null });
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach the token to the request header
        },
      };
  
      const response = await axios.get(`${api}/dashboard/templates`, config); // Add the config to the axios call
  
      if (response.status === 200) {
        updateAuthState({ templates: response.data });
      } else {
        throw new Error("Failed to fetch templates");
      }
    } catch (error) {
      updateAuthState({
        templatesError: error.message || "An error occurred while fetching templates",
      });
      console.error("Error fetching templates:", error);
    } finally {
      updateAuthState({ templatesLoading: false });
    }
  };
  

  // Check if a token exists on initial load and set the user state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      updateAuthState({ user: { token } });
      fetchUserDetails(decodedToken.userId).finally(() => updateAuthState({ loading: false }));
      fetchTemplates(); // Fetch templates after user details are fetched
    } else {
      updateAuthState({ loading: false });
    }
  }, []);

  // Login function to authenticate user and store the token
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${api}/user/login`, { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      updateAuthState({ user: { token } });
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      await fetchUserDetails(decodedToken.userId);
      fetchTemplates(); // Fetch templates after login
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
      updateAuthState({ user: { token } });
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      await fetchUserDetails(decodedToken.userId);
      fetchTemplates(); // Fetch templates after signup
      router.push("/dashboard");
    } catch (err) {
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  // Logout function
  const logout = async () => {
    const email = authState.user?.email;
    try {
      await axios.post(`${api}/user/logout`, { email });
      localStorage.removeItem("token");
      updateAuthState({ user: null, userDetails: null, templates: [] }); // Clear templates on logout
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Upgrade to Pro plan
  const upgradeToPro = async () => {
    if (!authState.user) return;

    updateAuthState({ upgradeLoading: true });
    try {
      const userId = JSON.parse(atob(authState.user.token.split(".")[1])).userId;
      const token = authState.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach token to headers
        },
      };

      const response = await axios.put(`${api}/dashboard/upgrade/${userId}`, {}, config);

      updateAuthState({
        userDetails: {
          ...authState.userDetails,
          isSubscribed: true,
          requestToken: 250,
        },
      });
      console.log("Pro plan activated:", response.data.message);
    } catch (error) {
      console.error("Upgrade to Pro failed:", error);
    } finally {
      updateAuthState({ upgradeLoading: false });
    }
  };

  const ApiRequest = async (inputText) => {
    if (!authState?.userDetails?._id) {
      return;
    }

    try {
      const token = authState.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${api}/dashboard/gemini`,
        {
          userId: authState?.userDetails?._id,
          apiParams: { prompt: inputText },
        },
        config
      );

      if (response.status === 200) {
        return response.data.data;
      } else {
        return "An unexpected error occurred. Please try again.";
      }
    } catch (error) {
      if (error.response) {
        return error.response.data.message;
      } else {
        return "An error occurred while making the request.";
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        upgradeToPro,
        ApiRequest,
        fetchTemplates,  
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
