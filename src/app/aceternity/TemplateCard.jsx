import { useContext, useState } from "react";
import { IconHeart, IconCrown } from "@tabler/icons-react";
import { AuthContext } from "@/app/context/AuthContext"; // Importing AuthContext

const TemplateCard = ({ template, onClick }) => {
  const { likedTemplates, likeTemplate, generatedTemplateCounts } = useContext(AuthContext); // Access context


  const userGeneratedCount = generatedTemplateCounts.find(
    (usage) => usage.templateId === template._id
  )?.generatedCount || 0;

 
  const isLiked = likedTemplates.some((likedTemplate) => likedTemplate._id === template._id);

  const handleLikeClick = (e) => {
    e.stopPropagation(); 
    likeTemplate(template._id); 
  };

  return (
    <div
      className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-6 mb-6 border border-gray-200 dark:border-neutral-700 transition-all hover:shadow-xl hover:scale-105 cursor-pointer font-faculty"
      onClick={() => onClick(template)} 
      aria-labelledby={`template-title-${template._id}`}
      aria-describedby={`template-description-${template._id}`}
    >
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-xl font-semibold text-gray-800 dark:text-white"
          id={`template-title-${template._id}`}
        >
          {template.title}
        </h2>
        {template.isPremium && (
          <IconCrown className="text-yellow-500" title="Premium Template" />
        )}
      </div>

      {/* Card Description */}
      <p
        className="text-gray-600 dark:text-neutral-300 mb-3"
        id={`template-description-${template._id}`}
      >
        {template.description}
      </p>

      {/* Card Footer */}
      <div className="flex justify-between items-center">
        {/* Generated Count */}
        <span className="text-sm text-gray-500 dark:text-neutral-400">
          Generated: {userGeneratedCount}
        </span>

        {/* Like Button */}
        <button
          className={`flex items-center gap-1 text-sm ${isLiked ? "text-red-500" : "text-gray-400"}`}
          onClick={handleLikeClick} 
          aria-label={isLiked ? "Unlike this template" : "Like this template"}
        >
          <IconHeart />
          {isLiked ? "Liked" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
