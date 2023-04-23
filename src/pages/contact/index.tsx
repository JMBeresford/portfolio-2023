import { Contact } from "@/components/dom/Contact";

export default function Page() {
  return <Contact />;
}

export async function getStaticProps() {
  return { props: { title: "Contact Me - John Beresford - Creative Developer" } };
}
