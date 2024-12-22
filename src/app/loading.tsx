export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-green-500 space-y-4">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-gray-900 border-t-green-500 rounded-full animate-spin"></div>
      {/* Loading Text */}
      <p className="text-lg font-bold">Loading your vibe...</p>
    </div>
  );
}
