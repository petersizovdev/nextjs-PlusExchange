import Slider from "@/components/Slider/Slider";
import styles from "./page.module.css";
import Card from "@/components/Card/Card";

export default function Home() {
  return (
    <div className={styles.home}>
      <Slider />
      <div className={styles.trends}>
        <Card />
        <Card />
      </div>
    </div>
  );
}
