import { useEffect, useState } from "react";

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  

  

  async function getChatResponse(messages) {
    setIsLoading(true);
    setIsError(false);
    const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
    const endpoint = `${process.env.NEXT_PUBLIC_APP_URL}/api/chat`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIsLoading(false);
      return JSON.stringify(data["result"]);
    } catch (error) {
      setIsError(true);
      throw new Error("There was a problem with the fetch operation:", error);
    }
  }

  return {
    isLoading,
    isError,
    getChatResponse,
  };
}
