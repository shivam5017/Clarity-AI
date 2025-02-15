"use client"
import { PoweredBy } from "./components/poweredby";
import { Hero } from "./components/hero";
import { BuildBy } from "./components/buildby";
import { Example } from "./components/examples";
import { Footer } from "@/app/aceternity/footer";
import { NavbarDemo } from "@/app/aceternity/navbar";
import {Subscriptions} from "./components/subscriptions"

 const MarketingPage = () => {
  return (
    <>
      <NavbarDemo />
      <Hero />
      <PoweredBy />
      <Example />
      <Subscriptions />
      <BuildBy />
      <Footer />
    </>
  );
};

export default MarketingPage;