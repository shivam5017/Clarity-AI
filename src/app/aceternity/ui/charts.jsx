'use client';
import React, { useContext, useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import { AuthContext } from '@/app/context/AuthContext'; // Import the context

const DynamicAreaChart = () => {
  const {
    userDetails,
    history,
    totalGeneratedWords, 
    templatesLoading,
    historyLoading,
  } = useContext(AuthContext);  // Access the necessary data from the context

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Dynamically set the chart data based on history or other user-related data
    const generateChartData = () => {
      if (history.length > 0) {
        const data = history.map((entry) => ({
          name: entry.title,  // Use template title or another field
          uv: entry.totalWords,  // Example: use the totalWords from history
        }));
        setChartData(data);
      }
    };

    if (!templatesLoading && !historyLoading) {
      setLoading(false);
      generateChartData(); // Update chart data when history changes or is loaded
    } else {
      setLoading(true);  // Show loading spinner while the data is being fetched
    }
  }, [history, templatesLoading, historyLoading]);  // Re-run this effect when history or loading states change

  if (loading) {
    return <div>Loading chart...</div>;  // Show a loading message while data is being fetched
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        <Brush
          dataKey="name"
          height={30}
          stroke="#8884d8"
          startIndex={0}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DynamicAreaChart;
