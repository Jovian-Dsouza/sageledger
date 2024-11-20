import React, {useState} from "react";
import {
  UserIcon,
  ClockIcon,
  ArrowPathIcon,
  XMarkIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

function TabSelector() {
  const [activeTab, setActiveTab] = useState("crypto");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex text-slate-500 justify-around w-full border-b">
      <div
        className={`cursor-pointer ${
          activeTab === "crypto"
            ? "border-b-2 border-blue-600 text-black font-semibold"
            : ""
        }`}
        onClick={() => handleTabClick("crypto")}
      >
        Crypto
      </div>
      <div
        className={`cursor-pointer ${
          activeTab === "nfts"
            ? "border-b-2 border-blue-600 text-black font-semibold"
            : ""
        }`}
        onClick={() => handleTabClick("nfts")}
      >
        NFTs
      </div>
    </div>
  );
}

function OktoWalletContainer({ show, setShow }) {
  if (!show) {
    return <div></div>;
  }
  return (
    <div className="z-30 flex flex-col space-y-5 fixed top-0 right-20 h-[38rem] w-[22rem] bg-white border text-black rounded-lg shadow-lg p-4">
      {/* Warning */}
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-md mb-4">
        Awaiting integration: Wallet UI is pending SDK integration, awaiting API
        keys from Okto team.
      </div>

      {/* header */}
      <div className="flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center justify-center space-x-2">
          <img src="/okto_logo.png" alt="" className="w-8 h-8" />
          <div className="font-bold text-xl">Okto Wallet</div>
        </div>
        <div className="flex items-center space-x-3">
          <ArrowPathIcon className="h-4 w-4 text-slate-600 hover:text-black" />
          <ClockIcon className="h-4 w-4 text-slate-600 hover:text-black" />
          <UserIcon className="h-4 w-4 text-slate-600 hover:text-black" />
          {/* Close button */}
          <XMarkIcon
            onClick={() => {
              setShow(false);
            }}
            className="h-5 w-5 text-slate-600 hover:text-black"
          >
            Close
          </XMarkIcon>
        </div>
      </div>

      {/* Add Funds */}
      <div className="rounded-full text-white font-semibold text-xs text-center border-black p-2 bg-purple-600 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
        Add Funds
      </div>

      {/* Coin container */}
      <div className="flex flex-col w-full items-center justify-between h-full pb-5">
        <TabSelector />
        <div className="flex flex-col items-center justify-center space-y-3">
          <img src="/coinAssets.png" alt="" className="w-32" />
          <div className="text-xl font-bold">Your Crypto Lives here</div>
          <div className="text-sm text-gray-400">Nothing to see here</div>
        </div>
        {/* Add Funds */}
        <div className="rounded-full w-full font-semibold text-sm text-center border border-gray p-2 shadow-sm hover:scale-105 transition-transform duration-300">
          See all tokens
        </div>
      </div>
    </div>
  );
}

export default OktoWalletContainer;
