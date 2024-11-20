import { useWallet } from "@solana/wallet-adapter-react";
import { getAssetByName } from "@/data/solanaAssests";
import { VersionedTransaction, Connection, Keypair } from "@solana/web3.js";
import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { AssetBox } from "./AssetBox";
import SystemMesage from "@/components/SystemMessage";

export function LimitWidget({
  from,
  to,
  fromAmount,
  toAmount,
  expiresAt = null,
}) {
  const fromAsset = getAssetByName(from);
  const toAsset = getAssetByName(to);
  // const [finalToAmount, setFinalToAmount] = useState(toAmount);
  const [marketPrice, setMarketPrice] = useState();
  const wallet = useWallet();
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC);

  async function getQuote(currentAmount) {
    if (isNaN(currentAmount) || currentAmount <= 0) {
      console.error("Invalid fromAmount value:", currentAmount);
      return;
    }

    const quote = await (
      await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${
          fromAsset.mint
        }&outputMint=${toAsset.mint}&amount=${
          currentAmount * Math.pow(10, fromAsset.decimals)
        }&slippage=0.5`
      )
    ).json();

    if (quote && quote.outAmount) {
      const outAmountNumber =
        Number(quote.outAmount) / Math.pow(10, toAsset.decimals);
      setMarketPrice(outAmountNumber);
    }
  }

  useEffect(() => {
    getQuote(1);
    const intervalId = setInterval(() => {
      getQuote(1);
    }, 3000); // 5000 milliseconds = 5 seconds

    // Clean up function to clear the interval when the component unmounts or when the dependencies change
    return () => clearInterval(intervalId);
  }, []);

  async function signAndSendTransaction() {
    console.log("Sign and send transaction done");
    if (!wallet.connected || !wallet.signTransaction) {
      console.error(
        "Wallet is not connected or does not support signing transactions"
      );
      return;
    }

    // Base key are used to generate a unique order id
    const base = Keypair.generate();

    // get serialized transactions for the swap
    const { limitOrderTransaction } = await (
      await fetch("https://jup.ag/api/limit/v1/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: wallet.publicKey.toString(),
          inAmount: fromAmount * Math.pow(10, fromAsset.decimals), // 1000000 => 1 USDC if inputToken.address is USDC mint
          outAmount: toAmount * Math.pow(10, toAsset.decimals),
          inputMint: fromAsset.mint,
          outputMint: toAsset.mint,
          expiredAt: expiresAt, // new Date().valueOf() / 1000,
          base: base.publicKey.toString(),
        }),
      })
    ).json();

    try {
      const limitOrderTransactionBuf = Buffer.from(
        limitOrderTransaction,
        "base64"
      );
      const transaction = VersionedTransaction.deserialize(
        limitOrderTransactionBuf
      );
      // const signedTransaction = await wallet.signTransaction(transaction);
      transaction.sign([wallet.payer, base]);

      const rawTransaction = transaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: txid,
        },
        "confirmed"
      );

      console.log(`https://solscan.io/tx/${txid}`);
    } catch (error) {
      console.error("Error signing or sending the transaction:", error);
    }
  }

  return (
    <SystemMesage
      title="Limit Order"
      poweredBy="Jupiter"
      onConfirm={signAndSendTransaction}
    >
      <div className="flex items-center justify-center space-x-3">
        <AssetBox
          name={fromAsset.name}
          amount={fromAmount}
          img={fromAsset.img}
        />
        <ArrowRightIcon className="h-4 w-4 text-violet-300" />
        <AssetBox name={toAsset.name} amount={toAmount} img={toAsset.img} />
      </div>

      <div className="flex flex-col items-center justify-center space-x-2 text-sm text-gray-300">
        <div>
          Your Rate: 1 {fromAsset.name} ={" "}
          {parseFloat(toAmount / fromAmount).toFixed(4)} {toAsset.name}
        </div>
        {marketPrice ? (
          <div>
            Market Rate: 1 {fromAsset.name} ={" "}
            {parseFloat(marketPrice).toFixed(4)} {toAsset.name}
          </div>
        ) : null}
        {expiresAt ? <div>Expires at: {expiresAt}</div> : null}
      </div>
    </SystemMesage>
  );

}
