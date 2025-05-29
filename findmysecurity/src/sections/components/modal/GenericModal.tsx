// components/GenericModal.tsx
import React from "react";

interface GenericModalProps {
  show: boolean;
  icon?: React.ReactNode;
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
}

const GenericModal: React.FC<GenericModalProps> = ({
  show,
  icon,
  title,
  message,
  buttonText = "Got it!",
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg text-center">
        <div className="flex justify-center">{icon}</div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default GenericModal;
