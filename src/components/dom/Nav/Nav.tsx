import Link from "next/link";
import styles from "./Nav.module.scss";

export function Nav() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/work">work</Link>
        </li>
        <li>
          <Link href="/contact">contact</Link>
        </li>
      </ul>
    </nav>
  );
}
