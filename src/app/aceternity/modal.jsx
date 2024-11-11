import DOMPurify from "dompurify";
import { CustomBtn } from "./button";
import Shimmer from "./shimmer";
import Spinner from "./spinner";
import YoutubeHastags from "./templateFiles/youtubeHastags";
import BlogPostTemplate from "./templateFiles/blogPosts";

export const Modal = ({
  template,
  closeModal,
  handleApiCall,
  outputData,
  inputText,
  setInputText,
  error,
  loading,
}) => {
  const formatOutputData = (data) => {
    if (!data) return "";
    // Replace newline characters with <br> tags for correct spacing
    const formattedData = data.replace(/\n/g, "<br>");
    return DOMPurify.sanitize(formattedData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 font-faculty">
      <div className="bg-white dark:bg-neutral-900 rounded-none w-full h-full p-8 shadow-lg relative overflow-auto flex flex-col">
        {/* Heading */}
        <div className="w-full flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            {template.title}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-3xl focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-grow flex-col sm:flex-row w-full h-auto mb-4">
          {/* Left Side (Input Section) */}
          <div className="w-full sm:w-1/2 px-4 py-6">
            <p className="text-gray-600 dark:text-neutral-300 mb-6">
              {template.description}
            </p>

            {template.title === "Youtube Hashtags Finder" && (
              <YoutubeHastags setInputText={setInputText} />
            )}

            {template.title === "Blog Post" && (
              <BlogPostTemplate setInputText={setInputText} />
            )}
          </div>

          {/* Right Side (Output Section) */}
          <div className="w-full sm:w-1/2 px-4 py-6">
            <div className="mt-6 bg-green-100 dark:bg-green-900 p-5 rounded-lg shadow-md h-full overflow-y-auto">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">
                AI Output
              </h2>
              {loading ? (
                <div className="flex flex-col justify-center items-center py-12 gap-4">
                  <Shimmer className="w-full h-12 mb-4" />
                  <Shimmer className="w-full h-12 mb-4" />
                  <Shimmer className="w-full h-12 mb-4" />
                </div>
              ) : outputData ? (
                <div
                  className="whitespace-pre-wrap text-sm text-gray-700 dark:text-neutral-100"
                  dangerouslySetInnerHTML={{
                    __html: formatOutputData(outputData),
                  }}
                ></div>
              ) : (
                <div className="text-gray-500 dark:text-neutral-400">
                  Welcome to Clarity AI
                  {error && <div className="text-red-500 mt-4">{error}</div>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button at the Bottom */}
        <div className="mt-auto text-center">
          <CustomBtn
            onClick={handleApiCall}
            className="w-full cursor-pointer py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none transition duration-200"
            disabled={loading || !inputText}
          >
            {loading ? <Spinner /> : "Generate"}
          </CustomBtn>
        </div>
      </div>
    </div>
  );
};
