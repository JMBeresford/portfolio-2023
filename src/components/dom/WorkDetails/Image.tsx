import { useState } from "react";
import styles from "./WorkDetails.module.scss";

type Props = {
  fp: string;
  alt: string;
};

export function Image(props: Props) {
  const [viewing, setViewing] = useState<boolean>(false);

  return (
    <>
      {/* eslint-disable-next-line */}
      <img src={props.fp} alt={props.alt} onClick={() => setViewing(true)} />

      <div
        className={styles.lightbox + (viewing ? ` ${styles.active}` : "")}
        onClick={() => setViewing(false)}
      >
        {/* eslint-disable-next-line */}
        <img src={props.fp} alt="lightbox of selected image" />
      </div>
    </>
  );
}
