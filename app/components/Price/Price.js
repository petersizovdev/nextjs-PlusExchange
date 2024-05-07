import styles from "./price.module.css";
import cn from "classnames";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState, ChangeEvent } from "react";
import { formatUnits, parseUnits } from "ethers";
import {
  useReadContract,
  useBalance,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { erc20Abi, Address } from "viem";
import {
  POLYGON_TOKENS,
  POLYGON_TOKENS_BY_SYMBOL,
  POLYGON_EXCHANGE_PROXY,
  MAX_ALLOWANCE,
  AFFILIATE_FEE,
  FEE_RECIPIENT,
} from "../../../src/constants";

import Image from "next/image";
import qs from "qs";
import Button from "../Button/Button";
import Card from '../Card/Card';
import Alert from '../Alert/AlertErr';


export const DEFAULT_BUY_TOKEN = (chainId) => {
  if (chainId === 137) {
    return "wmatic";
  }
};

export default function PriceView({
  price,
  takerAddress,
  setPrice,
  setFinalize,
  chainId,
}) {
  const [sellToken, setSellToken] = useState("wmatic");
  const [buyToken, setBuyToken] = useState("usdc");
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [tradeDirection, setTradeDirection] = useState("sell");
  const [error, setError] = useState([]);

  const handleSellTokenChange = (e) => {
    setSellToken(e.target.value);
  };
  function handleBuyTokenChange(e) {
    setBuyToken(e.target.value);
  }

  const exchangeProxy = (chainId) => {
    if (chainId === 137) {
      return POLYGON_EXCHANGE_PROXY;
    }
    return POLYGON_EXCHANGE_PROXY;
  };

  const tokensByChain = (chainId) => {
    if (chainId === 137) {
      return POLYGON_TOKENS_BY_SYMBOL;
    }
    return POLYGON_TOKENS_BY_SYMBOL;
  };

  const sellTokenObject = tokensByChain(chainId)[sellToken];
  const buyTokenObject = tokensByChain(chainId)[buyToken];

  const sellTokenDecimals = sellTokenObject.decimals;
  const buyTokenDecimals = buyTokenObject.decimals;
  const sellTokenAddress = sellTokenObject.address;

  const parsedSellAmount =
    sellAmount && tradeDirection === "sell"
      ? parseUnits(sellAmount, sellTokenDecimals).toString()
      : undefined;

  const parsedBuyAmount =
    buyAmount && tradeDirection === "buy"
      ? parseUnits(buyAmount, buyTokenDecimals).toString()
      : undefined;

  // Fetch price data and set the buyAmount whenever the sellAmount changes
  useEffect(() => {
    const params = {
      sellToken: sellTokenObject.address,
      buyToken: buyTokenObject.address,
      sellAmount: parsedSellAmount,
      buyAmount: parsedBuyAmount,
      takerAddress,
      feeRecipient: FEE_RECIPIENT,
      buyTokenPercentageFee: AFFILIATE_FEE,
      feeRecipientTradeSurplus: FEE_RECIPIENT,
    };

    async function main() {
      const response = await fetch(`/api/price?${qs.stringify(params)}`);
      const data = await response.json();

      if (data?.validationErrors?.length > 0) {
        // error for sellAmount too low
        setError(data.validationErrors);
      } else {
        setError([]);
      }
      if (data.buyAmount) {
        setBuyAmount(formatUnits(data.buyAmount, buyTokenDecimals));
        setPrice(data);
      }
    }

    if (sellAmount !== "") {
      main();
    }
  }, [
    sellTokenObject.address,
    buyTokenObject.address,
    parsedSellAmount,
    parsedBuyAmount,
    chainId,
    sellAmount,
    setPrice,
    FEE_RECIPIENT,
    AFFILIATE_FEE,
  ]);

  // Hook for fetching balance information for specified token for a specific takerAddress
  const { data, isError, isLoading } = useBalance({
    address: takerAddress,
    token: sellTokenObject.address,
  });

  console.log("taker sellToken balance: ", data);

  const inSufficientBalance =
    data && sellAmount
      ? parseUnits(sellAmount, sellTokenDecimals) > data.value
      : true;

  return (
    <div className={styles.priceContainer}>
      <div className={styles.price}>
        <div className={styles.terminalRow}>
          {" "}
          <div className={styles.coinSelect}>
            <div className={styles.coinIcon}>
              <Image
                alt={sellToken}
                src={POLYGON_TOKENS_BY_SYMBOL[sellToken].logoURI}
                width={128}
                height={128}
              />
            </div>
            <select
              value={sellToken}
              name="sell-token-select"
              id="sell-token-select"
              onChange={handleSellTokenChange}
            >
              {POLYGON_TOKENS.map((token) => {
                return (
                  <option
                    key={token.address}
                    value={token.symbol.toLowerCase()}
                  >
                    {token.symbol}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            className={styles.terminalInput}
            id="sell-amount"
            value={sellAmount}
            type="number"
            onChange={(e) => {
              setTradeDirection("sell");
              setSellAmount(e.target.value);
            }}
          />
        </div>

        <h4>
          <IoArrowDownCircleOutline />
        </h4>

        <div className={styles.terminalRow}>
          <div className={styles.coinSelect}>
            <div className={styles.coinIcon}>
              <Image
                alt={buyToken}
                src={POLYGON_TOKENS_BY_SYMBOL[buyToken].logoURI}
                width={128}
                height={128}
              />
            </div>
            <select
              name="buy-token-select"
              id="buy-token-select"
              value={buyToken}
              onChange={(e) => handleBuyTokenChange(e)}
            >
              {POLYGON_TOKENS.map((token) => {
                return (
                  <option
                    key={token.address}
                    value={token.symbol.toLowerCase()}
                  >
                    {token.symbol}
                  </option>
                );
              })}
            </select>
          </div>

          <input
            className={styles.terminalInput}
            id="buy-amount"
            value={buyAmount}
            type="number"
            disabled
            onChange={(e) => {
              setTradeDirection("buy");
              setBuyAmount(e.target.value);
            }}
          />
        </div>

        <h6 className={styles.affiliate}>
          {price && price.grossBuyAmount
            ? "Комиссия сервиса: " +
              Number(
                formatUnits(
                  BigInt(price.grossBuyAmount),
                  POLYGON_TOKENS_BY_SYMBOL[buyToken].decimals
                )
              ) *
                AFFILIATE_FEE +
              " " +
              POLYGON_TOKENS_BY_SYMBOL[buyToken].symbol
            : null}
        </h6>

        {takerAddress ? (
          <ApproveOrReviewButton
            sellTokenAddress={POLYGON_TOKENS_BY_SYMBOL[sellToken].address}
            takerAddress={takerAddress}
            onClick={() => {
              setFinalize(true);
            }}
            disabled={inSufficientBalance}
          />
        ) : (
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button
                          className={styles.connectButton}
                          onClick={openConnectModal}
                          type="button"
                        >
                          Подключить кошелек
                        </Button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button">
                          Неподходящая сеть!
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        <button onClick={openChainModal} type="button">
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <Image
                                  src={chain.iconUrl}
                                  alt={chain.name ?? "Chain icon"}
                                  width={12}
                                  height={12}
                                  layout="fixed"
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button onClick={openAccountModal} type="button">
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ""}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        )}
      </div>
    </div>
  );

  function ApproveOrReviewButton({
    takerAddress,
    onClick,
    sellTokenAddress,
    disabled,
  }) {
    // 1. Read from erc20, does spender (0x Exchange Proxy) have allowance?
    const { data: allowance, refetch } = useReadContract({
      address: sellTokenAddress,
      abi: erc20Abi,
      functionName: "allowance",
      args: [takerAddress, exchangeProxy(chainId)],
    });

    // 2. (only if no allowance): write to erc20, approve a token allowance for 0x Exchange Proxy
    const { data } = useSimulateContract({
      address: sellTokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [exchangeProxy(chainId), MAX_ALLOWANCE],
    });

    // Define useWriteContract for the 'approve' operation
    const {
      data: writeContractResult,
      writeContractAsync: writeContract,
      error,
    } = useWriteContract();

    // useWaitForTransactionReceipt to wait for the approval transaction to complete
    const { data: approvalReceiptData, isLoading: isApproving } =
      useWaitForTransactionReceipt({
        hash: writeContractResult,
      });

    // Call `refetch` when the transaction succeeds
    useEffect(() => {
      if (data) {
        refetch();
      }
    }, [data, refetch]);

    if (error) {
      return <Alert>Something went wrong: {error.message}</Alert>;
    }

    // Need to figure out approval button
    if (allowance === 0n) {
      return (
        <>
          <Button
            type="button"
            onClick={async () => {
              await writeContract({
                abi: erc20Abi,
                address: sellTokenAddress,
                functionName: "approve",
                args: [exchangeProxy(chainId), MAX_ALLOWANCE],
              });
              refetch();
            }}
          >
            {isApproving ? "Подтверждение…" : "Подтвердить"}
          </Button>
        </>
      );
    }

    return (
      <Button
        type="button"
        disabled={disabled}
        onClick={() => {
          // fetch data, when finished, show quote view
          setFinalize(true);
        }}
      >
        {disabled ? "Недостаточный баланс" : "Посмотреть информацию"}
      </Button>
    );
  }
}
