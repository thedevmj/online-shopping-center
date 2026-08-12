import React, { useEffect, useState } from "react";

export const showToast = (message, type = "success", duration = 3200) => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("app-toast", {
      detail: { message, type, duration },
    })
  );
};

export default function ToastContainer() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleToast = (event) => {
      const { message, type = "success", duration = 3200 } = event.detail || {};

      if (!message) return;

      setToast({ message, type });
      const timer = setTimeout(() => setToast(null), duration);

      return () => clearTimeout(timer);
    };

    window.addEventListener("app-toast", handleToast);

    return () => {
      window.removeEventListener("app-toast", handleToast);
    };
  }, []);

  if (!toast) return null;

  const styles = {
    success: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
    error: "border-red-400/40 bg-red-500/15 text-red-200",
    info: "border-blue-400/40 bg-blue-500/15 text-blue-200",
    warning: "border-yellow-400/40 bg-yellow-500/15 text-yellow-200",
  };

  return (
    <div className="fixed right-4 top-20 z-9999 w-[min(92vw,420px)]">
      <div
        className={`rounded-2xl border backdrop-blur-xl px-4 py-3 shadow-2xl ${styles[toast.type] || styles.success}`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 h-2.5 w-2.5 rounded-full ${
              toast.type === "error"
                ? "bg-red-400"
                : toast.type === "warning"
                  ? "bg-yellow-400"
                  : toast.type === "info"
                    ? "bg-blue-400"
                    : "bg-emerald-400"
            }`}
          />
          <p className="text-sm font-medium leading-6">{toast.message}</p>
        </div>
      </div>
    </div>
  );
}
