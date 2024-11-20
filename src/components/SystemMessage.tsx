import React from "react";
import MessageContainer from "./MessageContainer";
import GradientButton from "@/components/GradientButton";

function PoweredBy({ poweredby }) {
  const poweredByImages = {
    Jupiter: "/jupiter-logo.svg",
    "Brianknows.org": "/brian_logo.png",
  };

  const poweredByImg = poweredByImages[poweredby] || null;

  if (!poweredby) {
    return null;
  }
  return (
    <div className="flex space-x-2 justify-center">
      <div className="text-sm">
        Powered by <span className="">{poweredby}</span>
      </div>
      {poweredByImg && (
        <img src={poweredByImg} alt="powered by logo" className="w-4 h-4" />
      )}
    </div>
  );
}

function SystemMesage({ children, title, onConfirm, poweredBy }: any) {
  const avatar = "/sageledger_logo.jpeg";
  const displayName = "SageLedger";

  return (
    <MessageContainer name={displayName} avatar={avatar}>
      <div className="bg-[#1D1D21] rounded-xl px-6 py-3 flex flex-col items-center space-y-4 mt-1">
        <div className="text-xl font-semibold">{title}</div>

        {children}

        {onConfirm && (
          <GradientButton onClick={onConfirm} className="w-full">
            Confirm
          </GradientButton>
        )}

        <PoweredBy poweredby={poweredBy} />
      </div>
    </MessageContainer>
  );
}

export default SystemMesage;
