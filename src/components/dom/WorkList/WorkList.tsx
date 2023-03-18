import Link from "next/link";
import styles from "./WorkList.module.scss";
import { store } from "@/utils/store";
import { Image } from "./Image";

export function WorkList() {
  return (
    <div className={styles.worklist}>
      {/* {Object.entries(store.works).map(([name, work], idx) => (
        <div key={idx} className={styles.imgWrapper}>
          <Link href={`/work/${name}`}>
            <Image fp={work.images[0]} alt={`example screenshot of work ${name}`} />
          </Link>
        </div>
      ))} */}
      {Object.entries(store.works).map(([name, work], idx) => (
        <Link href={`/work/${name}`} key={idx} style={{ animationDelay: `${0.35 + idx * 0.4}s` }}>
          <div className={styles.work}>
            <div className={styles.left}>
              <h6>{idx}</h6>
              <h3>{work.title}</h3>
            </div>
            <h5>{work.year}</h5>
          </div>
        </Link>
      ))}
    </div>
  );
}
