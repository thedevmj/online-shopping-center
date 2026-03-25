import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { createUser } from "../api/bookapi";

export default function Signup({ onClose }) {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   setIsLoading(true);

    try {
       
      await createUser(formData);
      console.log("Submitting:", formData);
      alert("User added successfully!");
    } catch (error) {
     console.log("error ",error);
     
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-emerald-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl mb-6 shadow-lg">
              <LockClosedIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-white/80">Join ShopHub today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-3">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-white/60">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-white/60">
                  <LockClosedIcon className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 text-emerald-400 focus:ring-emerald-400 cursor-pointer bg-white/10"
                />
                <span className="ml-3 text-sm text-white/80">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed transform hover:scale-105 backdrop-blur-sm border border-white/20"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full mt-4 py-3 px-6 backdrop-blur-xl bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 rounded-2xl font-semibold transition-all duration-300"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
