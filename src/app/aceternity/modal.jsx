import { CustomBtn } from "@/app/aceternity/button";
import Spinner from "@/app/aceternity/spinner";
import Shimmer from "@/app/aceternity/shimmer";

export const Modal = ({
  template,
  closeModal,
  handleApiCall,
  outputData,
  inputText,
  setInputText,
  error,
  loading,
}) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 font-faculty">
    <div className="bg-white dark:bg-neutral-900 rounded-lg w-full max-w-4xl h-auto p-8 shadow-lg relative overflow-auto max-h-[90%]">
      {/* Heading */}
      <div className="w-full flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">{template.title}</h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 text-3xl focus:outline-none"
        >
          &times;
        </button>
      </div>

      {/* Downward Divs */}
      <div className="flex flex-col sm:flex-row w-full h-auto">
        {/* Left Side (Input Section) */}
        <div className="w-full sm:w-1/2 px-4 py-6">
          {/* Input Section */}
          <p className="text-gray-600 dark:text-neutral-300 mb-6">{template.description}</p>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200 mb-2">
              Enter your request:
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="px-4 py-3 w-full border border-gray-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white dark:focus:ring-blue-400 transition duration-200"
              placeholder="Type something..."
            />
          </div>

          {/* Submit button */}
          <CustomBtn
            onClick={handleApiCall}
            className="w-full cursor-pointer py-3 mt-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none transition duration-200"
            disabled={loading || !inputText}
          >
            {loading ? <Spinner /> : "Generate"}
          </CustomBtn>

          {/* Error message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Right Side (Output Section) */}
        <div className="w-full sm:w-1/2 px-4 py-6">
          <div className="mt-6 bg-green-100 dark:bg-green-900 p-5 rounded-lg shadow-md h-full max-h-[600px] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">AI Output</h2>

            {loading ? (
              // Shimmer loading state
              <div className="flex flex-col justify-center items-center py-12 gap-4">
                {/* Multiple shimmer components can be added to simulate multiple loading items */}
                <Shimmer className="w-full h-12 mb-4" />
                <Shimmer className="w-full h-12 mb-4" />
                <Shimmer className="w-full h-12 mb-4" />
              </div>
            ) : outputData ? (
              // Render output data once API is complete
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-neutral-100">
                {outputData}
              </pre>
            ) : (
              // Default message if no data and not loading
              <p className="text-gray-500 dark:text-neutral-400">Welcome to Clarity AI</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

