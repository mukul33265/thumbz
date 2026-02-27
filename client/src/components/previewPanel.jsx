import { DownloadIcon, Loader2Icon, ImageIcon } from "lucide-react";
import React from "react";
export default function PreviewPanel({ thumbnail, loading, selectedRatio }) {
  const aspectClasses = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };
  const onDownload = async() => {
    if (!thumbnail?.image_url) return;
    try {
    const response = await fetch(thumbnail.image_url);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `thumbnail-${Date.now()}.png`; // file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
  };

  return (
    <div
      className="bg-white/5 backdrop-blur-xl border border-white/10 
                        rounded-2xl p-6 shadow-xl"
    >
      <div className="relative mx-auto w-full max-w-2xl">
        <div
          className={`relative overflow-hidden group ${aspectClasses[selectedRatio]}`}
        >
          {/* Loading state */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40">
              <Loader2Icon className="size-8 animate-spin text-zinc-400" />
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-200">
                  AI is creating your thumbnail...
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  This may take 10-20 seconds
                </p>
              </div>
            </div>
          )}

          {/* Image preview */}
          {!loading && thumbnail?.image_url && (
            <>
              <img
                src={thumbnail.image_url}
                alt="Generated thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={onDownload}
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100 active:scale-95"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download Thumbnail
                </button>
              </div>
            </>
          )}

          {/* Initial state */}
          {!loading && !thumbnail?.image_url && (
            <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-white/20 bg-black/25">
              <div className="max-sm:hidden flex size-20 items-center justify-center rounded-full bg-white/10">
                <ImageIcon className="size-10 text-white opacity-50" />
              </div>

              <div className="px-4 text-center">
                <p className="font-medium text-zinc-200">
                  Generate your first thumbnail
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Fill out the form and click Generate
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
