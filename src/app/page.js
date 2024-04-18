import Slider from "@/components/Slider/Slider";
import styles from "./page.module.css";
import Card from "@/components/Card/Card";

export default function Home() {
  return (
    <div className={styles.home}>
      <Slider />
      <div className={styles.trends}>
        <div className={styles.column}>
          <h1>Топ крипто</h1>
          <Card />
        </div>
        <div className={styles.column}>
          <h1>Новости</h1>
          <Card />
        </div>
      </div>
    </div>
  );
}
