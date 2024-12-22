import Logo from "@/components/Logo";
import Header from "@/components/Header";
import ButtonActions from "@/components/ButtonActions";
import HeroImage from "@/components/HeroImage";

export default async function Home() {
  const envVariables = {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_SPOTIFY_ID: process.env.AUTH_SPOTIFY_ID,
    AUTH_SPOTIFY_SECRET: process.env.AUTH_SPOTIFY_SECRET,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  };

  return (
    <div className="relative h-screen flex flex-col lg:flex-row bg-gradient-to-r from-green-800 via-green-900 to-black overflow-hidden">
      {/* Left Section */}
      <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:w-1/2">
        <div className="mx-auto max-w-lg lg:mx-0 space-y-6">
          <Logo />
          <Header />
          <div className="mt-8 flex items-center gap-x-6">
            <ButtonActions />
          </div>

          {/* Environment Variables Section */}
          <div className="mt-12 bg-gray-800 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Environment Variables</h2>
            <ul className="space-y-2">
              {Object.entries(envVariables).map(([key, value]) => (
                <li
                  key={key}
                  className="flex justify-between items-center bg-gray-700 px-4 py-2 rounded-md"
                >
                  <span className="font-medium">{key}</span>
                  <span className="text-sm text-gray-300">
                    {value || "Not Set"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <HeroImage />
    </div>
  );
}
