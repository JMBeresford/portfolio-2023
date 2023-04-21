import Link from "next/link";
import styles from "./Nav.module.scss";
import { ColorSchemeSwitch } from "./ColorSchemeSwitch";
import { useRouter } from "next/router";
import { hoverHandlers } from "@/utils";

export function Nav() {
  const path = useRouter().asPath;

  return (
    <nav className={styles.navbar}>
      <ColorSchemeSwitch />
      <ul>
        <li>
          <Link href="/" className={path === "/" ? styles.active : ""} {...hoverHandlers}>
            home
          </Link>
        </li>
        <li>
          <Link href="/work" className={path === "/work" ? styles.active : ""} {...hoverHandlers}>
            work
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={path === "/contact" ? styles.active : ""}
            {...hoverHandlers}
          >
            contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
