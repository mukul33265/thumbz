import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import React from "react";
export default function AspectRatioSelector({selectedRatio,setSelectedRatio}) {
  const ratios = ["16:9", "1:1", "9:16"];
  const iconMap = {
    "16:9": <RectangleHorizontal className="size-6" />,
    "1:1": <Square className="size-6" />,
    "9:16": <RectangleVertical className="size-6" />,
  };
  return (
    <div className="space-y-3 dark mb-4">
      <label className="block text-sm font-medium text-zinc-200">
        Aspect Ratio
      </label>
      <div className="flex flex-wrap gap-2">
        {ratios.map((ratio) => (
          <button
            key={ratio}
            onClick={() => setSelectedRatio(ratio)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
              ${
                selectedRatio === ratio
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
              }`}
          >
            {iconMap[ratio]}
            <span>{ratio}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
