import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <div className="absolute top-24 left-6 z-20">
      <button 
        className="flex items-center text-gray-600 hover:text-black transition-all" 
        onClick={onClick}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      </button>
    </div>
  );
}