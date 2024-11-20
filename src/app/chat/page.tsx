"use client";
import { ChatInput } from "@/components/ChatInput";
import { Chat } from "@/components/Chat";
import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { useRecoilState } from "recoil";
import { messagesAtom } from "@/store/atoms/chatAtoms";
import { getMessageObject, filterRelevantMessages, checkLastMessageFromUser} from "@/utilities/messageUtils";

export default function ChatPage() {
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const { isLoading, isError, getChatResponse } = useChat();

  function addMessage(input, isSystemMessage) {
    setMessages((prevMessages) => [
      ...prevMessages,
      getMessageObject(input, isSystemMessage),
    ]);
  }

  const chatRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  function handleChatInput(input) {
    addMessage(input, false);
  }

  async function fetchServerMessage() {
    try {
      const relevantMessages = filterRelevantMessages(messages)
      // console.log("messages", messages)
      // console.log("relevant Messages", relevantMessages)
      const severMessage = await getChatResponse(relevantMessages);
      addMessage(severMessage, true);
    } catch (error) {
      console.error("Error handling chat input:", error);
    }
  }

  //Call server when message is changed
  useEffect(() => {
    if (checkLastMessageFromUser(messages)) {
      fetchServerMessage();
    }
  }, [messages]);

  return (
    <main className="h-screen pt-16 sm:pt-10 bg-[#111215]">
      <div className="flex h-full">
        <div className="flex flex-col h-full w-full overflow-hidden">
          <div className="flex-1 overflow-y-scroll no-scrollbar">
            <Chat isLoading={isLoading} isError={isError} isLoggedIn={true} />
            <div style={{ float: "left", clear: "both" }} ref={chatRef}></div>
          </div>

          <div className="sticky bottom-0 w-full">
            <ChatInput
              onSubmit={handleChatInput}
              isLoading={isLoading}
              isLoggedIn={true}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
