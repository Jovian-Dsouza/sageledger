import { useWallet } from "@solana/wallet-adapter-react";
import { assets, getAssetByName } from "@/data/solanaAssests";
import { VersionedTransaction, Connection } from "@solana/web3.js";
import React, { useState, useEffect, useCallback } from "react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";


import SystemMesage from "@/components/SystemMessage"

export function GetPortfolioWidget() {
  const wallet = useWallet();
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPortfolio = useCallback(async () => {
    if (!wallet.publicKey) return;
    
    setLoading(true);
    try {
      // Get all token accounts for the wallet
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        wallet.publicKey,
        { programId: TOKEN_PROGRAM_ID }
      );

      // Process each token account
      const balances = await Promise.all(
        tokenAccounts.value.map(async (tokenAccount) => {
          const accountData = tokenAccount.account.data.parsed.info;
          const mintAddress = accountData.mint;
          const balance = accountData.tokenAmount.uiAmount;

          try {
            // Get mint metadata
            const tokenMetadata = await connection.getParsedAccountInfo(mintAddress);
            return {
              mint: mintAddress,
              name: mintAddress.toString().slice(0, 8) + "...", // Default to shortened mint address
              balance: balance || 0
            };
          } catch (error) {
            console.error("Error fetching token metadata:", error);
            return {
              mint: mintAddress,
              name: mintAddress.toString().slice(0, 8) + "...",
              balance: balance || 0
            };
          }
        })
      );
      
      setPortfolio(balances.filter(token => token.balance > 0));
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
    setLoading(false);
  }, [wallet.publicKey, connection]);


  useEffect(() => {
    getPortfolio();
  }, [getPortfolio]);

  return (
    <SystemMesage
      title="Portfolio"
      poweredBy="SOON"
      onConfirm={null}
    >
      <div className="flex flex-col space-y-4 w-full">
        {true ? (
          <div className="text-center">Loading portfolio...</div>
        ) : (
          portfolio.map((token, index) => (
            <div key={token.mint} className="flex justify-between items-center">
              <span>{token.name}</span>
              <span>{token.balance.toFixed(4)}</span>
            </div>
          ))
        )}
        {!loading && portfolio.length === 0 && (
          <div className="text-center">No tokens found</div>
        )}
      </div>
    </SystemMesage>
  );
}