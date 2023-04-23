import { GetStaticPropsContext } from "next";
import { WorkDetails } from "@/components/dom/WorkDetails";
import { useStore } from "@/utils/state";
import { Work as WorkType } from "@/utils/state/works";

type Props = {
  work: WorkType;
};

export default function Work({ work }: Props) {
  if (!work) {
    return <></>;
  }

  return <WorkDetails work={work} />;
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<{ props: Props }> {
  const name = context.params.name as string;

  const work = useStore.getState().works[name];

  return {
    props: {
      work,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const works = useStore.getState().works;

  return {
    paths: Object.keys(works).map(name => ({ params: { name } })),
    fallback: false,
  };
}
