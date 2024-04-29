import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export default function Swap() {
  return (
    <div className={styles.terminal}>
   
      <input placeholder="0.0" type="number" inputMode="numeric"></input>
      <div className={styles.terminalSwap}>
        <Button className="stock">⇅</Button>
      </div>

      <input placeholder="0.0" type="number" inputMode="numeric"></input>

      <Button className="accent">Обменять</Button>
    </div>
  );
}
