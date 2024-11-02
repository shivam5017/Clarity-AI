import React from "react";
import { HeroParallax } from "@/app/aceternity/ui/hero-parallax";
import exampleImage from "@/app/images/example.png";

export function Example() {
  return <HeroParallax products={products} />;
}

export const products = [
  { title: "Moonbeam", thumbnail: exampleImage },
  { title: "Cursor", thumbnail: exampleImage },
  { title: "Rogue", thumbnail: exampleImage },
  { title: "Editorially", thumbnail: exampleImage },
  { title: "Editrix AI", thumbnail: exampleImage },
  { title: "Pixel Perfect", thumbnail: exampleImage },
  { title: "Algochurn", thumbnail: exampleImage },
  { title: "Aceternity UI", thumbnail: exampleImage },
  { title: "Tailwind Master Kit", thumbnail: exampleImage },
  { title: "SmartBridge", thumbnail: exampleImage },
  { title: "Renderwork Studio", thumbnail: exampleImage },
  { title: "Creme Digital", thumbnail: exampleImage },
  { title: "Golden Bells Academy", thumbnail: exampleImage },
  { title: "Invoker Labs", thumbnail: exampleImage },
  { title: "E Free Invoice", thumbnail: exampleImage },
];
