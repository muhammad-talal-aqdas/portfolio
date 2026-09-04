import type { Metadata } from "next";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import localFont from "next/font/local";
import { PersistentContact } from "@/components/PersistentContact";
import "./globals.css";

const panchang = localFont({
  src: [
    {
      path: "../../public/fonts/Panchang_Complete/Fonts/WEB/fonts/Panchang-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Panchang_Complete/Fonts/WEB/fonts/Panchang-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Panchang_Complete/Fonts/WEB/fonts/Panchang-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Panchang_Complete/Fonts/WEB/fonts/Panchang-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const array = localFont({
  src: [
    {
      path: "../../public/fonts/Array_Complete/Fonts/WEB/fonts/Array-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Array_Complete/Fonts/WEB/fonts/Array-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Array_Complete/Fonts/WEB/fonts/Array-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-urdu",
  display: "swap",
  fallback: ["serif"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${panchang.variable} ${array.variable} ${notoNastaliqUrdu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}<PersistentContact /></body>
    </html>
  );
}
