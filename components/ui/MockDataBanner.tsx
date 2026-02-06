"use client";

import { motion } from "framer-motion";
import { AlertCircle, Info } from "lucide-react";

interface MockDataBannerProps {
  variant?: "info" | "warning";
}

export function MockDataBanner({ variant = "info" }: MockDataBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-[100] ${
        variant === "warning"
          ? "bg-gradient-to-r from-amber-500 to-orange-500"
          : "bg-gradient-to-r from-blue-600 to-indigo-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-3 text-white">
        {variant === "warning" ? (
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
        ) : (
          <Info className="w-5 h-5 flex-shrink-0" />
        )}
        <p className="text-sm font-medium">
          <span className="font-bold">Demo Mode:</span> This application is displaying mock data for demonstration purposes.
        </p>
      </div>
    </motion.div>
  );
}

// Floating disclaimer badge for dashboard pages
export function MockDataBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50 px-3 py-1.5 bg-amber-100 border border-amber-300 rounded-full shadow-lg flex items-center gap-2"
    >
      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
      <span className="text-xs font-medium text-amber-800">Demo Data</span>
    </motion.div>
  );
}
