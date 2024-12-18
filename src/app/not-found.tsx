import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="
        grid min-h-screen place-items-center 
        bg-gradient-to-b from-[#0f1b12] to-black 
        px-6 py-24 sm:py-32 lg:px-8
      "
    >
      <div className="text-center">
        {/* 404 */}
        <p className="text-base font-semibold text-green-400">404</p>

        {/* Page not found */}
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg text-gray-300">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="
              rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold 
              text-white shadow-md hover:bg-green-500 transition-all 
              focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-green-600
            "
          >
            Go Back Home
          </Link>
          {/* <Link
            href="/contact"
            className="text-sm font-semibold text-gray-300 hover:text-white"
          >
            Contact Support &rarr;
          </Link> */}
        </div>
      </div>
    </main>
  );
}
