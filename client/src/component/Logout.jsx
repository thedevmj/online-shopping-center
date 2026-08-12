import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../config";

export default function Logout({ isOpen, onClose }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = async() => {
    setIsLoggingOut(true);

     await fetch(buildApiUrl("/auth/user/logout"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    setTimeout(() => {
      setIsLoggingOut(false);
      onClose();
      localStorage.removeItem("user");
      navigate("/");
    }, 500);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleCancel} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <DialogPanel
          transition
          className="w-full max-w-md transform rounded-3xl backdrop-blur-xl bg-linear-to-br from-slate-800/95 via-slate-900/95 to-slate-900/95 shadow-2xl border border-emerald-500/30 transition-all duration-300 overflow-hidden"
        >
          <div className="relative pt-8 px-6 text-center">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-emerald-400 to-transparent" />

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-xl bg-red-500/20 border border-red-500/30 animate-pulse">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Confirm Logout
            </h2>
            <p className="text-slate-300 text-sm">
              Are you sure you want to log out? You'll need to log in again to
              access your account.
            </p>
          </div>

          <div className="px-6 py-6">
            <div className="space-y-3 rounded-2xl backdrop-blur-xl bg-slate-700/30 border border-slate-600/50 p-4">
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  Your cart and wishlist will be saved safely
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  You can log back in anytime with your credentials
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 px-6 pb-6">
            <button
              onClick={handleCancel}
              disabled={isLoggingOut}
              className="flex-1 px-4 py-3 rounded-xl font-semibold text-slate-300 backdrop-blur-xl bg-slate-700/50 border border-slate-600/50 hover:bg-slate-700/70 hover:text-white hover:border-slate-500/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/80"
            >
              No, Stay
            </button>
            <button
              onClick={handleConfirmLogout}
              disabled={isLoggingOut}
              className="flex-1 px-4 py-3 rounded-xl font-semibold text-white backdrop-blur-xl bg-linear-to-r from-red-500/40 to-red-600/40 border border-red-500/50 hover:from-red-500/60 hover:to-red-600/60 hover:border-red-500/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/80 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoggingOut ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
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
                    Logging out...
                  </>
                ) : (
                  <>
                    <span>Yes, Logout</span>
                  </>
                )}
              </span>
              
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-500" />
            </button>
          </div>

          {/* Footer accent */}
          <div className="h-1 bg-linear-to-r from-transparent via-red-400/30 to-transparent" />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
