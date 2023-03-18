import { WorkScene } from "@/components/canvas/WorkScene";
import { WorkDetails } from "@/components/dom/WorkDetails";
import { store } from "@/utils/store";
import { useRouter } from "next/router";

export default function Work() {
  const router = useRouter();
  const { name } = router.query;

  const work = store.works[name as string];

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
  const router = useRouter();
  const { name } = router.query;

  const work = store.works[name as string];

  return (
    <>
      <WorkScene work={work} />
    </>
  );
};
