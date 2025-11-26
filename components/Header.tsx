
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#161b22] border-b border-gray-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative z-50">
      <div className="container mx-auto px-4 py-5 flex justify-center items-center">
        <div className="flex items-center space-x-4 group cursor-pointer select-none">
            {/* Animated Icon Container */}
            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-[#0d1117] rounded-full p-2.5 border border-gray-700/50 shadow-inner group-hover:border-cyan-500/30 transition-colors duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-cyan-400 group-hover:scale-110 transition-transform duration-300 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
            </div>
            
            {/* Text Logo */}
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-none">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-sm">
                        AI TRADING
                    </span>
                    <span className="ml-2 text-gray-200">ANALYZER</span>
                </h1>
                <div className="flex items-center mt-1 space-x-2">
                    <div className="h-0.5 w-8 bg-cyan-500 rounded-full opacity-50"></div>
                    <span className="text-[10px] md:text-[11px] text-gray-500 font-bold tracking-[0.3em] uppercase">
                        Precision Signals
                    </span>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
