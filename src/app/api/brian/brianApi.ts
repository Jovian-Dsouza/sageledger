import { BrianSDK } from "@brian-ai/sdk";

export const brian = new BrianSDK({
  apiKey: process.env.BRAIN_API_KEY,
});

export async function askBrian(messages){
  let prompt = ""
  messages.forEach((message) => {
    prompt += message.content + "\n";
  });
  console.log("brain prompt", prompt)
  const result = await brian.ask({
    prompt,
    kb: "public-knowledge-box",
  });
  return result.text
}
// (async () => {
//   const result = await brian.ask({
//     prompt: "what is uniswap",
//     kb: "public-knowledge-box",
//   });
//   console.log(result)
//   console.log(result.text)
// })();
