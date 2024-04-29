import React from "react";
import "./Coin.css";

function formatMarketcap(marketcap) {
  if (marketcap < 1000) return marketcap;
  if (marketcap < 1000000) return (marketcap / 1000).toFixed(1) + "K";
  if (marketcap < 1000000000) return (marketcap / 1000000).toFixed(1) + "M";
  return (marketcap / 1000000000).toFixed(1) + "B";
}

function Coin({ name, image, symbol, price, volume, priceChange, marketcap }) {
  return (
    <div className="coin-row">
      <div className="coin-section">
        <img src={image} alt="crypt" />
        <p className="coin-symbol">{symbol}</p>
      </div>
      <p className="coin-price">${price.toFixed(2)}</p>

      {priceChange < 0 ? (
        <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
      ) : (
        <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
      )}

      <p className="coin-vol">${formatMarketcap(marketcap)}</p>
    </div>
  );
}

export default Coin;
