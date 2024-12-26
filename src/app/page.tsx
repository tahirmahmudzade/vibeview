import Logo from "@/components/Logo";
import Header from "@/components/Header";
import ButtonActions from "@/components/ButtonActions";
import HeroImage from "@/components/HeroImage";
import InstallAlertClient from "@/components/InstallAlertClient";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col lg:flex-row bg-gradient-to-r from-green-800 via-green-900 to-black overflow-hidden">
      {/* Install Alert */}
      <InstallAlertClient />
      {/* Left Section */}
      <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:w-1/2">
        <div className="mx-auto max-w-lg lg:mx-0 space-y-6">
          <div className="space-y-2">
            <Logo />
            <Header />
          </div>
          <div className="mt-8 flex items-center gap-x-6">
            <ButtonActions />
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <HeroImage />
    </div>
  );
}
