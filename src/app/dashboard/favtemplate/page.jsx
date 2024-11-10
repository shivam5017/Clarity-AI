'use client';

import { useState, useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { Modal } from "@/app/aceternity/modal";
import TemplateCard from "@/app/aceternity/TemplateCard"; 
import Spinner from "@/app/aceternity/spinner"; 

const NoFavoritesCard = () => (
  <div className="bg-white shadow-lg rounded-lg p-5 mb-5 border border-gray-200 text-center">
    <h2 className="text-lg font-semibold text-gray-500">No Favorite Templates</h2>
    <p className="text-gray-400">You haven&#39;t favorited any templates yet.</p>
  </div>
);

const FavTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null); 
  const [inputText, setInputText] = useState(""); 
  const [outputData, setOutputData] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const { likedTemplates, requestAiContent } = useContext(AuthContext); 

  const closeModal = () => {
    setSelectedTemplate(null); 
    setInputText(""); 
    setOutputData(null); 
    setError(null); 
  };

  const handleApiCall = async (templateId) => {
    if (!inputText.trim()) {
      setError("Please provide some input text.");
      return;
    }

    setLoading(true);
    try {
      const response = await requestAiContent({ prompt: inputText, templateId });
      if (response) {
        setOutputData(response.data);
        setError(null); 
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
      console.error("API call failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 font-faculty">Favorite Templates</h1>

      {/* Template Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedTemplates.length > 0 ? (
          likedTemplates.map((template) => (
            <TemplateCard
              key={template._id} 
              template={template}
              onClick={() => setSelectedTemplate(template)} 
            />
          ))
        ) : (
          <NoFavoritesCard /> 
        )}
      </div>

      {/* Modal for Template Details */}
      {selectedTemplate && (
        <Modal
          template={selectedTemplate} 
          closeModal={closeModal} 
          handleApiCall={() => handleApiCall(selectedTemplate._id)} 
          inputText={inputText} 
          setInputText={setInputText} 
          outputData={outputData} 
          error={error} 
          loading={loading} 
        />
      )}
    </section>
  );
};

export default FavTemplate;
