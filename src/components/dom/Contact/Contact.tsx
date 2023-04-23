/* eslint-disable @next/next/no-img-element */
import { hoverHandlers } from "@/utils";
import styles from "./Contact.module.scss";
import Image from "next/image";

export function Contact() {
  return (
    <div className={styles.contact}>
      <h1>Contact Me</h1>

      <div className={styles.content}>
        <form>
          <div className={styles.partition}>
            <label>
              Name
              <input />
            </label>
            <label>
              Email
              <input />
            </label>
          </div>

          <div className={styles.partition}>
            <label>
              Message
              <textarea />
            </label>
          </div>

          <div className={styles.submission}>
            <input type="submit" value="SUBMIT" {...hoverHandlers} />

            <p className={styles.email}>
              or you can email me at{" "}
              <a href="mailto:contact@john-beresford.com">contact@john-beresford.com</a>
            </p>
          </div>
        </form>

        <div className={styles.socials}>
          <div className={styles.images}>
            <a href="https://twitter.com/__jberesford__" {...hoverHandlers}>
              <img src="/img/socials/twitter.png" alt="twitter icon" />
            </a>
            <a href="https://www.instagram.com/beresforddesign/" {...hoverHandlers}>
              <img src="/img/socials/instagram.png" alt="instagram icon" />
            </a>
            <a href="https://www.discordapp.com/users/174439608577294336" {...hoverHandlers}>
              <img src="/img/socials/discord.png" alt="discord icon" />
            </a>
            <a href="https://www.linkedin.com/in/jmberesford/" {...hoverHandlers}>
              <img src="/img/socials/linkedin.png" alt="linkedin icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
