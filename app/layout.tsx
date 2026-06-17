import type { Metadata } from "next";
import "./globals.css";
import { literata, inter } from "@/lib/fonts";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Grain } from "@/components/atmosphere/grain";

export const metadata: Metadata = {
  title: {
    default: "Quint Home — Air Elevated",
    template: "%s · Quint Home",
  },
  description:
    "Hotel-grade home fragrance from Mumbai. Waterless electronic diffusers and IFRA-compliant fragrance oils, designed to be displayed.",
  metadataBase: new URL("https://quinthome.in"),
  openGraph: {
    type: "website",
    title: "Quint Home — Air Elevated",
    description:
      "Hotel-grade home fragrance from Mumbai. Designed for the considered Indian home.",
    siteName: "Quint Home",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${literata.variable} ${inter.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[color:var(--color-white)] text-[color:var(--color-charcoal)]">
        <LenisProvider />
        <Grain />
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
