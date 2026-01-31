import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: {
    google: "MDm9JeH1a8mhBdNw8oZGCFJSHZ570h2IBOT4C5MyrlE"
  },
  title: "Guess the Event – Daily History Guessing Game",
  description: "Guess the year of real historical (and other) events. Play daily challenges, compare your score with others, and see how you rank worldwide",
   keywords: [
    "history game",
    "guess the year",
    "guess the event",
    "daily quiz",
    "historical events",
    "trivia game",
  ],
  openGraph: {
    title: "Guess the Event",
    description:
      "Daily historical guessing game. Guess the year, score points, and see how you compare.",
    url: "https://guess-the-event.vercel.app",
    siteName: "Guess the Event",
    images: [
      {
        url: "https://guess-the-event.vercel.app/thinkingFace.png",
        width: 1200,
        height: 630,
        alt: "Guess the Event",
      },
    ],
    locale: "en_US",
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
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
