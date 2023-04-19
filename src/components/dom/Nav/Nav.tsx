import Link from "next/link";
import styles from "./Nav.module.scss";
import { ColorSchemeSwitch } from "./ColorSchemeSwitch";
import { useRouter } from "next/router";

export function Nav() {
  const path = useRouter().asPath;

  return (
    <nav className={styles.navbar}>
      <ColorSchemeSwitch />
      <ul>
        <li>
          <Link href="/" className={path === "/" ? styles.active : ""}>
            home
          </Link>
        </li>
        <li>
          <Link href="/work" className={path === "/work" ? styles.active : ""}>
            work
          </Link>
        </li>
        <li>
          <Link href="/contact" className={path === "/contact" ? styles.active : ""}>
            contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
