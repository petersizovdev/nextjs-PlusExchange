import Image from "next/image";
import blub from "@/assetst/svg/bbblurry.svg";
import blub2 from "@/assetst/svg/bbblurry1.svg";
import blub3 from "@/assetst/svg/bbblurry2.svg";
import Card from "../Card/Card";

import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.welcomeText}>
        <h1>Plus Exchange</h1>
        <div className={styles.goto}>
          <h3>
            Ваш верный спутник в мире <br />
            децентрализованных финансов{" "}
          </h3>
          <Card className="cardButton">Перейти к обмену</Card>
        </div>
      </div>
      {/* 
      <Image
        className={styles.blub}
        priority
        src={blub2}
        alt=""
      />
      <Image
        className={styles.blub2}
        priority
        src={blub}
        alt=""
      />
      <Image
        className={styles.blub3}
        priority
        src={blub3}
        alt=""
      />*/}
    </div>
  );
};

export default Welcome;
