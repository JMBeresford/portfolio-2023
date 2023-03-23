import { useProgress } from "@react-three/drei";
import styles from "./Loading.module.scss";
import Image from "next/image";
import logo from "@/assets/img/logo.png";

export function Loading() {
  const { progress } = useProgress();

  return (
    <div className={`${styles.loading} ${progress >= 100 ? styles.done : ""}`}>
      <div>
        <Image height={200} width={200} src={logo.src} alt="JBeresford logo" />
        <h1>Loading</h1>
      </div>
    </div>
  );
}
