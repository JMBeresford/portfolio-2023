import { HomeScene } from "@/components/canvas/HomeScene";
import { World } from "@/components/canvas/World";
import { Hero } from "@/components/dom/Hero";
import { OrbitControls } from "@react-three/drei";

export default function Page() {
  return (
    <>
      <Hero />
    </>
  );
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = () => (
  <>
    {
      <HomeScene />
      /* <OrbitControls /> */
    }
  </>
);

export async function getStaticProps() {
  return { props: { title: "John Beresford - Creative Developer" } };
}
