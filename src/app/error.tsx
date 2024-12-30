"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

type ErrorProps = { error: Error & { digest?: string }; reset: () => void };

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center h-screen  text-white text-center"
    >
      {/* Error Icon */}
      <div className="bg-red-500 text-white rounded-full p-4 mb-6 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 4h.01M9.75 20.98a8.996 8.996 0 01-5.75-11.37 9.003 9.003 0 0116.5 0 8.996 8.996 0 01-5.75 11.37M9.75 20.98a9.003 9.003 0 005.5 0"
          />
        </svg>
      </div>

      {/* Error Message */}
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-6 text-gray-400">
        An unexpected error has occurred. Don’t worry, we’re on it.
      </p>

      {/* Retry Button */}
      <button
        onClick={reset}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
      >
        Try Again
      </button>
    </motion.div>
  );
}
