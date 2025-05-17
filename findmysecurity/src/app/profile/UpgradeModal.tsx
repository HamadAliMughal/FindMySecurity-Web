import React from "react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Upgrade Required</h2>
        <p className="text-sm text-gray-600 mb-4">
          This feature is only available for Standard and Premium plans. Please upgrade your plan to access it.
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default UpgradeModal;
