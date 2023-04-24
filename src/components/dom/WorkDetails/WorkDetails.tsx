import Link from "next/link";
import styles from "./WorkDetails.module.scss";
import type { Work } from "@/utils/state/works";
import { Images } from "./Images";
import { useStore } from "@/utils/state";
import { hoverHandlers } from "@/utils";

type Props = {
  work: Work;
};

export function WorkDetails(props: Props) {
  const colorScheme = useStore(s => s.colors.colorScheme);

  return (
    <div className={styles.workdetails}>
      <Link href={"/work"} {...hoverHandlers}>
        {"< back"}
      </Link>
      <h1>{props.work.title}</h1>

      <div className={`${styles.details} ${colorScheme === "dark" ? "" : styles.light}`}>
        <div className={styles.left}>
          <div>
            <h3>Client</h3>
            <p>{props.work.client || "N/A"}</p>
          </div>

          <div>
            <h3>Role</h3>
            <p>{props.work.role}</p>
          </div>

          <div>
            <h3>Links</h3>

            <div className={styles.links}>
              {props.work.live && (
                <button {...hoverHandlers}>
                  <a target="_blank" rel="noreferrer" href={props.work.live}>
                    Visit
                  </a>
                </button>
              )}
              {props.work.source && (
                <button {...hoverHandlers}>
                  <a target="_blank" rel="noreferrer" href={props.work.source}>
                    Code
                  </a>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div>
            <h3>The Project</h3>
            <p>{props.work.description}</p>
          </div>
        </div>
      </div>

      <Images title={props.work.title} images={props.work.images} />
    </div>
  );
}
