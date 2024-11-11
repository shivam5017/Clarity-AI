"use client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { Modal } from "@/app/aceternity/modal";
import Spinner from "@/app/aceternity/spinner";
import Shimmer from "@/app/aceternity/shimmer";
import TemplateCard from "@/app/aceternity/TemplateCard";
import UpgradeModal from "@/app/aceternity/UpgradeModal"; // Assuming you have an Upgrade modal component
import SubscriptionCardModal from "@/app/aceternity/SubscriptionCardModal";

const TemplateContent = () => {
  const {
    fetchTemplates,
    templates,
    templatesLoading,
    templatesError,
    userDetails,
    userDetailsLoading,
    requestAiContent,
  } = useContext(AuthContext);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [inputText, setInputText] = useState("");
  const [outputData, setOutputData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [templatesFetched, setTemplatesFetched] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    if (!templatesFetched && !templatesLoading) {
      fetchTemplates();
      setTemplatesFetched(true);
    }
  }, [templatesFetched, templatesLoading, fetchTemplates]);

  const handleApiCall = async (templateId) => {
    if (!inputText.trim()) {
      setError("Please provide some input text.");
      return;
    }

    setLoading(true);
    try {
      const response = await requestAiContent({
        prompt: inputText,
        templateId,
      });
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

  const closeModal = () => {
    setSelectedTemplate(null);
    setInputText("");
    setOutputData(null);
    setError(null);
  };

  const handleTemplateClick = (template) => {
    if (!userDetails.isSubscribed && template.isPremium) {
      // If the user is not subscribed and the template is premium, show upgrade modal
      setShowUpgradeModal(true);
    } else {
      // Otherwise, allow template selection
      setSelectedTemplate(template);
    }
  };

  const handleUpgradeModalClose = () => {
    // Close the Upgrade Modal
    setShowUpgradeModal(false);

    // Show SubscriptionModal after closing the UpgradeModal
    setShowSubscriptionModal(true);
  };

  return (
    <section className="p-6 bg-gray-100 font-faculty">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Available Templates
      </h1>

      {templatesLoading ? (
        <Shimmer />
      ) : templatesError ? (
        <div className="text-red-500">{templatesError}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.length > 0 ? (
            templates.map((template) => {
              const uniqueKey = template.id || template._id || template.title;
              return (
                <TemplateCard
                  key={uniqueKey}
                  template={template}
                  onClick={() => handleTemplateClick(template)}
                />
              );
            })
          ) : (
            <NoFavoritesCard />
          )}
        </div>
      )}

      {userDetailsLoading ? (
        <Spinner />
      ) : (
        selectedTemplate && (
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
        )
      )}

      {/* Show Upgrade Modal if the user tries to access a premium template */}
      {showUpgradeModal && (
        <UpgradeModal
          closeModal={() => setShowUpgradeModal(false)}
          onUpgrade={handleUpgradeModalClose} // After upgrading, show SubscriptionModal
        />
      )}

      {/* Show Subscription Modal after Upgrade Modal is closed */}
      {showSubscriptionModal && (
        <SubscriptionCardModal closeModal={() => setShowSubscriptionModal(false)} />
      )}
    </section>
  );
};

const NoFavoritesCard = () => (
  <div className="bg-white shadow-lg rounded-lg p-5 mb-5 border border-gray-200 text-center">
    <h2 className="text-xl font-semibold text-gray-700">
      No Templates Available
    </h2>
    <p className="text-gray-500">You haven&apos;t added any templates yet.</p>
  </div>
);

export default TemplateContent;
