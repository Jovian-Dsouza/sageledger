import React from "react";
import MessageContainer from "./MessageContainer";

function Message({ message, userName, aiName, userAvatar, aiAvatar }: any) {
  const isSystemMessage = message.role == "assistant";
  const displayName = !isSystemMessage ? userName : aiName;
  const avatar = !isSystemMessage ? userAvatar : aiAvatar;

  return (
    <MessageContainer
      avatar={avatar}
      name={displayName}
    >
      <p className="text-sm whitespace-pre-line">{message.content}</p>
    </MessageContainer>
  );
}

export default Message;
