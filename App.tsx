
import React, { useState, useCallback } from 'react';
import { AnalysisResult } from './types';
import { analyzeChart } from './geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AnalysisDisplay from './components/AnalysisDisplay';
import LogicModal from './components/LogicModal';

export default function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showLogicModal, setShowLogicModal] = useState<boolean>(false);
  const [analysisKey, setAnalysisKey] = useState<number>(0);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      setError(null);
      setAnalysisKey(prev => prev + 1); // Reset animation key
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeChart(selectedImage);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage]);

  const handleAnalyzeAnother = () => {
      setSelectedImage(null);
      setPreviewUrl(null);
      setAnalysisResult(null);
      setError(null);
      setAnalysisKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0b0e14] to-black text-gray-200 font-sans flex flex-col selection:bg-cyan-500/30">
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex-grow relative z-10">
        
        {/* Subtle Background Grid Effect */}
        <div className="absolute inset-0 z-[-1] opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-6">
          <ImageUploader
            previewUrl={previewUrl}
            onImageChange={handleImageChange}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            analysisComplete={!!analysisResult}
          />
          <AnalysisDisplay
            key={analysisKey}
            result={analysisResult}
            isLoading={isLoading}
            error={error}
            onViewLogic={() => setShowLogicModal(true)}
            onAnalyzeAnother={handleAnalyzeAnother}
          />
        </div>
        
        {/* ENHANCED FOOTER */}
        <footer className="mt-24 pt-10 border-t border-gray-800/50 flex flex-col items-center justify-center text-center pb-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent"></div>
            
            {/* Branding */}
            <div className="mb-10 transform hover:scale-105 transition-transform duration-300">
                <span className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase font-display">Powering Trades by</span>
                <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-display font-bold text-3xl tracking-wide drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]">
                    TRADERS TONIC
                </span>
            </div>

            {/* Telegram Button */}
            <a 
                href="https://t.me/traderstonic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 ease-out bg-gradient-to-r from-[#0088cc] to-[#00aaff] rounded-xl shadow-[0_0_20px_rgba(0,136,204,0.3)] hover:shadow-[0_0_50px_rgba(0,136,204,0.6)] hover:-translate-y-1 overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine skew-x-12" />
                <svg className="w-7 h-7 mr-3 fill-current relative z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span className="text-xl font-display tracking-wide relative z-10">JOIN TELEGRAM CHANNEL</span>
            </a>

            {/* Warning Message */}
            <div className="mt-12 max-w-3xl mx-auto px-4">
                 <div className="backdrop-blur-sm bg-[#161b22]/60 border border-red-500/20 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                        <span className="text-red-400 font-bold uppercase block mb-2 tracking-widest text-[10px]">⚠️ Risk Disclosure</span>
                        Trading financial markets involves high risk and may not be suitable for all investors. 
                        The signals generated by this AI system are for <span className="text-gray-200">educational purposes only</span>. 
                        We do not accept liability for any loss or damage which may arise directly or indirectly from the use of such information.
                        <span className="block mt-2 font-semibold text-gray-300">Trade responsibly.</span>
                    </p>
                </div>
            </div>
        </footer>

      </main>
      {showLogicModal && analysisResult && (
        <LogicModal
          logic={analysisResult.logic}
          onClose={() => setShowLogicModal(false)}
        />
      )}
    </div>
  );
}
