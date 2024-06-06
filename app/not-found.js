import Link from "next/link";
import Button from "./components/Button/Button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.notFound}>
      <h4>404 | Страница не найдена</h4>
      <Link href="/">
        <Button>Вернуться на главную</Button>
      </Link>
    </div>
  );
}
