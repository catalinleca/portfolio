import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Catalin Leca — Senior Frontend Engineer",
  description:
    "I build complex, production-grade frontend systems — from editor UIs and real-time experiences to performance-critical platforms.",
  openGraph: {
    title: "Catalin Leca — Senior Frontend Engineer",
    description:
      "I build complex, production-grade frontend systems — from editor UIs and real-time experiences to performance-critical platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
