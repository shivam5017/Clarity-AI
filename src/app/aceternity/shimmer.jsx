import React from "react";

const Shimmer = ({ className = "", height = "h-8", width = "w-full" }) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${height} ${width} ${className}`}
    >
      <div className="w-full h-full bg-gradient-to-r rounded-md from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer"></div>
    </div>
  );
};

export default Shimmer;
