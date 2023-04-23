import { useProgress } from "@react-three/drei";
import styles from "./Loading.module.scss";
import { useStore } from "@/utils/state";

export function Loading() {
  const { progress } = useProgress();
  const loaded = useStore(s => s.loaded);

  return (
    <div className={`${styles.loading} ${loaded ? styles.done : ""}`}>
      <div className={styles.text}>
        <h1>John Beresford</h1>
        <h3>creative developer</h3>
      </div>
      <div className={`${styles.progress} ${progress >= 100 ? styles.loaded : ""}`}>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              useStore.setState({ loaded: true });
              useStore.setState({ muted: false });
            }}
          >
            Enter
          </button>

          <button
            onClick={() => {
              useStore.setState({ loaded: true });
            }}
          >
            disable audio
          </button>
        </div>

        <h1>Loading</h1>
      </div>
    </div>
  );
}
