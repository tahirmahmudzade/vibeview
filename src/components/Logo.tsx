import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-start mb-4">
      <Image src="/main.png" width={100} height={100} alt="VibeView Logo" />
    </div>
  );
}
