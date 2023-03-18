import { Image } from "./Image";
import styles from "./WorkDetails.module.scss";

type Props = {
  title: string;
  images: string[];
};

export function Images(props: Props) {
  return (
    <div className={styles.images}>
      {props.images.map((fp, idx) => (
        <div key={idx} className={styles.imgWrapper}>
          <Image fp={fp} alt={`example screenshot of project ${props.title}`} />
        </div>
      ))}
    </div>
  );
}
