import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import { AnalyticsClient } from "@/app/AnalyticsClient";
import { Nav } from "@/ui/navigation";
import "@/styles/globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-jb-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Catalin Leca — Senior Software Engineer",
  description:
    "I build complex, production-grade systems — from complex UIs and real-time experiences to multi-service platforms and infrastructure.",
  other: {
    "theme-color": "#0e0e11",
  },
  openGraph: {
    title: "Catalin Leca — Senior Software Engineer",
    description:
      "I build complex, production-grade systems — from complex UIs and real-time experiences to multi-service platforms and infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={{ colorScheme: "dark" }}>
      <body
        className={`${dmSerif.variable} ${dmSans.variable} ${jbMono.variable}`}
      >
        <Suspense fallback={null}>
          <AnalyticsClient />
        </Suspense>
        <Nav />
        {children}
      </body>
    </html>
  );
}
