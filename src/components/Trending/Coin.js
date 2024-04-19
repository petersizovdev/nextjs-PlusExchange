import React from "react";
import "./Coin.css";

function Coin({ name, image, symbol, price, volume, priceChange, marketcap }) {
  return (
    <div className="coin-row">
      <div className="coin-section">
        <img src={image} alt="crypt" />
        <p className="coin-symbol">{symbol}</p>
      </div>

      <p className="coin-price">${price}</p>
      {priceChange < 0 ? (
        <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
      ) : (
        <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
      )}

      <p className="coin-vol">${marketcap.toLocaleString()}</p>
    </div>
  );
}

export default Coin;
