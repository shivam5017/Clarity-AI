import React from "react";
import { HeroParallax } from "@/app/aceternity/ui/hero-parallax";
import Image_one from "@/app/images/img1.png"
import Image_two from "@/app/images/img2.png"
import Image_three from "@/app/images/img3.png"
import Image_four from "@/app/images/img4.png"

export function Example() {
  return <HeroParallax products={products} />;
}

export const products = [
  { title: "Overview_1", thumbnail: Image_four },
  { title: "Available Templates_1", thumbnail: Image_two },
  { title: "Blog Post_1", thumbnail: Image_three },
  { title: "YT Hastags_1", thumbnail: Image_one },
  { title: "Overview_2", thumbnail: Image_four },
  { title: "Available Templates_2", thumbnail: Image_two },
  { title: "Blog Post_2", thumbnail: Image_three },
  { title: "YT Hastags_2", thumbnail: Image_one },
  { title: "Overview_3", thumbnail: Image_four },
  { title: "Available Templates_3", thumbnail: Image_two },
  { title: "Blog Post_3", thumbnail: Image_three },
  { title: "YT Hastags_3", thumbnail: Image_one },
  { title: "Overview_4", thumbnail: Image_four },
  { title: "Available Templates_4", thumbnail: Image_two },
  { title: "Blog Post_4", thumbnail: Image_three },
];
