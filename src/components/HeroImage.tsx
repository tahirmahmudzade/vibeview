import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative w-full flex-grow min-h-[50vh] lg:w-1/2">
      <Image
        src="/hero.jpg"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        alt="Spotify Stats Overview"
        className="object-cover"
      />
    </div>
  );
}
