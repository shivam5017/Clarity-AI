'use client'

import React, { useContext } from "react";
import MyAreaChart from "@/app/aceternity/ui/charts";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "@/app/aceternity/spinner";
import HistoryBox from "@/app/aceternity/historyBox";

const DashboardContent = () => {
  const { userDetails, upgradeToPro, upgradeLoading, userDetailsLoading, totalGeneratedWords, totalGeneratedWordsLoading } =
    useContext(AuthContext);

  return (
    <div className="p-6 h-full overflow-y-auto bg-gray-50">
      {/* Overview Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 sm:mb-0 font-faculty">Overview</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-6">
          <h1 className="text-base sm:text-lg font-medium text-gray-700 font-faculty">Tokens: {userDetails?.requestToken}</h1>
          {!userDetailsLoading ? (
            <p className="text-base sm:text-lg font-semibold text-gray-500 font-faculty">
              {userDetails?.isSubscribed ? "Pro" : "Free"}
            </p>
          ) : (
            <Spinner size="small" />
          )}
          {userDetails && userDetails?.username && (
            <button
              onClick={upgradeToPro}
              className={`px-5 py-2.5 rounded-lg text-white font-semibold font-faculty ${
                userDetails?.isSubscribed ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } flex items-center justify-center mt-4 sm:mt-0`}
              disabled={userDetails?.isSubscribed || upgradeLoading}
            >
              {upgradeLoading ? <Spinner size="small" /> : "Upgrade to Pro"}
            </button>
          )}
        </div>
      </div>

      {/* Stats Boxes Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 font-faculty">Total Words Generated</h2>
          {totalGeneratedWordsLoading ? (
            <Spinner size="small" />
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-faculty">{totalGeneratedWords}</p>
          )}
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-5 font-faculty">Words Generated Over Time</h2>
        <div className="h-64 sm:h-80">
          <MyAreaChart />
        </div>
      </div>

      {/* History Section */}
      <HistoryBox />
    </div>
  );
};

export default DashboardContent;
