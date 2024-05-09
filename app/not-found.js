import Link from "next/link";
import Image from "next/image";
import Button from "./components/Button/Button";
import styles from "./page.module.css";
import blub from "@/assetst/svg/bbblurry.svg";
import blub2 from "@/assetst/svg/bbblurry1.svg";
import blub3 from "@/assetst/svg/bbblurry2.svg";

export default function Home() {
  return (
    <div className={styles.notFound}>
      <h4>404 | Страница не найдена</h4>
      <Link href="/">
        <Button>Вернуться на главную</Button>
      </Link>


      <Image className={styles.blub} priority src={blub2} alt="" />
      <Image className={styles.blub2} priority src={blub} alt="" />
      <Image className={styles.blub3} priority src={blub3} alt="" />
    </div>
  );
}
