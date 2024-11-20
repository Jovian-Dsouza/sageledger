import React from "react";
import Image from "next/image";

function MessageContainer({ name, avatar, children }: any) {
  return (
    <div className={`py-4 text-white`}>
      <div className="flex space-x-4 px-10 max-w-2xl mx-auto">
        <Image
          src={avatar}
          alt=""
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
        />
        <div className="flex flex-col">
          <div className="text-md font-bold">{name}</div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MessageContainer;
