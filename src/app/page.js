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
import Link from "next/link";
import News from "@/components/News/News";

export default function Home() {
  return (
    <div className={styles.home}>
      <Welcome />
      <Slider />
      <div className={styles.trends}>
        <div className={styles.column}>
          <h4>Топ крипто</h4>
          <Card className="cardItems">
            <Trending />
          </Card>
          <Link
            className={styles.cardLink}
            style={{ textDecoration: "none", color: "inherit" }}
            href="/screener"
          >
            <Card className="cardItems">
              <div className={styles.leftCard}>
                <Image className={styles.cardImage} src={Screener1} alt="" />

                <div className={styles.leftCardText}>
                  <h3>Скринер</h3>
                  <h5>
                    Вся информация <br />в одном месте
                  </h5>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        <div className={styles.column}>
          <h4>Новости</h4>
          <Card className="cardItems">
            <News />
          </Card>
          <Link
            className={styles.cardLink}
            style={{ textDecoration: "none", color: "inherit" }}
            href="/swap"
          >
            <Card className="cardItems">
              <div className={styles.leftCard}>
                <div className={styles.rigntCardText}>
                  <h3>Обмен</h3>
                  <h5>
                    Агрегированный <br />
                    пул ликвидности
                  </h5>
                </div>
                <Image className={styles.cardImage} src={Swap1} alt="" />
              </div>
            </Card>
          </Link>
        </div>
      </div>
      <Accordion />
    </div>
  );
}
