"use client";
import React, { useEffect, useRef, memo } from "react";

function Chart() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT.P",
          "interval": "60",
          "timezone": "exchange",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": true,
          "hide_legend": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);
  }, []);

  return <div ref={container}></div>;
}

export default memo(Chart);
