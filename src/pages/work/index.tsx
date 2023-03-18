import { Cube } from "@/components/canvas/Cube";
import { WorkListScene } from "@/components/canvas/WorkListScene";
import { WorkList } from "@/components/dom/WorkList";

export default function Page() {
  return (
    <>
      <WorkList />
    </>
  );
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = () => <WorkListScene />;

export async function getStaticProps() {
  return { props: { title: "My Work | John Beresford - Creative Developer" } };
}
