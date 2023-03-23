import { WorkScene } from "@/components/canvas/WorkScene";
import { WorkDetails } from "@/components/dom/WorkDetails";
import { useStore } from "@/utils/state";
import { useRouter } from "next/router";

export default function Work() {
  const router = useRouter();
  const { name } = router.query;
  const works = useStore(s => s.works);

  const work = works[name as string];

  if (!work) {
    return <></>;
  }

  return (
    <>
      <WorkDetails work={work} />
    </>
  );
}

Work.canvas = function Scene() {
  return (
    <>
      <WorkScene />
    </>
  );
};
