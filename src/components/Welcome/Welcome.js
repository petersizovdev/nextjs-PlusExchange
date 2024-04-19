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
      <div className={styles.welcomeTest}>
        <input></input>
        <input></input>
      </div>
    </div>
  );
};

export default Welcome;
