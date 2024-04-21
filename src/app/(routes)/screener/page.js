"use client";

import Chart from "@/components/Chart/Chart";
import styles from "./page.module.css";
import Screen from "@/components/Screener/Screener";
import { AdvancedChart, CryptocurrencyMarket } from "react-tradingview-embed";

export default function Screener() {
  return (
    <div className={styles.screener}>
      <AdvancedChart widgetProps={{ theme: "dark" }} />;
      <CryptocurrencyMarket widgetProps={{ theme: "dark" }} />;
    </div>
  );
}
