import type { Metadata } from "next";
import "./globals.css";
import { literata, inter } from "@/lib/fonts";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Grain } from "@/components/atmosphere/grain";
import { ImageGuard } from "@/components/atmosphere/image-guard";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { payuConfigured } from "@/lib/payu/client";
import { shopifyAdminConfigured } from "@/lib/shopify/admin";

export const metadata: Metadata = {
  title: {
    default: "Quint Home",
    template: "%s · Quint Home",
  },
  description:
    "Hotel-grade home fragrance from Mumbai. Waterless electronic diffusers and IFRA-compliant fragrance oils, designed to be displayed.",
  metadataBase: new URL("https://www.quinthome.in"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Quint Home",
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
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-[color:var(--color-white)] text-[color:var(--color-charcoal)]"
      >
        {/* Names the home page as the brand's entity, which is what search
            engines use to decide the page to show for a brand query — without
            it a listing page can outrank the home page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.quinthome.in/#organization",
                  name: "Quint Home",
                  url: "https://www.quinthome.in",
                  logo: "https://www.quinthome.in/icon.png",
                  email: "hello@quinthome.in",
                  telephone: "+91 98196 16668",
                  description:
                    "Hotel-grade home fragrance from Mumbai. Waterless electronic diffusers and IFRA-compliant fragrance oils.",
                  sameAs: ["https://www.instagram.com/shopquinthome/"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.quinthome.in/#website",
                  url: "https://www.quinthome.in",
                  name: "Quint Home",
                  publisher: { "@id": "https://www.quinthome.in/#organization" },
                },
              ],
            }),
          }}
        />

        {/* Checkout only moves off Shopify once payment *and* order creation
            are both configured — see docs/payu-checkout.md. */}
        <CartProvider
          headlessCheckout={payuConfigured && shopifyAdminConfigured}
        >
          <LenisProvider />
          <ImageGuard />
          <Grain />
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
