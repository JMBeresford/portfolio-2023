import { useProgress } from "@react-three/drei";
import styles from "./Loading.module.scss";
import Image from "next/image";
import logo from "@/assets/img/logo.png";
import { useStore } from "@/utils/state";

export function Loading() {
  const { progress } = useProgress();
  const loaded = useStore(s => s.loaded);

  return (
    <div className={`${styles.loading} ${loaded ? styles.done : ""}`}>
      <Image height={200} width={200} src={logo.src} alt="JBeresford logo" />
      <div className={`${styles.progress} ${progress >= 100 ? styles.loaded : ""}`}>
        <button
          onClick={() => {
            useStore.setState({ loaded: true });
            useStore.setState({ muted: false });
          }}
        >
          Enter
        </button>

        <h1>Loading</h1>
      </div>
    </div>
  );
}
