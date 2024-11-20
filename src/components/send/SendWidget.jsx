import SystemMesage from "@/components/SystemMessage";
import { useWallet } from "@solana/wallet-adapter-react";
import { assets, getAssetByName } from "@/data/solanaAssests";
import {
  VersionedTransaction,
  Connection,
  Transaction,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import { ArrowDownIcon } from "@heroicons/react/24/solid";
import { AssetBox } from "@/components/jupiter/AssetBox";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const formatToAddress = (address) => {
  const n = 6;
  const formattedAddress =
    address.substring(0, n) +
    "..." +
    address.substring(address.length - n, address.length);
  return formattedAddress;
};
sendAndConfirmTransaction;
export function SendWidget({ fromToken, toAddress, amountIn }) {
  const fromAsset = getAssetByName(fromToken);
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC);
  const [tx, setTx] = useState(null);

  async function handleSend() {
    console.log("sending");
    try {
      if (!publicKey) {
        alert("Please connect wallet");
        return;
      }
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: amountIn * LAMPORTS_PER_SOL, // Convert SOL to lamports
        })
      );
      let blockhash = (await connection.getLatestBlockhash())
        .blockhash;
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signedTransaction = await signTransaction(transaction);
      console.log("signedTransaction", signedTransaction)

      // Send the signed transaction to the network
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      // Wait for confirmation
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      setTx(signature);

      console.log("Transaction confirmed:", signature);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  }

  return (
    <SystemMesage title="Send" onConfirm={handleSend}>
      <div className="flex flex-col items-center justify-center gap-3">
        <AssetBox name={fromAsset.name} amount={amountIn} img={fromAsset.img} />
        <ArrowDownIcon className="h-4 w-4" />
        <div className="info-box flex space-x-1">
          <div className="text-white font-bold">Address: </div>
          <div className="text-gray-300 font-bold">
            {formatToAddress(toAddress)}
          </div>
        </div>
      </div>

      {tx && <div className="mt-4 bg-green-100 border border-green-400 rounded-lg p-4 w-full">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700">Transaction successful!</span>
            </div>
            {tx && (
              <a 
                href={`https://explorer.devnet.soo.network/tx/${tx}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 hover:text-green-800 underline mt-2 block"
              >
                View on SOON explorer
              </a>
            )}
          </div>}
    </SystemMesage>
  );
}
