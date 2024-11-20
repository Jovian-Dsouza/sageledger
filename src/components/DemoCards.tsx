"use client";
import { useEffect, useState } from "react";
import { demoPrompts } from "@/data/llmData";

export function DemoCard({ title, prompt, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="gradient-border-demo-prompts rounded-lg">
      <div
        className={`bg-[#111215] m-[1px] rounded-lg py-2 px-4 cursor-pointer transition duration-300 ease-in-out ${
          hovered ? "bg-black/60 text-white" : ""
        }`}
        onClick={() => {
          onClick(prompt);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h3 className="text-left text-md font-semibold ">{title}</h3>
        <p className="text-left text-sm text-gray-300">{prompt}</p>
      </div>
    </div>
  );
}

export function DemoCards({ onCardClick }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const prompts = isSmallScreen
    ? demoPrompts.slice(0, 2)
    : demoPrompts.slice(0, 4);

  useEffect(()=>{
    setIsSmallScreen(window.innerWidth < 640); // Adjust breakpoint as needed
  }, [])

  return (
    <div className="items-center w-full text-gray-500  text-center py-1 px-2  mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {prompts.map((prompt, index) => (
          <DemoCard
            key={index}
            title={prompt.name}
            prompt={prompt.prompt}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}
