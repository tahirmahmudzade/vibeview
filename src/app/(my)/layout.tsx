// import NowPlaying from "@/components/NowPlaying";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {/* <NowPlaying /> */}
    </div>
  );
}
