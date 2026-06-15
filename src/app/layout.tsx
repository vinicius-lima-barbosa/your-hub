import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Hub",
  description:
    "Minimal focus dashboard for notes, pomodoro, events, and lo-fi streams.",
  keywords: [
    "notes",
    "pomodoro",
    "events",
    "lo-fi streams",
    "productivity",
    "focus",
    "minimalism",
  ],
  authors: [
    { name: "Vinícius Barbosa", url: "https://vinicius-portfolio.vercel.app" },
  ],
  icons: {
    icon: "/your-hub.png",
    apple: "/your-hub.png",
    shortcut: "/your-hub.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
