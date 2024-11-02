import React from "react";
import { Spotlight } from "@/app/aceternity/ui/spotlight";
import { CustomBtn } from "@/app/aceternity/button";

export function Footer() {
  return (
    <div className="h-[40rem] w-full rounded-none flex flex-col md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Clarity AI
        </h1>

        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Transform your content and engage your audience like never before
        </p>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center mt-8 gap-20">
          <div className="mb-6 md:mb-0 text-center">
            <h3 className="text-lg font-semibold mb-2  text-neutral-300">
              About
            </h3>
            <ul className="space-y-1 text-sm ">
              <li>
                <button className="text-neutral-300 hover:underline">
                  Our Team
                </button>
              </li>
              <li>
                <button className="text-neutral-300 hover:underline">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-neutral-300 hover:underline">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          <div className="mb-6 md:mb-0 text-center">
            <h3 className="text-lg font-semibold mb-2  text-neutral-300">
              Social
            </h3>
            <ul className="space-y- text-sm ">
              <li>
                <button
                  onClick={() =>
                    window.open("https://x.com/Innovate_Hub_HQ", "_blank")
                  }
                  className="text-neutral-300 hover:underline"
                >
                  X
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    window.open("https://discord.gg/xtYsPCCC", "_blank")
                  }
                  className="text-neutral-300 hover:underline"
                >
                  Discord
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Email Subscription */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8">
          <input
            type="email"
            placeholder="Enter email for updates"
            className="p-2 rounded-full w-full max-w-md focus:outline-none bg-gray-700 text-white"
          />
          <CustomBtn className="transition-colors p-2 px-4 rounded-full sm:rounded-r-lg bg-accent text-white hover:bg-opacity-80">
            Submit
          </CustomBtn>
        </div>

        <div className="text-center text-sm text-neutral-400 mt-4">
          <span>@2024 All rights reserved</span>
        </div>
      </div>
    </div>
  );
}
