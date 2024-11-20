import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
// import { brian, askBrian } from "./brian/brianApi";
import { baseModel } from "@/data/llmData";
import { basePrompt } from "@/data/prompt";

const modelAPI = "openai"
export const openRouter = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL, // Optional, for including your app on openrouter.ai rankings.
    "X-Title": process.env.NEXT_PUBLIC_APP_TITLE, // Optional. Shows in rankings on openrouter.ai.
  },
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function filterResponse(inputText) {
  try {
    const startIndex = inputText.indexOf("{");
    const endIndex = inputText.lastIndexOf("}") + 1;
    const jsonString = inputText.substring(startIndex, endIndex);
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  return { action: "undefined" };
}

async function getOpenRouterResponse(messages) {
  const completion = await openRouter.chat.completions.create({
    messages,
    model: baseModel,
  });
  return completion.choices[0].message.content;
}

async function getAnthropicResponse(messages) {
  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307", // "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: messages,
  });
  // console.log(msg);
  return msg.content[0].text;
}

function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj; // Return primitives and null as is
  }

  let copy;
  if (Array.isArray(obj)) {
    copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i]); // Recursively copy array elements
    }
  } else {
    copy = {};
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepCopy(obj[key]); // Recursively copy object properties
      }
    }
  }
  return copy;
}

export async function getChatResponse(messages) { 
  if(messages.length === 0){return ""}
  const originalMessage = JSON.parse(JSON.stringify(messages));


  let response = "";
  if (modelAPI === "anthropic") {
    messages[0].content = `prompt\n${basePrompt}\n\nInput\n${messages[0].content}`
    response = await getAnthropicResponse(messages);
    response = filterResponse(response)
    // console.log("Filtered Response", response)
  } else {
    const messagesWithPrompt = [
      { role: "system", content: basePrompt },
      ...messages,
    ];
    response = filterResponse(await getOpenRouterResponse(messagesWithPrompt));
  }
  // if (response["action"] === "ask") {
  //   // console.log(originalMessage);
  //   const brainResponse = await askBrian(originalMessage);
  //   // console.log(brainResponse);
  //   return {
  //     action: "brian_ask",
  //     details: brainResponse,
  //   };
  // }
  return response;
}
