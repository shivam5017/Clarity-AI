import React from "react";
import MyAreaChart from "@/app/aceternity/ui/charts"

const DashboardContent = () => {
  

  return (
    <div className="p-5 h-full overflow-y-auto">
      {/* Overview Heading */}
      <h1 className="text-2xl font-bold mb-5">Overview</h1>

      {/* Boxes Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="p-5 bg-[#f5f5f5] rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Words Generated</h2>
          <p className="text-xl font-bold">12,300</p>
        </div>
        <div className="p-5 bg-[#f5f5f5] rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Doc Generated</h2>
          <p className="text-xl font-bold">300</p>
        </div>
        <div className="p-5 bg-[#f5f5f5] rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Time Saved</h2>
          <p className="text-xl font-bold">45 min</p>
        </div>
        <div className="p-5 bg-[#f5f5f5] rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Average Word/Doc</h2>
          <p className="text-xl font-bold">120</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#f5f5f5] p-5 rounded-lg shadow-md mb-10">
        <h2 className="text-lg font-semibold mb-5">
          Words Generated Over Time
        </h2>
        <div className="h-64">
        <MyAreaChart />
        </div>
      </div>

      {/* History Section */}
      <div className="bg-[#f5f5f5]  p-5 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-5">History</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-300 dark:border-neutral-700">
              <th className="p-2">Template</th>
              <th className="p-2">Title</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Total Words</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-300 dark:border-neutral-700">
              <td className="p-2">Code Generator</td>
              <td className="p-2">Give me code gpt</td>
              <td className="p-2">2024-11-01</td>
              <td className="p-2">150</td>
            </tr>
            <tr className="border-b border-neutral-300 dark:border-neutral-700">
              <td className="p-2">Code Generator</td>
              <td className="p-2">Give me code gpt</td>
              <td className="p-2">2024-11-01</td>
              <td className="p-2">150</td>
            </tr>
            <tr className="border-b border-neutral-300 dark:border-neutral-700">
              <td className="p-2">Code Generator</td>
              <td className="p-2">Give me code gpt</td>
              <td className="p-2">2024-11-01</td>
              <td className="p-2">150</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardContent;