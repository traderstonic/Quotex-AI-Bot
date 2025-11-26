import React from 'react';

interface LogicModalProps {
  logic: string;
  onClose: () => void;
}

const LogicModal: React.FC<LogicModalProps> = ({ logic, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#0b0e14] rounded-2xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-fade-in-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/50">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-cyan-500/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
             </div>
             <h2 className="text-xl font-display font-bold text-white tracking-wide">AI STRATEGY LOGIC</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed font-sans text-sm md:text-base border-l-2 border-cyan-500/30 pl-4">
              {logic}
            </p>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-800 bg-gray-900/30 text-right">
             <button onClick={onClose} className="bg-cyan-600 hover:bg-cyan-500 text-white font-display font-bold py-2 px-8 rounded-lg transition-colors shadow-lg hover:shadow-cyan-500/20">
                CLOSE LOGIC
            </button>
        </div>
      </div>
    </div>
  );
};

export default LogicModal;