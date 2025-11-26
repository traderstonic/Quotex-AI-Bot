
import React from 'react';
import { AnalysisResult, Signal, Trend, SignalType } from '../types';

interface AnalysisDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  onViewLogic: () => void;
  onAnalyzeAnother: () => void;
}

const SignalCard: React.FC<{ signal: Signal; signalType: SignalType; confidence: number; mtgInstruction: string }> = ({ signal, signalType, confidence, mtgInstruction }) => {
    const isCall = signal === Signal.CALL;
    const isNeutral = signal === Signal.NEUTRAL;
    const isNonMtg = signalType === 'NON_MTG';
    
    let colorClass = 'text-gray-400';
    let gradientClass = 'from-gray-800 to-gray-900';
    let borderClass = 'border-gray-700';
    let shadowClass = '';
    let icon = null;

    if (isCall) {
        colorClass = 'text-green-400';
        gradientClass = isNonMtg 
            ? 'from-green-900 via-green-800 to-black' 
            : 'from-blue-900 via-blue-800 to-black'; 
        borderClass = isNonMtg ? 'border-green-400' : 'border-blue-400';
        shadowClass = isNonMtg 
            ? 'shadow-[0_0_60px_-10px_rgba(74,222,128,0.5)]' 
            : 'shadow-[0_0_60px_-10px_rgba(96,165,250,0.5)]';
        icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
    } else if (signal === Signal.PUT) {
        colorClass = 'text-red-500';
        gradientClass = isNonMtg 
            ? 'from-red-900 via-red-800 to-black' 
            : 'from-orange-900 via-orange-800 to-black';
        borderClass = isNonMtg ? 'border-red-500' : 'border-orange-500';
        shadowClass = isNonMtg 
            ? 'shadow-[0_0_60px_-10px_rgba(248,113,113,0.5)]' 
            : 'shadow-[0_0_60px_-10px_rgba(251,146,60,0.5)]';
        icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>;
    } else {
        gradientClass = 'from-gray-800/60 to-gray-900/60';
        icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>;
    }

    return (
        <div className={`relative overflow-hidden rounded-2xl border ${borderClass} bg-gradient-to-br ${gradientClass} p-8 ${shadowClass} transition-all duration-500 transform hover:scale-[1.02]`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {!isNeutral && (
                <div className={`absolute top-0 right-0 text-[11px] font-black px-4 py-1.5 rounded-bl-2xl shadow-lg z-20 tracking-wider flex items-center gap-1 ${isNonMtg ? 'bg-[#FFD700] text-black' : 'bg-blue-600 text-white'}`}>
                    {isNonMtg ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                            SNIPER (NON-MTG)
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                            1-STEP MTG
                        </>
                    )}
                </div>
            )}

            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
                <div className={`p-4 rounded-full bg-black/30 backdrop-blur-sm border ${borderClass}`}>
                    <div className={colorClass}>{icon}</div>
                </div>
                
                <div>
                    <h3 className="text-gray-400 font-display text-sm tracking-[0.3em] uppercase mb-1">AI Prediction</h3>
                    <h1 className={`text-6xl md:text-7xl font-display font-bold tracking-tighter ${colorClass} drop-shadow-2xl`}>
                        {signal}
                    </h1>
                </div>

                <div className="w-full max-w-xs">
                    <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                        <span>Win Probability</span>
                        <span>{confidence}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-700 relative">
                        {/* Striped animation for Non-MTG */}
                        {isNonMtg && <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,215,0,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:1rem_1rem] animate-[spin_1s_linear_infinite]"></div>}
                        <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                isNeutral ? 'bg-gray-500' :
                                isNonMtg 
                                    ? (isCall ? 'bg-gradient-to-r from-green-500 to-emerald-300' : 'bg-gradient-to-r from-red-500 to-rose-300') 
                                    : (isCall ? 'bg-gradient-to-r from-blue-600 to-cyan-400' : 'bg-gradient-to-r from-orange-600 to-yellow-400')
                            }`} 
                            style={{ width: `${confidence}%` }}
                        ></div>
                    </div>
                </div>
                
                {/* MTG INSTRUCTION BOX */}
                {!isNeutral && (
                    <div className={`mt-4 w-full p-3 rounded-lg border text-left text-xs ${isNonMtg ? 'bg-green-900/20 border-green-500/30' : 'bg-blue-900/20 border-blue-500/30'}`}>
                        <div className="flex items-start gap-2">
                             <span className="text-lg">💡</span>
                             <div>
                                 <strong className={`uppercase block mb-1 ${isNonMtg ? 'text-green-400' : 'text-blue-400'}`}>
                                     {isNonMtg ? 'Sniper Execution' : 'Martingale Guide'}
                                 </strong>
                                 <p className="text-gray-300 leading-tight">{mtgInstruction}</p>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const InfoCard: React.FC<{ title: string; value: string; icon: React.ReactNode; accent?: string }> = ({ title, value, icon, accent = "border-cyan-500" }) => (
    <div className={`bg-[#0d1117]/80 backdrop-blur-sm p-4 rounded-xl border-l-4 ${accent} border-y border-r border-gray-800 shadow-lg flex items-center justify-between group hover:bg-[#161b22] transition-colors`}>
        <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{title}</p>
            <p className="font-display font-bold text-lg md:text-xl text-gray-100">{value}</p>
        </div>
        <div className="text-gray-600 group-hover:text-cyan-400 transition-colors">
            {icon}
        </div>
    </div>
);

const SkeletonLoader: React.FC = () => (
    <div className="bg-[#161b22]/50 backdrop-blur-md p-1 rounded-2xl border border-gray-800 shadow-2xl h-full">
        <div className="bg-[#0d1117] w-full h-full rounded-xl p-6 flex flex-col space-y-6 animate-pulse">
            <div className="h-6 w-32 bg-gray-800 rounded"></div>
            <div className="h-64 bg-gray-800/50 rounded-2xl border border-gray-800"></div>
            <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-gray-800/50 rounded-xl"></div>
                <div className="h-20 bg-gray-800/50 rounded-xl"></div>
                <div className="h-20 bg-gray-800/50 rounded-xl"></div>
                <div className="h-20 bg-gray-800/50 rounded-xl"></div>
            </div>
        </div>
    </div>
);


const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, isLoading, error, onViewLogic, onAnalyzeAnother }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
        <div className="bg-[#161b22]/80 backdrop-blur-md p-8 rounded-2xl border border-red-500/30 flex flex-col items-center justify-center text-center h-full">
            <div className="bg-red-500/10 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">Analysis Failed</h3>
            <p className="mt-2 text-sm text-red-400 max-w-xs mx-auto">{error}</p>
            <button onClick={onAnalyzeAnother} className="mt-8 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-red-500/30">
                Retry Analysis
            </button>
        </div>
    );
  }

  if (!result) {
    return (
        <div className="bg-[#161b22]/60 backdrop-blur-sm p-1 rounded-2xl border border-gray-800/50 shadow-2xl h-full min-h-[500px] flex flex-col items-center justify-center text-center group">
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-cyan-500 blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-700 group-hover:text-cyan-500/50 transition-colors duration-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
             </div>
            <h3 className="text-2xl font-display font-bold text-gray-300 tracking-wide">TITAN AI READY</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-xs leading-relaxed">Upload a clear chart. The AI will apply the <span className="text-cyan-400 font-bold">Devil's Advocate Protocol</span> to find the perfect entry.</p>
        </div>
    );
  }

  return (
    <div className="bg-[#161b22]/80 backdrop-blur-md p-1 rounded-2xl border border-gray-800 shadow-2xl animate-fade-in-up">
        <div className="bg-[#0b0e14] rounded-xl p-6 space-y-6">
            
            {/* Asset Header */}
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Analyzed Asset</p>
                    <h2 className="text-2xl font-display font-bold text-white tracking-wide flex items-center gap-2">
                        {result.pair || "Unknown Asset"}
                        <span className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded border border-gray-700">{result.timeframe || "M?"}</span>
                    </h2>
                </div>
                <div className="flex flex-col items-end">
                     <div className="flex items-center space-x-2">
                        <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                        </span>
                        <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest">Titan V2 Active</span>
                    </div>
                </div>
            </div>

            {/* Main Signal */}
            <SignalCard 
                signal={result.signal} 
                signalType={result.signalType} 
                confidence={result.confidence}
                mtgInstruction={result.mtgInstruction} 
            />
            
            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard 
                    title="Market Trend" 
                    value={result.trend} 
                    accent={result.trend === Trend.UPTREND ? 'border-green-500' : result.trend === Trend.DOWNTREND ? 'border-red-500' : 'border-yellow-500'}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>} 
                />
                <InfoCard 
                    title="Candle Psychology" 
                    value={result.previousCandlePower} 
                    accent="border-purple-500"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                />
                <InfoCard 
                    title="Key Support" 
                    value={result.support} 
                    accent="border-blue-500"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                />
                <InfoCard 
                    title="Key Resistance" 
                    value={result.resistance} 
                    accent="border-orange-500"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>}
                />
            </div>
            
            {/* Logic Preview (Short) */}
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-2">Titan Analysis Log</p>
                <p className="text-gray-300 text-sm line-clamp-2">{result.logic}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
                <button onClick={onViewLogic} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-200 font-display font-bold py-3 rounded-lg transition-colors border border-gray-700 hover:border-gray-500">
                    FULL LOGIC
                </button>
                 <button onClick={onAnalyzeAnother} className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-display font-bold py-3 rounded-lg transition-colors shadow-lg hover:shadow-cyan-500/20">
                    SCAN NEW CHART
                </button>
            </div>
        </div>
    </div>
  );
};


export default AnalysisDisplay;
