'use client'
import { SidebarDemo } from "./sidebar/siderbar"; 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      
      router.push('/login');
    } else {
      setIsAuthenticated(true); 
    }
    setLoading(false); 
  }, [router]);

  if (loading) {
    return null; 
  }

  return isAuthenticated ? <SidebarDemo /> : null;
};

export default Dashboard;
