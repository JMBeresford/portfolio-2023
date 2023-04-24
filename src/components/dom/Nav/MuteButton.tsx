import { useStore } from "@/utils/state";
import styles from "./Nav.module.scss";
import { hoverHandlers } from "@/utils";

export function MuteButton() {
  const muted = useStore(s => s.muted);

  const handleClick = () => {
    useStore.setState(s => ({ ...s, muted: !s.muted }));
  };

  return (
    <div className={`${styles.mute} ${muted ? styles.muted : ""}`}>
      <button name="mute" {...hoverHandlers} onClick={handleClick}>
        <div className={styles.bar} style={{ animationDelay: "0.2s" }} />
        <div className={styles.bar} style={{ animationDelay: "0.4s" }} />
        <div className={styles.bar} style={{ animationDelay: "0.6s" }} />
      </button>
    </div>
  );
}
