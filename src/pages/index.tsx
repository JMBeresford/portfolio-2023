// import { HomeScene } from "@/components/canvas/HomeScene";
import { Hero } from "@/components/dom/Hero";
import dynamic from "next/dynamic";

const HomeScene = dynamic(() => import("@/components/canvas/HomeScene"), { ssr: false });

export default function Page() {
  return (
    <>
      <Hero />
    </>
  );
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = () => <>{<HomeScene />}</>;

export async function getStaticProps() {
  return { props: { title: "John Beresford - Creative Developer" } };
}
