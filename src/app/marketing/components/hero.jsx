"use client";
import { CustomBtn } from "../../aceternity/button";
import { AuroraBackground } from "../../aceternity/ui/aurora-background";

export const Hero = () => {
  return (
    <>
      <AuroraBackground>
        <section className="relative flex flex-col container items-center justify-center h-full text-center poppins">
          <div className="mb-8 ">
            <h1 className="text-2xl sm:text-6xl md:text-8xl font-bold ">
              The Ultimate Hub for All Your AI Tooling Needs!
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-lightText max-w-xxl mx-auto mb-12 ">
            Harness the power of AI with versatile tools designed to streamline
            your workflow and enhance your creativity.
          </p>
          <CustomBtn>Join Community</CustomBtn>
        </section>
      </AuroraBackground>
    </>
  );
};
