import Image from "next/image";
import blub from "@/assetst/svg/bbblurry.svg";
import blub2 from "@/assetst/svg/bbblurry1.svg";
import blub3 from "@/assetst/svg/bbblurry2.svg";
import CardButton from "../Card/CardButton";

import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.welcomeText}>
        <h1>Plus Exchange</h1>
        <div className={styles.goto}>
          <h2>
            Ваш верны спутник в мире <br />
            децентрализованных финансов{" "}
          </h2>
          <CardButton>Перейти к обмену</CardButton>
        </div>
      </div>
      <Image
        className={styles.blub}
        priority
        src={blub2}
        alt="Follow us on Twitter"
      />
      <Image
        className={styles.blub2}
        priority
        src={blub}
        alt="Follow us on Twitter"
      />
      <Image
        className={styles.blub3}
        priority
        src={blub3}
        alt="Follow us on Twitter"
      />
    </div>
  );
};

export default Welcome;
