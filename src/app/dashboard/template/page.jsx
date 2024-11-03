'use client'
import { useState } from "react";
import { IconHeart ,IconCrown} from "@tabler/icons-react";

const templatesData = [
  {
    id: 1,
    title: "Template One",
    description: "This is a description for template one.",
    generatedCount: 150,
    isPremium: true,
  },
  {
    id: 2,
    title: "Template Two",
    description: "This is a description for template two.",
    generatedCount: 200,
    isPremium: false,
  },
  {
    id: 3,
    title: "Template Three",
    description: "This is a description for template three.",
    generatedCount: 300,
    isPremium: true,
  },
];

const TemplateCard = ({ template }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 mb-5 border border-gray-200">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{template.title}</h2>
        {template.isPremium && (
          <IconCrown className="text-yellow-500" title="Premium Template"  />
        )}
      </div>

      {/* Card Description */}
      <p className="text-gray-600 mb-3">{template.description}</p>

      {/* Card Footer */}
      <div className="flex justify-between items-center">
        {/* Generated Count */}
        <span className="text-sm text-gray-500">
          Generated: {template.generatedCount}
        </span>

        {/* Like Button */}
        <button
          className={`flex items-center gap-1 text-sm ${
            liked ? "text-red-500" : "text-gray-400"
          }`}
          onClick={() => setLiked(!liked)}
        >
          <IconHeart />
          {liked ? "Liked" : "Like"}
        </button>
      </div>
    </div>
  );
};

const TemplateContent = () => {
  return (
    <section className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Available Templates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatesData.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
};

export default TemplateContent;
