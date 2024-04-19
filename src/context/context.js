import { createContext, useState, useEffect } from "react";

export const CoinMarketcapContext = createContext();

export const CoinMarketcapProvider = ({ children }) => {
  return (
    <CoinMarketcapContext.Provider value={{}}>
      {children}
    </CoinMarketcapContext.Provider>
  );
};
