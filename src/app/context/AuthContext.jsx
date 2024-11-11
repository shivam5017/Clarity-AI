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
    likedTemplates: [],
    history: [],
    loading: true,
    templatesLoading: false,
    likeLoading: false,
    userDetailsLoading: false,
    historyLoading: false,
    totalGeneratedWords: 0,
    totalGeneratedWordsLoading: false,
    subscriptionPlans:[],
    subscriptionPlansLoading:false,
    limitReachedErr:null,
  });

  const updateAuthState = (updatedValues) => {
    setAuthState((prev) => ({ ...prev, ...updatedValues }));
  };

  
  const fetchUserDetails = async (userId) => {
    updateAuthState({ userDetailsLoading: true });
    try {
      const response = await axios.get(`${api}/user/${userId}`);
      const {
        username,
        email,
        isSubscribed,
        requestToken,
        _id,
        generatedTemplateCounts,
      } = response.data.credentials;

      updateAuthState({
        userDetails: { username, email, isSubscribed, requestToken, _id },
        generatedTemplateCounts: generatedTemplateCounts || [],
      });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      updateAuthState({ userDetailsLoading: false });
    }
  };

  const fetchSubscriptionPlans = async () => {
    if (authState.subscriptionPlans.length > 0 || authState.subscriptionPlansLoading) {
      return; // Avoid fetching if plans are already loaded or loading
    }
    
    updateAuthState({ subscriptionPlansLoading: true });
    try {
      const response = await axios.get(`${api}/subscription/subscriptions`);
      updateAuthState({ subscriptionPlans: response.data.plans });
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
    } finally {
      updateAuthState({ subscriptionPlansLoading: false });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      updateAuthState({ user: { token } });
      fetchUserDetails(decodedToken.userId).then(() => {
        updateAuthState({ loading: false });
        fetchSubscriptionPlans(); // Trigger subscription plan fetch after user details are loaded
      });
    } else {
      updateAuthState({ loading: false });
    }
  }, []);

  useEffect(() => {
    if (authState.user && !authState.subscriptionPlans.length && !authState.subscriptionPlansLoading) {
      fetchSubscriptionPlans();
    }
  }, [authState.user, authState.subscriptionPlans]);


  const fetchTemplates = async () => {
    if (!authState.user?.token) return;

    const token = authState.user.token;
    updateAuthState({ templatesLoading: true });

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`${api}/dashboard/templates`, config);
      updateAuthState({ templates: response.data });
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      updateAuthState({ templatesLoading: false });
    }
  };

 
  const fetchLikedTemplates = async () => {
    if (!authState.user || !authState.userDetails._id) return;

    const token = authState.user.token;
    updateAuthState({ likeLoading: true });

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `${api}/dashboard/liked-templates/${authState.userDetails._id}`,
        config
      );
      updateAuthState({ likedTemplates: response.data });
    } catch (error) {
      console.error("Error fetching liked templates:", error);
    } finally {
      updateAuthState({ likeLoading: false });
    }
  };

 
  const fetchUserHistory = async () => {
    if (!authState.user || !authState.userDetails._id) return;

    const token = authState.user.token;
    updateAuthState({ historyLoading: true });

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `${api}/dashboard/history/${authState.userDetails._id}`,
        config
      );
      updateAuthState({ history: response.data }); // Update history state
    } catch (error) {
      console.error("Error fetching user history:", error);
    } finally {
      updateAuthState({ historyLoading: false });
    }
  };

  useEffect(() => {
    if (authState.user && authState.userDetails._id) {
      fetchUserHistory(); 
    }
  }, [authState.user, authState.userDetails]);
  
 
  const likeTemplate = async (templateId) => {
    if (!authState.user || !authState.userDetails._id || !templateId) return;

    updateAuthState({ likeLoading: true });

    try {
      const token = authState.user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.post(
        `${api}/dashboard/like-template`,
        { userId: authState.userDetails._id, templateId },
        config
      );
      fetchLikedTemplates(); // Refresh liked templates after the action
    } catch (error) {
      console.error("Error liking/unliking template:", error);
    } finally {
      updateAuthState({ likeLoading: false });
    }
  };

  
  const requestAiContent = async (apiParams, templateId) => {
    if (!authState.user || !authState.userDetails._id) return;
  
    const token = authState.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
  
    try {
      const response = await axios.post(
        `${api}/dashboard/gemini`,
        {
          userId: authState.userDetails._id,
          apiParams,
          templateId,
        },
        config
      );
  
      
      const historyEntry = {
        userId: authState.userDetails._id,
        templateId,
        title: apiParams.prompt,
        totalWords: response.data.totalTokens, 
      };

     
      updateAuthState((prevState) => ({
        history: [historyEntry, ...prevState.history],
      }));

      
      return response.data;
    } catch (error) {
      console.error("Error in requestAiContent:", error);
      if (error.response && error.response.data && error.response.data.message) {
        return { error: error.response.data.message }; // Make sure the error is returned
      }
      updateAuthState({ limitReachedErr: error.message }); // This will be used in your template content
      return { error: 'An unexpected error occurred' };
    }
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      updateAuthState({ user: { token } });
      fetchUserDetails(decodedToken.userId).then(() => {
        updateAuthState({ loading: false });
      });
    } else {
      updateAuthState({ loading: false });
    }
  }, []);

  
  useEffect(() => {
    if (authState.user && authState.userDetails._id) {
      fetchTemplates();
      fetchLikedTemplates();
      fetchUserHistory(); 
    }
  }, [authState.user, authState.userDetails]);

  
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
      router.push("/");
     
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

 
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
      router.push("/");
    } catch (err) {
      console.error("Signup failed:", err);
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  
  const logout = async () => {
    try {
      await axios.post(`${api}/user/logout`, { email: authState.user?.email });
      localStorage.removeItem("token");
      updateAuthState({
        user: null,
        userDetails: {},
        templates: [],
        likedTemplates: [],
        history: [],
        totalGeneratedWords: 0
      });
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };


  const upgradeToPro = async () => {
    if (!authState.user) return;

    updateAuthState({ upgradeLoading: true });
    try {
      const userId = JSON.parse(
        atob(authState.user.token.split(".")[1])
      ).userId;
      const token = authState.user.token;

      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`${api}/dashboard/upgrade/${userId}`, {}, config);

      updateAuthState({
        userDetails: {
          ...authState.userDetails,
          isSubscribed: true,
          requestToken: 5000,
        },
      });
      // console.log("Pro plan activated");
    } catch (error) {
      console.error("Upgrade to Pro failed:", error);
    } finally {
      updateAuthState({ upgradeLoading: false });
    }
  };

  const fetchTotalGeneratedWords = async (userId) => {
    
    if (!authState.user || !authState.user.token || authState.loading) {
      console.error("No token or user data is loading.");
      return;
    }
  
    updateAuthState({ totalGeneratedWordsLoading: true });
    
    try {
     
      const config = {
        headers: {
          Authorization: `Bearer ${authState.user.token}`,
        },
      };
  
      const response = await axios.get(`${api}/dashboard/total-words/${userId}`, config);
  
    
      
      
      updateAuthState({
        totalGeneratedWords: response?.data?.totalGeneratedWords || 0,
      });
    } catch (error) {
      console.error("Error fetching total generated words:", error);
    } finally {
      updateAuthState({ totalGeneratedWordsLoading: false });
    }
  };
  
  
  useEffect(() => {
    if (authState.user && authState.userDetails._id) {
    
      fetchTotalGeneratedWords(authState.userDetails._id);
    }
  }, [authState.user, authState.userDetails]);
  
  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        upgradeToPro,
        likeTemplate,
        fetchTemplates,
        fetchLikedTemplates,
        fetchUserHistory, 
        requestAiContent,
        fetchTotalGeneratedWords,
        fetchSubscriptionPlans
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
