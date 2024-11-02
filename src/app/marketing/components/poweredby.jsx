"use client";
import { CustomTextWithIcon } from "../../aceternity/button";
import { Vercel, AceternityUI,NextJS } from "../../svgs/svg";

export const PoweredBy = () => {
  return (
    <>
      <section className="relative flex flex-col container items-center justify-center h-full text-center pt-10 ">
        <div className="mb-8 ">
          <h1 className="text-xl sm:text-4xl md:text-6xl font-bold ">
            Powered by
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex items-center">
              <CustomTextWithIcon
                text="NEXT.js"
                icon={<NextJS />}
              />
            </div>
            <div className="flex items-center">
              <CustomTextWithIcon text="Vercel" icon={<Vercel />} />
            </div>
            <div className="flex items-center">
              <CustomTextWithIcon
                text="Aceternity UI"
                icon={<AceternityUI />}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
