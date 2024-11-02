"use client";
import { CustomBtn } from "../aceternity/button";
import { AuroraBackground } from "../aceternity/ui/aurora-background";

export const Hero = () => {
  return (
    <>
      <AuroraBackground>
        <section className="relative flex flex-col container items-center justify-center h-full text-center ">
          <div className="mb-8 ">
            <h1 className="text-2xl sm:text-6xl md:text-8xl font-bold ">
              Elevate Your Content with AI-Generated Thumbnails
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-lightText max-w-xxl mx-auto mb-12 ">
            At Thumblify, our AI-powered tool generates eye-catching thumbnails
            in seconds, helping you elevate your content and increase engagement
            effortlessly!
          </p>
          <CustomBtn>Join Community</CustomBtn>
        </section>
      </AuroraBackground>
    </>
  );
};
