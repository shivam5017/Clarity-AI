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
      const { username, email, isSubscribed, requestToken } =
        response.data.credentials;
      updateAuthState({
        userDetails: { username, email, isSubscribed, requestToken },
      });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      updateAuthState({ userDetailsLoading: false });
    }
  };

  // Check if a token exists on initial load and set the user state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      updateAuthState({ user: { token } });
      fetchUserDetails(decodedToken.userId).finally(() =>
        updateAuthState({ loading: false })
      );
    } else {
      updateAuthState({ loading: false });
    }
  }, []);

  // Login function to authenticate user and store the token
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${api}/user/login`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      updateAuthState({ user: { token } });
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      await fetchUserDetails(decodedToken.userId);
      router.push("/dashboard");
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  // Signup function to register user and store the token
  const signup = async (username, email, password) => {
    try {
      const response = await axios.post(`${api}/user/register`, {
        username,
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      updateAuthState({ user: { token } });
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      await fetchUserDetails(decodedToken.userId);
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
      updateAuthState({ user: null, userDetails: null });
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
      const userId = JSON.parse(
        atob(authState.user.token.split(".")[1])
      ).userId;
      const response = await axios.put(`${api}/user/upgrade/${userId}`);

      updateAuthState({
        userDetails: {
          ...authState.userDetails,
          isSubscribed: true,
          requestToken: 400,
        },
        userDetailsLoading: false,
      });
      console.log("Pro plan activated:", response.data.message);
    } catch (error) {
      console.error("Upgrade to Pro failed:", error);
    } finally {
      updateAuthState({ upgradeLoading: false });
    }
  };

  // API Request function
  const ApiRequest = async () => {
    try {
      const response = await axios.post("/api/use-api", {
        userId: "user-id",
        apiEndpoint: "some-endpoint",
        apiParams: {
          param1: "value1",
          param2: "value2",
        },
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
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        upgradeToPro,
        ApiRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
