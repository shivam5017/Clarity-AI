import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";

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

        <body className={poppins.variable}><AuthProvider>{children}</AuthProvider></body>

    </html>
  );
}
