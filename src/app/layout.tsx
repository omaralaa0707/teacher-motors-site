import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, Aref_Ruqaa, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ScrollProvider } from "@/components/motion/scroll-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// A ledger reads in a text serif with a plain grotesk carrying its labels —
// the register of a statement, not a showroom brochure.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
});
const ibmSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-sans",
});
const aref = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-aref",
});
const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-arabic",
});

export const metadata: Metadata = {
  title: "Teacher Motors — one million followers | Sheikh Zayed, Giza",
  description:
    "A lending centre before a dealership, by their own bio — and the only account in this series with a seven-figure following. A page built around the scale of that audience and what their finance offers actually say.",
  metadataBase: new URL("https://teacher-motors-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Teacher Motors — one million followers",
    description: "A dealership page built around an audience two orders of magnitude larger than any other in the series.",
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#f2efe8" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${fraunces.variable} ${ibmSans.variable} ${aref.variable} ${ibmArabic.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        {/* Entries post in under an intersection observer, so without
            scripting every block would stay at opacity 0. */}
        <noscript>
          <style>{`[data-post],[data-post-rule]{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          <ScrollProvider />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
