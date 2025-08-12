import Link from "next/link";
import styles from "./WorkList.module.scss";
import { useStore } from "@/utils/state";
import { hoverHandlers } from "@/utils";

export function WorkList() {
  const delay = 0.6;
  const works = useStore(s => s.works);

  return (
    <div className={styles.worklistwrapper}>
      <h1>My Work</h1>
      <div className={styles.worklist}>
        {Object.entries(works).map(([name, work], idx) => (
          <Link
            href={`/work/${name}`}
            key={idx}
            style={{ animationDelay: `${delay + idx * 0.4}s` }}
            {...hoverHandlers}
          >
            <div className={styles.work}>
              <div className={styles.left}>
                <h6>{idx}</h6>
                <div className={styles.titleText}>
                  <h3>{work.title}</h3>
                  {work.openSource ? <div className={styles.badge}>open source</div> : null}
                  {work.client ? <div className={styles.badge}>client work</div> : null}
                </div>
              </div>
              <h5>{work.year}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
