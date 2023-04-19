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

Page.canvas = () => <></>;

export async function getStaticProps() {
  return { props: { title: "John Beresford - Creative Developer" } };
}
