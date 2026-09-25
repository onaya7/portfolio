import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { site } from "@/content/profile";
import { cn } from "@/lib/utils";
import EmailComposer from "@/components/EmailComposer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import "@/styles/index.css";
import { themeColor } from "@/styles/theme";

/** Two families, both variable, one file each. */
const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}, ${site.title}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: `${site.name}, ${site.title}`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: themeColor.dark };

/**
 * Runs before first paint.
 *
 * 1. Applies the stored theme, so a light-mode visitor never sees a dark flash.
 * 2. Enables reveal-on-scroll only when it can work (IntersectionObserver, motion allowed), and
 *    withdraws it after 3s if the Reveal component never hydrated, so content cannot stay hidden.
 */
const BOOT =
  "try{var d=document.documentElement;d.dataset.theme=localStorage.getItem('theme')==='light'?'light':'dark'}catch(e){}" +
  "try{if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){" +
  "d.classList.add('js-reveal');setTimeout(function(){if(!window.__revealReady)d.classList.remove('js-reveal')},3000)}}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The boot script sets data-theme and a class on <html> before React hydrates, by design.
  return (
    <html lang="en" data-theme="dark" className={cn(geist.variable, geistMono.variable)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-30 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-small focus:text-bg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <EmailComposer />
      </body>
    </html>
  );
}
