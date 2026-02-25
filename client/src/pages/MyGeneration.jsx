import React, { useEffect, useState } from "react";
import BackgroundEffect from "../components/background";
import api from "../configs/api";
import { toast } from "react-hot-toast";
import { Trash2, Download } from "lucide-react";

const MyGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState({});
  const [thumbnail, setThumbnail] = useState([]);

  const fetchThumbnails = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/user/thumbnails");
      if (response.data.thumbnail) {
        setThumbnail(response.data.thumbnail);
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

  const handleDownload = (image_url) => {
    window.open(image_url, "_blank");
  };

  const handleDelete = async (id) => {
    try {
      setDeleting((prev) => ({ ...prev, [id]: true }));
      const response = await api.delete(`/api/thumbnail/delete/${id}`);
      toast.success("Thumbnail deleted successfully");
      setThumbnail((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete thumbnail",
      );
    } finally {
      setDeleting((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <BackgroundEffect>
      <div className="mt-10 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-200">My Generations</h1>
          <p className="text-sm text-zinc-400 mt-1">
            View and manage all your AI-generated thumbnails
          </p>
        </div>
        {/* loading state  */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]"
              />
            ))}
          </div>
        )}
        {/* empty state */}
        {!loading && thumbnail.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-zinc-200">
              No Thumbnails yet
            </h3>
            <p className="text-sm text-zinc-400 mt-2">
              Generate your first thumbnail to see it here
            </p>
          </div>
        )}

        {/* grid */}
        {!loading && thumbnail.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {thumbnail.map((thumb) => (
              <div
                key={thumb._id}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden group hover:border-purple-500/50 transition"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={thumb.image_url}
                    alt={thumb.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition">
                    <button
                      onClick={() => handleDownload(thumb.image_url)}
                      className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full transition"
                      title="Download"
                    >
                      <Download size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(thumb._id)}
                      disabled={deleting[thumb._id]}
                      className="p-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-full transition"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {thumb.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1">
                    {thumb.style} • {thumb.aspect_ratio}
                  </p>
                  <p className="text-zinc-500 text-xs mt-2">
                    {new Date(thumb.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BackgroundEffect>
  );
};

export default MyGeneration;

// 2:30 hour in the video for ui
