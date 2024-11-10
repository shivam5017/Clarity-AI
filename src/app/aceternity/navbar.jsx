"use client";
import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { CustomBtn } from "./button";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import Spinner from "./spinner"

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  return (
    <div
      className={cn(
        "fixed top-4 left-0 right-0 max-w-2xl mx-auto z-50 font-faculty",
        className
      )}
    >
      <div className="relative rounded-full border bg-white border-black/[0.2] shadow-input flex justify-between items-center px-4 py-2 mx-4 sm:mx-4">
        <h1 className="text-sm font-bold text-black">Clarity AI</h1>
        <div className="flex space-x-4">
          {loading ? ( 
            <div className="flex items-center h-12 justify-center">
            <Spinner />
          </div>
          ) : user ? (
            <CustomBtn onClick={() => router.push("/dashboard")}>
              Dashboard
            </CustomBtn>
          ) : (
            <>
              <CustomBtn onClick={() => router.push("/signup")}>
                Sign Up
              </CustomBtn>
              <CustomBtn onClick={() => router.push("/login")}>Login</CustomBtn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
