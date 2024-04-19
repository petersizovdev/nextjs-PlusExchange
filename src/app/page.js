import Slider from "@/components/Slider/Slider";
import styles from "./page.module.css";
import Card from "@/components/Card/Card";
import Welcome from "@/components/Welcome/Welcome";

export default function Home() {
  return (
    <div className={styles.home}>
      <Welcome />
      <Slider />
      <div className={styles.trends}>
        <div className={styles.column}>
          <h3>Топ крипто</h3>
          <Card />
        </div>
        <div className={styles.column}>
          <h3>Новости</h3>
          <Card />
        </div>
      </div>
    </div>
  );
}
