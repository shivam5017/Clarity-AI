"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CustomBtnWithIcon } from "./button";
import { Twitter } from "../svgs/svg";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  return (
    <div
      className={cn("fixed top-4 left-0 right-0 max-w-2xl mx-auto z-50", className)}
    >
      <div className="relative rounded-full border  bg-white border-black/[0.2] shadow-input flex justify-between items-center px-4 py-2 mx-4 sm:mx-4">
        <h1 className="text-sm font-bold text-black ">Clarity AI</h1>
        <CustomBtnWithIcon text={"Follow"} icon={<Twitter />} />
      </div>
    </div>
  );
}
