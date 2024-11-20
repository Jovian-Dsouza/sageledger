"use client";

import Image from "next/image";
import React from "react";
import MobileContainer from "@/components/landing/MobileContainer";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

const InputWithGradientBorder = () => {
  return (
    <div className="gradient-border-outer flex w-full md:w-[80%] text-white font-semibold rounded p-0.5 ">
      <input
        type="email"
        placeholder="Enter Email"
        className="flex w-full bg-[#111215] text-white rounded px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
    </div>
  );
};

function LandingPage() {
  return (
    <main className="h-screen pt-5 sm:pt-10 md:pt-16 lg:pt-20 bg-[#111215] overflow-scroll no-scrollbar">
      <div className="flex flex-col  justify-center mx-auto min-h-full w-full max-w-6xl  px-5  py-14 md:py-10">
        <section className="flex flex-col-reverse md:flex-row items-center justify-between space-y-5 md:space-y-0 md:space-x-10">
          <div className="flex flex-col space-y-3 max-w-lg md:max-w-none">
            <div className="text-center sm:text-left text-4xl max-w-lg font-semibold text-white font-oxygen">
              We make your Crypto journey effortless with AI and LLM
            </div>
            <div className="text-lg max-w-md text-gray-500">
              Your all-in-one Web3 companion. Unleash the AI magic with Swapping
              🔄, Limit Orders 🎯, DCA 💹, Portfolio Mastery 📈, and Token
              Transfers 🚀. Let's dive into the future!{" "}
              <Link
                href="/chat"
                className="pl-2 text-[#C93586] font-bold underline"
              >
                Try Demo
              </Link>
            </div>
            <div className="p-2"></div>
            <div className="flex flex-col md:flex-row w-full md:space-x-2">
              <InputWithGradientBorder />
              <GradientButton
                onClick={() => {
                  console.log("Waitlist joined");
                }}
              >
                Join Waitlist
              </GradientButton>
            </div>
          </div>
          <div className="py-3 md:py-0"></div>
          <MobileContainer />

          {/* <div className="flex-shrink-0 bg-red-400"> */}

          {/* </div> */}

          {/* <div className="flex-shrink-0">
            <Image
              src="/landing/pattern.svg"
              alt=""
              className="w-full h-auto md:w-[40rem] md:h-[25rem]"
              layout="intrinsic"
              width={800}
              height={500}
            />
          </div> */}
        </section>
      </div>
      <Footer />
    </main>
  );
}

export default LandingPage;
