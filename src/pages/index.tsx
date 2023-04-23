import { Hero } from "@/components/dom/Hero";

export default function Page() {
  return (
    <>
      <Hero />
    </>
  );
}

export async function getStaticProps() {
  return { props: { title: "John Beresford - Creative Developer" } };
}
