import React, { useState, useEffect } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
import { LoginUser } from "../api/bookapi";

export default function LoginForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const savedLoginData = localStorage.getItem("rememberMeData");
    if (savedLoginData) {
      try {
        const { email: savedEmail, expiresAt } = JSON.parse(savedLoginData);
      
        if (new Date().getTime() < expiresAt) {
          setEmail(savedEmail);
          setRememberMe(true);
        } else {
        
          localStorage.removeItem("rememberMeData");
        }
      } catch (err) {
        // Silently handle any errors loading saved data
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await LoginUser({ email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onClose(()=>{setShowLogin(true)});

   
      if (rememberMe) {
        const loginData = {
          email: email,
          expiresAt: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
        };
        localStorage.setItem("rememberMeData", JSON.stringify(loginData));
      } else {
       
        localStorage.removeItem("rememberMeData");
      }

      alert("Login successful!");
      navigate("/shopping");
      if (onClose) onClose(true);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-r from-emerald-400/20 to-emerald-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-linear-to-r from-blue-400/20 to-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-linear-to-r from-purple-400/20 to-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md z-10">
        
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
              title="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}

          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-linear-to-br from-emerald-400 to-emerald-500 rounded-2xl mb-6 shadow-lg">
              <LockClosedIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-white/80">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white/90 mb-3"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-white/60 group-focus-within:text-emerald-300 transition-colors duration-300">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white/90 mb-3"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-white/60 group-focus-within:text-emerald-300 transition-colors duration-300">
                  <LockClosedIcon className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <a
                href="#"
                className="text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors duration-300"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-linear-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed transform hover:scale-105 backdrop-blur-sm border border-white/20"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full mt-3 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 border border-gray-300"
              >
                Cancel
              </button>
            )}
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="py-2.5 px-4 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-sm">
              Google
            </button>
            <button className="py-2.5 px-4 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-sm">
              GitHub
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
            >
              Sign up
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
          >
            Terms of Service
          </a>
        </p>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
