import { Literata, Inter } from "next/font/google";

export const literata = Literata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-literata",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const fontVars = `${literata.variable} ${inter.variable}`;
