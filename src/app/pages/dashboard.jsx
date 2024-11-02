import { PoweredBy } from "../components/poweredby";
import { Hero } from "../components/hero";
import { BuildBy } from "../components/buildby";
import { Example } from "../components/examples";
import { Footer } from "../aceternity/footer";

export const Dashboard = () => {
  return (
    <>
      <Hero />
      <PoweredBy />
      <Example />
      <BuildBy />
      <Footer />
    </>
  );
};
