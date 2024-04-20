import Slider from "@/components/Slider/Slider";
import styles from "./page.module.css";
import Card from "@/components/Card/Card";
import Welcome from "@/components/Welcome/Welcome";
import Accordion from "@/components/Accordion/Accordion";
import Trending from "@/components/Trending/Trending";
import Image from "next/image";
import Screener from "@/assetst/svg/screener.svg";
import Swap from "@/assetst/svg/swap.svg";
import Screener1 from "@/assetst/svg/screener1.svg";
import Swap1 from "@/assetst/svg/swap1.svg";

export default function Home() {
  return (
    <div className={styles.home}>
      <Welcome />
      <Slider />
      <div className={styles.trends}>
        <div className={styles.column}>
          <h3>Топ крипто</h3>
          <Card className="cardItems">
            <Trending />
          </Card>
          <Card className="cardItems">
            <div className={styles.leftCard}>
              
              <Image className={styles.cardImage} src={Screener1} alt="" />

              <div className={styles.leftCardText}>
                <h2>Скринер</h2>
                <h3>
                  Вся информация <br />в одном месте
                </h3>
              </div>
            </div>
          </Card>
        </div>
        <div className={styles.column}>
          <h3>Новости</h3>
          <Card className="cardItems">
            <Trending />
          </Card>
          <Card className="cardItems">
            <div className={styles.leftCard}>
              <div className={styles.rigntCardText}>
                <h2>Обмен</h2>
                <h3>
                  Агрегированный <br />
                  пул ликвидности
                </h3>
              </div>
              <Image className={styles.cardImage} src={Swap1} alt="" />
            </div>
          </Card>
        </div>
      </div>
      <Accordion />
    </div>
  );
}
