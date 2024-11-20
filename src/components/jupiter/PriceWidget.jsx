import { assets, getAssetByName } from "@/data/solanaAssests";
import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { AssetBox } from "./AssetBox";
import SystemMesage from "@/components/SystemMessage";

export function PriceWidget({ from, to }) {
  const fromAsset = getAssetByName(from);
  const toAsset = getAssetByName(to);
  const fromAmount = 1;
  const [toAmount, setToAmount] = useState(null);

  async function getPrice() {
    const quote = await (
      await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${
          fromAsset.mint
        }&outputMint=${toAsset.mint}&amount=${
          fromAmount * Math.pow(10, fromAsset.decimals)
        }&slippage=0.5`
      )
    ).json();

    if (quote && quote.outAmount) {
      const outAmountNumber =
        Number(quote.outAmount) / Math.pow(10, toAsset.decimals);
      setToAmount(outAmountNumber);
    }
  }

  useEffect(() => {
    getPrice();
    const intervalId = setInterval(() => {
      getPrice();
    }, 1000);
    // Clean up function to clear the interval when the component unmounts or when the dependencies change
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SystemMesage title="Market Price" poweredBy="Jupiter">
      {toAmount ? (
        <div className="flex items-center justify-center space-x-3">
          <AssetBox
            name={fromAsset.name}
            amount={fromAmount}
            img={fromAsset.img}
          />
          <ArrowRightIcon className="h-4 w-4 text-violet-300" />
          <AssetBox name={toAsset.name} amount={toAmount} img={toAsset.img} />
        </div>
      ) : null}
    </SystemMesage>
  );
}
