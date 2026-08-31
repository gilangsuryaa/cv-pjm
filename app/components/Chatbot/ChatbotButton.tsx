"use client";

import Image from "next/image";

export default function ChatbotButton() {
  const handleClick = () => {
    console.log("PJM Chatbot diklik");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Buka PJM Chatbot"
      className="
        fixed
        bottom-6
        right-6
        z-50
        h-24
        w-24
        bg-transparent
        transition-all
        duration-300
        hover:scale-110
        active:scale-95
      "
    >
      <div className="relative h-full w-full">
        <Image
          src="/images/chatbot/logo-chatbot.png"
          alt="PJM Chatbot"
          fill
          sizes="96px"
          className="object-contain drop-shadow-lg"
        />
      </div>
    </button>
  );
}