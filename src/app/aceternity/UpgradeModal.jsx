// UpgradeModal.js
const UpgradeModal = ({ closeModal, onUpgrade }) => {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Upgrade to Premium
          </h2>
          <p className="text-gray-700 dark:text-neutral-300 mb-4">
            You need a premium subscription to access this template. Upgrade your plan to unlock premium features.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={onUpgrade}
            >
              Upgrade Now
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UpgradeModal;
  