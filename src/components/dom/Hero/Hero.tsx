import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className="text">
        <h1>John Beresford</h1>
        <h3>creative developer</h3>
      </div>
    </div>
  );
}
