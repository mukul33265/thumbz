import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.success) {
      navigate("/generate");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-slate-900 text-slate-300 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/30 flex-col justify-center items-center border border-slate-800">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Create your account
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            className="w-full bg-slate-800 border my-3 border-slate-700 outline-none rounded-full py-2.5 px-4 text-white placeholder:text-slate-400"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            id="email"
            className="w-full bg-slate-800 border my-3 border-slate-700 outline-none rounded-full py-2.5 px-4 text-white placeholder:text-slate-400"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="password"
            className="w-full bg-slate-800 border mt-1 border-slate-700 outline-none rounded-full py-2.5 px-4 text-white placeholder:text-slate-400"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-right py-4">
            <a className="text-indigo-400 underline" href="#">
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mb-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition py-2.5 rounded-full text-white font-semibold flex items-center justify-center gap-2"
          >
            {loading && <Loader size={18} className="animate-spin" />}
            {loading ? "Creating account..." : "Signup"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 underline">
            Log in
          </Link>
        </p>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center mt-5 bg-slate-800 py-2.5 rounded-full text-white border border-slate-700 hover:bg-slate-700 transition"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png"
            alt="appleLogo"
          />
          Signup with Apple
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-slate-900 border border-slate-700 py-2.5 rounded-full text-slate-200 hover:bg-slate-800 transition"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Signup with Google
        </button>
      </div>
    </div>
  );
}
