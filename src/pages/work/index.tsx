import { WorkList } from "@/components/dom/WorkList";

export default function Page() {
  return <WorkList />;
}

export async function getStaticProps() {
  return { props: { title: "My Work | John Beresford - Creative Developer" } };
}
