'use client';
import { useState, useContext, useEffect } from "react";
import { IconHeart, IconCrown } from "@tabler/icons-react";
import { AuthContext } from "@/app/context/AuthContext";
import { Modal } from "@/app/aceternity/modal";  
import Spinner from "@/app/aceternity/spinner";  
import Shimmer from "@/app/aceternity/shimmer";

// TemplateCard Component (No change needed here)
const TemplateCard = ({ template, onClick }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-5 mb-5 border border-gray-200 cursor-pointer"
      onClick={() => onClick(template)}
    >
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{template.title}</h2>
        {template.isPremium && (
          <IconCrown className="text-yellow-500" title="Premium Template" />
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
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from firing when liking
            setLiked(!liked);
          }}
        >
          <IconHeart />
          {liked ? "Liked" : "Like"}
        </button>
      </div>
    </div>
  );
};

const TemplateContent = () => {
  const {
    
    ApiRequest,
    fetchTemplates,   
    templates,       
    templatesLoading, 
    templatesError,  
    userDetailsLoading,
  } = useContext(AuthContext);

  const [selectedTemplate, setSelectedTemplate] = useState(null); // Track selected template
  const [error, setError] = useState(null);
  const [outputData, setOutputData] = useState(null);
  const [inputText, setInputText] = useState("");
  const [loadingState, setLoadingState] = useState(false); // Local loading state for API call

  // Flag to track if templates have been fetched
  const [templatesFetched, setTemplatesFetched] = useState(false);

  // Fetch templates from backend when component mounts (only if templates haven't been fetched yet)
  useEffect(() => {
    if (!templatesFetched) {
      fetchTemplates(); // Fetch templates only if they haven't been fetched yet
      setTemplatesFetched(true); // Set flag to prevent further calls
    }
  }, [fetchTemplates, templatesFetched]); // Only run when `templatesFetched` changes

  // Function to handle API call (existing logic)
  const handleApiCall = async () => {
    if (!inputText.trim()) {
      setError("Please provide some input.");
      return;
    }
    setLoadingState(true);  // Set loading to true before API request
    try {
      const response = await ApiRequest(inputText); // Pass inputText here
      if (response) {
        setOutputData(response); // Set the generated content from AI
        setError(null); // Reset error if successful
      }
    } catch (error) {
      setError("An error occurred while fetching the data.");
      console.error("API call failed:", error);
    } finally {
      setLoadingState(false); // Set loading to false after the request is done
    }
  };

  const closeModal = () => {
    setSelectedTemplate(null);
    setInputText("");
    setOutputData(null);
    setError(null);
  };

  return (
    <section className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Available Templates</h1>

      {/* Handle loading and error states for fetching templates */}
      {templatesLoading ? (
        <Shimmer />  
      ) : templatesError ? (
        <div className="text-red-500">{templatesError}</div>  // Display error message if fetching fails
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.length > 0 ? (
            templates.map((template) => (
              <TemplateCard key={template.id} template={template} onClick={setSelectedTemplate} />
            ))
          ) : (
            <p className="text-gray-500">No templates available.</p> // Message if no templates are available
          )}
        </div>
      )}

      {/* Handle user details loading */}
      {userDetailsLoading ? (
        <Spinner />
      ) : (
        <>
        
          {/* Show the Modal if a template is selected */}
          {selectedTemplate && (
            <Modal
              template={selectedTemplate}
              closeModal={closeModal}
              handleApiCall={handleApiCall}
              outputData={outputData}
              inputText={inputText}
              setInputText={setInputText}
              error={error}
              loading={loadingState}
            />
          )}
        </>
      )}
    </section>
  );
};

export default TemplateContent;
