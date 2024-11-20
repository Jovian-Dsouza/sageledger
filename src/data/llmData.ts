export const demoPrompts = [
  { name: "Swap Action", prompt: "I want to swap 0.01 SOL for BONK." },
  {
    name: "Limit Order",
    prompt: "Set limit order to buy 60 WIF tokens for 1 SOL",
  },
  { name: "Send Action", prompt: "Please send 100 USDT to Alice's wallet." },
  { name: "Solana Q&A", prompt: "What is Solana's Wormhole feature"},
  { name: "Order History", prompt: "Show me my order history" },
  {
    name: "Information on NFT Action",
    prompt:
      "Can you provide information on the CryptoPunks collection on Ethereum?",
  },
  {
    name: "Information on Stock Markets Action",
    prompt: "What's the current status of AAPL on the NASDAQ?",
  },
  {
    name: "Information on Crypto Markets Action",
    prompt: "I'd like to know about the BTC/USD pair on Binance.",
  },
  {
    name: "Buy NFT Action",
    prompt: "Buy a Bored Ape Yacht Club NFT on Ethereum.",
  },
  {
    name: "View Portfolio Action",
    prompt: "Show me my portfolio on the Ethereum network.",
  },
];

// export const baseModel = "mistralai/mistral-7b-instruct:free";
// export const baseModel = "google/gemma-7b-it:free";
// export const baseModel = "openrouter/cinematika-7b:free";
// export const baseModel = "gpt-3.5-turbo";
export const baseModel = "undi95/toppy-m-7b:free";