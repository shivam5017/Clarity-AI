import AppContextProvider from "./AppContext";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Thumblify",
  description:
    "At Thumbify, our AI-powered tool generates eye-catching thumbnails in seconds, helping you elevate your content and increase engagement effortlessly!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={poppins.variable}>{children}</body>
      </AppContextProvider>
    </html>
  );
}
