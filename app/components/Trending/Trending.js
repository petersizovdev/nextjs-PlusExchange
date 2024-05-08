"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./Coin";
import "./Trending.module.css";

const link =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false&x_cg_demo_api_key=CG-KTfiPNvQLzGP2xz6PdMygBCD";

export default function Trending() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(link)
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="coin-app">
      {coins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}
