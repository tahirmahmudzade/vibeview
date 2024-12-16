import Logo from "@/components/Logo";
import Header from "@/components/Header";
import ButtonActions from "@/components/ButtonActions";
import HeroImage from "@/components/HeroImage";

export default function Home() {
  return (
    <div className="relative bg-gradient-to-r from-green-500 to-black h-screen flex flex-col gap-y-8 lg:gap-y-0 lg:flex-row">
      <div className="px-6 sm:px-8 sm:py-12 xs:px-8 xs:py-12 lg:px-12 flex flex-col justify-center lg:w-1/2">
        <div className="mx-auto max-w-lg lg:mx-0">
          <Logo />

          <Header />
          <div className="mt-6 flex items-center gap-x-6">
            <ButtonActions />
          </div>
        </div>
      </div>

      <HeroImage />
    </div>
  );
}
