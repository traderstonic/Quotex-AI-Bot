import React, { useRef } from 'react';

interface ImageUploaderProps {
  previewUrl: string | null;
  onImageChange: (file: File | null) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  analysisComplete: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ previewUrl, onImageChange, onAnalyze, isLoading, analysisComplete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    if (!previewUrl) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
    }
  };

  return (
    <div className="bg-[#161b22]/80 backdrop-blur-md p-1 rounded-2xl border border-gray-800 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center animate-fade-in-up">
      <div className="bg-[#0d1117] w-full rounded-xl p-6 flex flex-col space-y-6">
        
        {/* Header inside card */}
        <div className="flex items-center space-x-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></div>
            <h2 className="text-gray-400 font-display font-bold uppercase tracking-widest text-sm">Input Source</h2>
        </div>

        {/* Upload Area */}
        <div
            className={`w-full aspect-video rounded-xl border-2 border-dashed flex items-center justify-center transition-all duration-500 relative overflow-hidden group ${
                previewUrl 
                ? 'border-cyan-500/30 bg-gray-900/50' 
                : 'border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800/30 cursor-pointer'
            }`}
            onClick={handleBoxClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {/* Background Grid inside upload box */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            {previewUrl ? (
            <div className="relative w-full h-full p-2">
                <img src={previewUrl} alt="Chart preview" className="object-contain w-full h-full rounded-lg shadow-lg relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg z-20 pointer-events-none"></div>
                {/* Reset Button overlay */}
                <button 
                    onClick={(e) => { e.stopPropagation(); handleBoxClick(); }}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm transition-colors z-30 border border-white/10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>
            ) : (
            <div className="text-center text-gray-500 group-hover:text-cyan-400 transition-colors duration-300 relative z-10">
                <div className="bg-gray-800/50 p-4 rounded-full inline-block mb-4 group-hover:scale-110 transition-transform duration-300 border border-gray-700 group-hover:border-cyan-500/30 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>
                <p className="font-display font-bold text-lg tracking-wide">UPLOAD CHART</p>
                <p className="text-xs mt-1 text-gray-600 font-medium">Drag & Drop or Click to Browse</p>
            </div>
            )}
            <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            />
        </div>
      
        {!analysisComplete && (
            <button
                onClick={onAnalyze}
                disabled={!previewUrl || isLoading}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-display font-bold py-4 px-6 rounded-xl text-xl tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-0.5"
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
                <span className="relative flex items-center justify-center space-x-3">
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-6 w-6 text-white/80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>PROCESSING...</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>INITIATE ANALYSIS</span>
                    </>
                )}
                </span>
            </button>
        )}
      
       {analysisComplete && (
         <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-2 text-green-400 font-display font-bold tracking-wide">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ANALYSIS SUCCESSFUL</span>
            </div>
        </div>
       )}
      </div>
    </div>
  );
};

export default ImageUploader;