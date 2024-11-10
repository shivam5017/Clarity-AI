"use client";
import { GoogleGeminiEffect } from "../../aceternity/ui/google-gemini-effect";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { CustomBtn } from "../../aceternity/button";


export const BuildBy = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] bg-zinc-900 w-full dark:border dark:border-white/[0.1] rounded-none relative pt-40 overflow-clip font-faculty"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      >
        <>
          <p className="text-2xl md:text-7xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
            {`A Product by Innovate HUB`}
          </p>
          <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">
            {`Clarity AI`}
          </p>
          <div className="w-full h-[890px] -top-60 md:-top-40 flex items-center justify-center absolute ">
            <CustomBtn
              bgColor="bg-[linear-gradient(110deg,#f8f9fa,45%,#e9ecef,55%,#f8f9fa)]"
              textColor="text-black"
            >
              Innovate HUB
            </CustomBtn>
          </div>
        </>
      </GoogleGeminiEffect>
    </div>
  );
};
