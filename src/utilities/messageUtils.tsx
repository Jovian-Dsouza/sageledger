export function getMessageObject(input, isSystemMessage) {
  return {
    role: isSystemMessage ? "assistant" : "user",
    content: input,
  };
}


export function filterRelevantMessages(messages) {
  const n = messages.length;
  if (n == 0 || n == 1) {
    return messages;
  }
  let start = n - 1;
  while (start >= 0 && messages[start].role === "user") {
    start--;
  }
  start = Math.min(n - 1, start + 1);
  return messages.slice(start, n);
}

export function checkLastMessageFromUser(messages) {
  const lastMessage = messages[messages.length - 1];
  if (lastMessage && lastMessage.role === "user") {
    return true;
  }
  return false;
}