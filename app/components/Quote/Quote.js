import { useEffect } from "react";
import { formatUnits } from "ethers";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { Address } from "viem";
import styles from "./quote.module.css";

import {
  POLYGON_TOKENS_BY_ADDRESS,
  AFFILIATE_FEE,
  FEE_RECIPIENT,
} from "../../../src/constants";
import Image from "next/image";
import qs from "qs";
import Button from "../Button/Button";
import Alert from "../Alert/AlertErr";

export default function QuoteView({
  takerAddress,
  price,
  quote,
  setQuote,
  chainId,
}) {
  const sellTokenInfo = (chainId) => {
    switch (chainId) {
      case 137:
        return POLYGON_TOKENS_BY_ADDRESS[price.sellTokenAddress.toLowerCase()];
      default:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
    }
  };

  const buyTokenInfo = (chainId) => {
    switch (chainId) {
      case 137:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
      default:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
    }
  };

  // Fetch quote data
  useEffect(() => {
    const params = {
      sellToken: price.sellTokenAddress,
      buyToken: price.buyTokenAddress,
      sellAmount: price.sellAmount,
      takerAddress,
      feeRecipient: FEE_RECIPIENT,
      buyTokenPercentageFee: AFFILIATE_FEE,
      feeRecipientTradeSurplus: FEE_RECIPIENT,
    };

    async function main() {
      const response = await fetch(`/api/quote?${qs.stringify(params)}`);
      const data = await response.json();
      setQuote(data);
    }
    main();
  }, [
    price.sellTokenAddress,
    price.buyTokenAddress,
    price.sellAmount,
    takerAddress,
    setQuote,
    FEE_RECIPIENT,
    AFFILIATE_FEE,
  ]);

  const {
    data: hash,
    isPending,
    error,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  console.log("sellAmount:", quote?.sellAmount);
  console.log("decimals:", sellTokenInfo(chainId).decimals);

  if (!quote) {
    return <h4>Поиск лучшего предложения...</h4>;
  }

  console.log("quote", quote);

  return (
    <div className={styles.priceContainer}>
      <div className={styles.price}>
        <h6>Вы отдаете</h6>
        <div className={styles.terminalRow}>
          <div className={styles.coinSelect}>
            {quote.sellAmount ? (
              <span>
                {formatUnits(quote.sellAmount, sellTokenInfo(chainId).decimals)}
              </span>
            ) : (
              <span>0</span>
            )}
            <div className={styles.coinSelect}>
              {sellTokenInfo(chainId).symbol}
            </div>
            <div className={styles.coinIcon}>
              <Image
                alt={sellTokenInfo(chainId).symbol}
                src={sellTokenInfo(chainId || 137)?.logoURI}
                width={128}
                height={128}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.price}>
        <h6>Вы получите</h6>
        <div className={styles.terminalRow}>
          <div className={styles.coinSelect}>
            {quote.sellAmount ? (
              <span>
                {formatUnits(quote.buyAmount, buyTokenInfo(chainId).decimals)}
              </span>
            ) : (
              <span>0</span>
            )}

            <div  className={styles.coinSelect}>{buyTokenInfo(chainId).symbol}</div>

            <div className={styles.coinIcon}>
              <Image
                alt={
                  POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()]
                    .symbol
                }
                src={
                  POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()]
                    .logoURI
                }
                width={128}
                height={128}
              />
            </div>
          </div>
        </div>
      </div>

      <h6 className={styles.affiliate}>
        {quote && quote.grossBuyAmount
          ? "Комиссия сервиса: " +
            Number(
              formatUnits(
                BigInt(quote.grossBuyAmount),
                buyTokenInfo(chainId).decimals
              )
            ) *
              AFFILIATE_FEE +
            " " +
            buyTokenInfo(chainId).symbol
          : null}
      </h6>

      <Button
        disabled={isPending}
        onClick={() => {
          console.log("submitting quote to blockchain");
          console.log("to", quote.to);
          console.log("value", quote.value);

          sendTransaction &&
            sendTransaction({
              gas: quote?.gas,
              to: quote?.to,
              value: quote?.value, // only used for native tokens
              data: quote?.data,
              gasPrice: quote?.gasPrice,
            });
        }}
      >
        {isPending ? "Подтверждение..." : "Подтвердить обмен"}
      </Button>

      {isConfirming && <div className="text-center">Подтверждение ⏳ ...</div>}
      {isConfirmed && (
        <div className="text-center">
          Транзакция прошла успешно! 🎉
          <a href={`https://polygonscan.com/tx/${hash}`}>
            Посмотреть на Polygonscan
          </a>
        </div>
      )}
      {error && (
        <Alert>
          Что-то пошло не так: {error.shortMessage || error.message}
        </Alert>
      )}
    </div>
  );
}
