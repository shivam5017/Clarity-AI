'use client'
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import Spinner from "@/app/aceternity/spinner"; // Assuming you have a spinner component

const HistoryBox = () => {
  const { history, historyLoading, fetchUserHistory } = useContext(AuthContext);

  useEffect(() => {
    fetchUserHistory(); // Fetch history when component mounts
  }, []);

  if (historyLoading) {
    return (
      <div className="flex justify-center items-center h-[400px] py-10">
        <Spinner /> {/* Use Spinner component */}
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] p-6 rounded-lg shadow-md font-faculty">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">History</h2>
      
      <div className="overflow-x-auto max-h-[500px]">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200 dark:bg-neutral-700">
            <tr>
              <th
                scope="col"
                className="p-3 text-sm font-medium text-gray-700 dark:text-neutral-200"
              >
                Template
              </th>
              <th
                scope="col"
                className="p-3 text-sm font-medium text-gray-700 dark:text-neutral-200"
              >
                Title
              </th>
              <th
                scope="col"
                className="p-3 text-sm font-medium text-gray-700 dark:text-neutral-200"
              >
                Created At
              </th>
              <th
                scope="col"
                className="p-3 text-sm font-medium text-gray-700 dark:text-neutral-200"
              >
                Total Words
              </th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No history available.
                </td>
              </tr>
            ) : (
              history.map((entry) => (
                <tr
                  key={entry._id}
                  className="border-b border-neutral-300 dark:border-neutral-700"
                >
                  <td className="p-3 text-sm">
                    {entry.templateId ? entry.templateId.title : "No Template"}
                  </td>
                  <td className="p-3 text-sm truncate max-w-[200px] sm:max-w-[300px]">
                    {entry.title}
                  </td>
                  <td className="p-3 text-sm">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-sm">{entry.totalWords}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryBox;
