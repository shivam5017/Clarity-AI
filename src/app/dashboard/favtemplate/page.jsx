'use client';

import { useState, useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { Modal } from "@/app/aceternity/modal";
import TemplateCard from "@/app/aceternity/TemplateCard"; 
import Spinner from "@/app/aceternity/spinner"; 
import UpgradeModal from "@/app/aceternity/UpgradeModal"; // Assuming you have this modal component

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
  const { likedTemplates, requestAiContent, userDetails } = useContext(AuthContext); // Assuming isSubscribed is available in the context
  const [showUpgradeModal, setShowUpgradeModal] = useState(false); // For showing the upgrade modal
 

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

  const handleTemplateClick = (template) => {
   
    if (!userDetails.isSubscribed && template.isPremium) {
      // If the user is not subscribed and the template is premium, show the upgrade modal
      setShowUpgradeModal(true);
    } else {
      // Otherwise, allow template selection
      setSelectedTemplate(template);
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
              onClick={() => handleTemplateClick(template)} 
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

      {/* Show Upgrade Modal if the user tries to access a premium template */}
      {showUpgradeModal && (
        <UpgradeModal 
          closeModal={() => setShowUpgradeModal(false)} 
          onUpgrade={() => {
            // Handle the upgrade logic here (e.g., redirect to subscription page)
            console.log('Upgrade the user');
            setShowUpgradeModal(false);
          }} 
        />
      )}
    </section>
  );
};

export default FavTemplate;
