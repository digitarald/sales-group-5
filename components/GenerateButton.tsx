import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        px-8 py-4 rounded-xl text-xl font-semibold text-white
        transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50
        ${isLoading 
          ? 'bg-white/20 cursor-not-allowed' 
          : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 shadow-lg'
        }
      `}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <FiRefreshCw className="animate-spin mr-2" />
          Generating...
        </span>
      ) : (
        'Generate Objections'
      )}
    </button>
  );
};

export default GenerateButton; 