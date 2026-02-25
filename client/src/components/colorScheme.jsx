import React, { useState } from "react";

export default function ColorScheme({colorScheme,setColorScheme}) {
  

  const colorSchemes = {
    Sunset: {
      colors: ["#FF6B6B", "#FFA07A"],
      description: "Warm reds, oranges, and pink tones",
    },
    Ocean: {
      colors: ["#00BCD4", "#0097A7"],
      description: "Cool blues and teal shades",
    },
    Forest: {
      colors: ["#4CAF50", "#81C784"],
      description: "Natural greens and earthy tones",
    },
    Purple: {
      colors: ["#9C27B0", "#CE93D8"],
      description: "Vibrant purple and violet hues",
    },
    Slate: {
      colors: ["#424242", "#9E9E9E"],
      description: "Dark gray and muted tones",
    },
    Neon: {
      colors: ["#FF1493", "#FFFF00"],
      description: "Bright, high-contrast neon colors",
    },
    "Soft Pastel": {
      colors: ["#FFB3BA", "#FFDFBA"],
      description: "Light, soft, pastel shades",
    },
  };

  return (
    <div className="space-y-3 mb-6">
      <label className="block text-sm font-medium text-zinc-200">
        Color Scheme
      </label>
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(colorSchemes).map(([name, { colors }]) => (
          <button
            key={name}
            onClick={() => setColorScheme(name)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition ${
              colorScheme === name
                ? "border-white/40 bg-white/10"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex gap-1">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-4 h-6 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-400">
        Selected: <span className="text-gray-200">{colorScheme}</span>
      </div>
    </div>
  );
}
