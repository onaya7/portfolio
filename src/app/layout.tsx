import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { site } from "@/content/contact";
import { cn } from "@/lib/utils";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import "@/styles/index.css";
import { themeColor } from "@/styles/theme";

/**
 * Newsreader carries display and body, in two weights and one italic.
 *
 * The variable cut with its optical-size axis was the first choice and was dropped: the two
 * variable files came to 273kB and pushed mobile LCP to 3.3s, because the largest element on
 * the page is the h1 and it was re-rendering on font swap. Static 300 and 400 instances cover
 * every weight actually used. The cost is the optical-size axis, so the display line no longer
 * gets a cut tuned for large sizes; at the two sizes in use that is not visible.
 *
 * next/font generates `size-adjust` fallback metrics for both families and self-hosts the
 * files, so swapping in the real face causes no layout shift.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: themeColor.dark },
  ],
};

/**
 * Runs before first paint. The signature interaction's start state is gated on this class, so
 * without it every figure renders at its resting, correct value. Kept inline and tiny because
 * it has to beat the first paint; an external file would flash.
 */
const MOTION_GATE =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window)" +
  "document.documentElement.classList.add('js-motion')}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The motion gate mutates this element's class list before React hydrates, by design,
  // so the html element is the one place a server/client class difference is expected.
  return (
    <html lang="en" className={cn(newsreader.variable, plexMono.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: MOTION_GATE,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only font-mono text-micro focus:not-sr-only focus:fixed focus:left-r2 focus:top-r2 focus:z-50 focus:bg-paper focus:px-r2 focus:py-r1 focus:text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[rgb(var(--stamp))]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
