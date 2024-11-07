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
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
    <div className="bg-white rounded-lg w-full h-full p-8 shadow-lg relative overflow-auto max-h-full">
      {/* Heading */}
      <div className="w-full bg-red">
        <h2 className="text-2xl font-semibold mb-4">{template.title}</h2>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
      </div>

      {/* Downward Divs */}
      <div className="flex flex-col sm:flex-row w-full h-2/4 mt-10">
        {/* Left Side (Input Section) */}
        <div className="w-full sm:w-1/2 px-4 py-6">
          {/* Input Section */}
          <p className="text-gray-600 mb-6">{template.description}</p>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Enter your request:
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="px-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type something..."
            />
          </div>

          {/* Submit button */}
          <CustomBtn
            onClick={handleApiCall}
            className="w-full cursor-pointer py-3 mt-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200"
            disabled={loading || !inputText}
          >
            {loading ? <Spinner /> : "Generate"}
          </CustomBtn>

          {/* Error message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Right Side (Output Section) */}
        <div className="w-full sm:w-1/2 px-4 py-6">
          <div className="mt-6 bg-green-100 p-5 rounded-lg shadow-md h-[600px] max-h-[600px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3">AI Output</h2>

            {loading ? (
              // Shimmer loading state
              <div className="flex flex-col justify-center items-center py-12 gap-4">
                {/* Multiple shimmer components can be added to simulate multiple loading items */}
                <Shimmer className="w-full h-12 mb-4" />
              </div>
            ) : outputData ? (
              // Render output data once API is complete
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {outputData}
              </pre>
            ) : (
              // Default message if no data and not loading
              <p className="text-gray-500">Welcome to Clarity AI</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
