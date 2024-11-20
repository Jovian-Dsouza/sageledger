export const testBrainAsk = { role: "assistant", content: "{\"action\": \"brian_ask\", \"details\": \"Hi there whats up \"}" }
const brianOutput = `### Solana's **Wormhole** Feature.`;

export const testBrainAsk2 = {
  role: "assistant",
  content: `{"action": "brian_ask", "details": "${brianOutput}"}`,
};
export const testLimitOrder = {
  role: "assistant",
  content: '{"action": "limit_order", "tokenFrom": "sol", "tokenTo": "usdc", "amountIn": "0.001", "amountOut": "175"}',
};
export const testGetPrice = {
  role: "assistant",
  content:
    '{"action": "get_price", "tokenFrom": "sol", "tokenTo": "usdc"}',
};
export const testSwap = {
  role: "assistant",
  content:
    '{"action": "swap", "tokenFrom": "sol", "tokenTo": "usdc", "amountIn": "0.001"}',
};
export const testSend = {
  role: "assistant",
  content:
    '{"action": "send", "tokenFrom": "sol", "toAddress": "9xbfpUgTWYertUT3YHZazAdS1ABLJAouqsh6uc8Vc5Sn", "amountIn": "0.001"}',
};