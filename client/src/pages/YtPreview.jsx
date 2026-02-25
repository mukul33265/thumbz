import React, { useEffect, useState } from "react";
import BackgroundEffect from "../components/background";
import api from "../configs/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

export default function YtPreview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  const fetchThumbnails = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/user/thumbnails");
      if (response.data.thumbnail && response.data.thumbnail.length > 0) {
        setThumbnails(response.data.thumbnail);
        setSelectedThumbnail(response.data.thumbnail[0]);
        setSelectedIndex(0);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch thumbnails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThumbnails();
  }, []);

  const handlePrevious = () => {
    const newIndex =
      selectedIndex === 0 ? thumbnails.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedThumbnail(thumbnails[newIndex]);
  };

  const handleNext = () => {
    const newIndex =
      selectedIndex === thumbnails.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedThumbnail(thumbnails[newIndex]);
  };

  const handleDownload = () => {
    if (selectedThumbnail?.image_url) {
      window.open(selectedThumbnail.image_url, "_blank");
    }
  };

  if (loading) {
    return (
      <BackgroundEffect>
        <div className="mt-20 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-center">
          <div className="animate-spin">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full" />
          </div>
        </div>
      </BackgroundEffect>
    );
  }

  if (thumbnails.length === 0) {
    return (
      <BackgroundEffect>
        <div className="mt-20 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              No Thumbnails Yet
            </h2>
            <p className="text-gray-400 mb-6">
              Generate a thumbnail first to preview it on YouTube
            </p>
            <button
              onClick={() => navigate("/generate")}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-lg"
            >
              Create Thumbnail
            </button>
          </div>
        </div>
      </BackgroundEffect>
    );
  }

  return (
    <BackgroundEffect>
      <div className="mt-10 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 pb-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              YouTube Preview
            </h1>
            <p className="text-gray-400">
              See how your thumbnail looks on YouTube
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* YouTube-like Preview */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-lg overflow-hidden">
                {/* Video Container */}
                <div className="aspect-video bg-black relative group">
                  <img
                    src={selectedThumbnail?.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/30 transition">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition">
                      <svg
                        className="w-8 h-8 text-white fill-current ml-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4 bg-zinc-900">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    {selectedThumbnail?.title}
                  </h2>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Sample Channel • 2 hours ago</span>
                    <span>1.2M views</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {selectedThumbnail?.user_prompt ||
                      "Your video description would go here..."}
                  </p>
                </div>
              </div>

              {/* Preview Info */}
              <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">
                  Thumbnail Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Style</p>
                    <p className="text-white font-medium">
                      {selectedThumbnail?.style}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Aspect Ratio</p>
                    <p className="text-white font-medium">
                      {selectedThumbnail?.aspect_ratio}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Color Scheme</p>
                    <p className="text-white font-medium capitalize">
                      {selectedThumbnail?.color_scheme}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Created</p>
                    <p className="text-white font-medium">
                      {new Date(
                        selectedThumbnail?.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Thumbnail List */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sticky top-20">
                <h3 className="text-white font-semibold mb-4">
                  Your Thumbnails
                </h3>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {thumbnails.map((thumb, index) => (
                    <button
                      key={thumb._id}
                      onClick={() => {
                        setSelectedIndex(index);
                        setSelectedThumbnail(thumb);
                      }}
                      className={`w-full rounded-lg overflow-hidden border-2 transition ${
                        selectedIndex === index
                          ? "border-purple-500"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="aspect-video bg-black overflow-hidden">
                        <img
                          src={thumb.image_url}
                          alt={thumb.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 bg-zinc-900">
                        <p className="text-white text-xs font-medium truncate">
                          {thumb.title}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {new Date(thumb.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {thumbnails.length > 1 && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-lg"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              <span className="text-gray-400">
                {selectedIndex + 1} / {thumbnails.length}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-lg"
                >
                  <Download size={20} />
                  Download
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-lg"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Single Thumbnail Download */}
          {thumbnails.length === 1 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 transition text-white rounded-lg"
              >
                <Download size={20} />
                Download Thumbnail
              </button>
            </div>
          )}
        </div>
      </div>
    </BackgroundEffect>
  );
}
