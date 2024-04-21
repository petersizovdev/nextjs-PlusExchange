"use client";

import Chart from "@/components/Chart/Chart";
import styles from "./page.module.css";
import Screen from "@/components/Screener/Screener";
import {
  AdvancedChart,
  CryptocurrencyMarket,
  Timeline,
} from "react-tradingview-embed";
import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";

export default function Screener() {
  return (
    <div className={styles.screener}>
      <div className={styles.chart}>
        <AdvancedChart
          widgetProps={{
            theme: "dark",
            allow_symbol_change: true,
            show_popup_button: true,
            popup_width: "1000",
            popup_height: "650",
          }}
        />
      </div>

      <div className={styles.market}>
        <div className={styles.leftPanel}>
          <CryptocurrencyMarket
            widgetProps={{ theme: "dark", isTransparent: false }}
          />
        </div>
        <div className={styles.rightPanel}>
          <Button className="outlined">Добваить палель</Button>
          <div className={styles.marketNews}></div>
        </div>
      </div>
    </div>
  );
}
