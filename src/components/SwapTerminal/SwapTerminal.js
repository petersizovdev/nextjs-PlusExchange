import Card from "../Card/Card";
import styles from "./SwapTerminal.module.css";

const SwapTerminal = () => {
  return (
    <div className={styles.terminal}>
      <Card className="cardItems">
        <div className={styles.terminalUi}>
          <input placeholder="0.0"></input>

          <input placeholder="0.0"></input>
        </div>
      </Card>
    </div>
  );
};

export default SwapTerminal;
