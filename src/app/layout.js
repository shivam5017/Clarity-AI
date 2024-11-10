import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata = {
  title: "Clarity AI",
  description:
    "Harness the power of AI with versatile tools designed to streamline your workflow and enhance your creativity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap"
          rel="stylesheet"
        />
      </head>
        <body className={`${poppins.variable} font-sans`}><AuthProvider>{children}</AuthProvider></body>

    </html>
  );
}
