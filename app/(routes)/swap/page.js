"use client";

import PriceView from "../../components/Price/Price";
import QuoteView from "../../components/Quote/Quote";
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
  );
}
