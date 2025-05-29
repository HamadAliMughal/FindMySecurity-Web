import { ReactNode } from "react";

export interface GenericModalProps {
  visible: boolean;
  onClose: () => void;
  widthClass?: string;
  children: ReactNode; // ✅ Add this line
}
const GenericModal: React.FC<GenericModalProps> = ({
  visible,
  onClose,
  widthClass = "max-w-md",
  children,
}) => {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 ${widthClass}`}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
};

export default GenericModal;
