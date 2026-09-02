"use client";

import Image from "next/image";
import { useState } from "react";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    console.log("Pesan dikirim");
  };

  return (
    <>
      {/* Tombol Chatbot */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
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
      )}

      {/* Window Chat */}
      {isOpen && (
        <div
          className="
            fixed
            bottom-20
            right-4
            z-50
            flex
            h-[min(650px, calc(100dvh-100px))]
            w-[calc(100vw-32px)]
            max-w-[420px]
            flex-col
            overflow-hidden
            rounded-xl
            border
            border-[#ddd]
            bg-[#fff]
            shadow-2xl
          "
        >
          {/* Header */}
          <div
            className="
              flex
              h-[70px]
              shrink-0
              items-center
              border-b
              border-[#e5cfc8]
              bg-white
              px-4
            "
          >
            {/* Back */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup chatbot"
              className="
                mr-3
                flex
                h-9
                w-9
                items-center
                justify-center
                text-[28px]
                leading-none
                text-[#0788D1]
                transition
                hover:text-[#056fa8]
              "
            >
              ←
            </button>

            {/* Logo */}
            <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-xl bg-white">
              <Image
                src="/images/chatbot/Chatbot-logo.png"
                alt="PJM Asisten"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>

            {/* Nama */}
            <div className="flex-1">
              <p className="text-[18px] font-semibold text-[#171717]">
                PJM Asisten
              </p>

              <p className="flex items-center gap-1 text-[12px] text-[#0788D1]">
                <span className="h-2 w-2 rounded-full bg-[#0788D1]" />
                Online
              </p>
            </div>

            {/* More */}
            <button
              type="button"
              aria-label="Menu chatbot"
              className="
                text-[25px]
                leading-none
                text-[#604f4b]
              "
            >
              ⋮
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto bg-[#fdfafa] p-4">
            <div className="flex items-start gap-3">
              {/* Bot Avatar */}
              <div
                className="
                  relative
                  mt-1
                  h-8
                  w-8
                  shrink-0
                  overflow-hidden
                  rounded-full
                  bg-white
                "
              >
                <Image
                  src="/images/chatbot/Chatbot-logo.png"
                  alt="PJM Asisten"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>

              <div className="max-w-[280px]">
                <p className="mb-1 text-[12px] text-[#604f4b]">
                  PJM Asisten
                </p>

                {/* Bubble */}
                <div
                  className="
                    rounded-lg
                    border
                    border-[#a9d9ee]
                    bg-[#f1eeee]
                    px-3
                    py-3
                    text-[15px]
                    leading-6
                    text-[#292929]
                  "
                >
                  Halo! Saya PJM Asisten,
                  <br />
                  pendamping teknis virtual CV.
                  <br />
                  Prima Jaya Mandiri.
                  <br />
                  <br />
                  Ada yang bisa saya bantu hari ini terkait layanan atau
                  produk kami?
                </div>

                {/* Quick Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="
                      rounded-xl
                      border
                      border-[#a90000]
                      px-4
                      py-2
                      text-[14px]
                      font-semibold
                      text-[#8f0000]
                      transition
                      hover:bg-[#fff3f1]
                    "
                  >
                    Rekomendasi AC
                  </button>

                  <button
                    type="button"
                    className="
                      rounded-xl
                      border
                      border-[#a98f8a]
                      px-4
                      py-2
                      text-[14px]
                      font-semibold
                      text-[#292929]
                      transition
                      hover:bg-[#f5f1f0]
                    "
                  >
                    Cari Produk
                  </button>

                  <button
                    type="button"
                    className="
                      rounded-xl
                      border
                      border-[#a98f8a]
                      px-4
                      py-2
                      text-[14px]
                      font-semibold
                      text-[#292929]
                      transition
                      hover:bg-[#f5f1f0]
                    "
                  >
                    Tanya Layanan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-[#ddd] bg-white p-3">
            <div
              className="
                flex
                h-[52px]
                items-center
                rounded-lg
                border
                border-[#b9dff0]
                bg-[#faf8f7]
                px-2
              "
            >
              {/* Plus */}
              <button
                type="button"
                aria-label="Tambah"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  text-[27px]
                  font-light
                  text-[#0788D1]
                "
              >
                +
              </button>

              <input
                type="text"
                placeholder="Ketik pesan..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-2
                  text-[14px]
                  text-[#333]
                  outline-none
                  placeholder:text-[#958887]
                "
              />

              {/* Send */}
              <button
                type="button"
                onClick={handleSend}
                aria-label="Kirim pesan"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded
                  bg-[#0788D1]
                  text-[20px]
                  font-bold
                  text-white
                  transition
                  hover:bg-[#056fa8]
                "
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}