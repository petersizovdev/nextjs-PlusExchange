import Slider from "@/components/Slider/Slider";
import styles from "./page.module.css";
import Card from "@/components/Card/Card";
import Welcome from "@/components/Welcome/Welcome";
import Accordion from "@/components/Accordion/Accordion";
import Trending from "@/components/Trending/Trending";

export default function Home() {
  return (
    <div className={styles.home}>
      <Welcome />
      <Slider />
      <div className={styles.trends}>
        <div className={styles.column}>
          <h3>Топ крипто</h3>
          <Card>
            {" "}
            <Trending />
          </Card>
        </div>
        <div className={styles.column}>
          <h3>Новости</h3>
          <Card />
        </div>
      </div>
      <Accordion />
    </div>
  );
}
