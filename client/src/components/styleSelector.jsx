import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function StyleSelector({ selectedStyle, setSelectedStyle }) {
  const [isOpen, setIsOpen] = useState(false);

  const styles = [
    "Bold & Graphic",
    "Minimalist",
    "Photorealistic",
    "Illustrated",
    "Tech/Futuristic",
  ];
  const styleDescriptions = {
    "Bold & Graphic": "High contrast, bold typography, striking visuals",
    Minimalist: "Clean, simple, lots of white space",
    Photorealistic: "Photo-based, natural looking",
    Illustrated: "Hand-drawn, artistic, creative",
    "Tech/Futuristic": "Modern, sleek, tech-inspired",
  };

  return (
    <div className="space-y-3 mb-5">
      <label className="block text-sm font-medium text-zinc-200">
        Thumbnail Style
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition"
        >
          <span>{selectedStyle || "Minimalist"}</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full bottom-full mb-2 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl">
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => {
                  setSelectedStyle(style);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 border-b border-white/10 hover:bg-white/10 transition ${
                  selectedStyle === style
                    ? "bg-purple-600 text-white"
                    : "text-gray-200"
                }`}
              >
                <div className="font-medium">{style}</div>
                <div className="text-xs text-gray-300">
                  {styleDescriptions[style]}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
