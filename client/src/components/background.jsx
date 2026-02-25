import React from "react";

const BackgroundEffect = ({ children }) => {
  return (
    <div className="relative">
      {/* Fixed background */}
      <div className="fixed inset-0 bg-black overflow-hidden pointer-events-none">
        {/* Glow circle 1 */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[120px] rounded-full"></div>

        {/* Glow circle 2 */}
        <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[150px] rounded-full"></div>

        {/* Glow circle 3 */}
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-indigo-500 opacity-10 blur-[120px] rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundEffect;
