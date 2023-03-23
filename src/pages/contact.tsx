import { Hero } from "@/components/dom/Hero";
import dynamic from "next/dynamic";

const ContactScene = dynamic(() => import("@/components/canvas/ContactScene"), { ssr: false });

export default function Page() {
  return (
    <>
      <Hero />
    </>
  );
}

Page.canvas = () => (
  <>
    <ContactScene />
  </>
);

export async function getStaticProps() {
  return { props: { title: "Contact Me - John Beresford - Creative Developer" } };
}
