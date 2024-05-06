"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import PriceView from "../../components/price";
import QuoteView from "../../components/quote";
import { useState } from "react";
import { useAccount, useChainId } from "wagmi";




import Button from "../../components/Button/Button";
import styles from "./page.module.css";

export default function Swap() {

  const { address } = useAccount();

  const chainId = useChainId() || 137;
  console.log("chainId: ", chainId);

  const [finalize, setFinalize] = useState(false);
  const [price, setPrice] = useState();
  const [quote, setQuote] = useState();
  return (
    <div className={styles.terminal}>
   

   <div
    >
      {finalize && price ? (
        <QuoteView
          takerAddress={address}
          price={price}
          quote={quote}
          setQuote={setQuote}
          chainId={chainId}
        />
      ) : (
        <PriceView
          takerAddress={address}
          price={price}
          setPrice={setPrice}
          setFinalize={setFinalize}
          chainId={chainId}
        />
      )}
    </div>






      <input placeholder="0.0" type="number" inputMode="numeric"></input>
      <div className={styles.terminalSwap}>
        <Button className="stock">⇅</Button>
      </div>

      <input placeholder="0.0" type="number" inputMode="numeric"></input>

      <Button className="accent">Обменять</Button>
    </div>
  );
}
