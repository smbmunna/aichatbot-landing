import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bangla glyphs for customer messages and replies.
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AI Sales & Support Desk by AppifyDevs",
  description:
    "One inbox for Facebook, Instagram, WhatsApp and website chat. AI answers product questions and captures orders from your own catalog — in Bangla, English and Banglish — and hands difficult cases to your team.",
  openGraph: {
    title: "AI Sales & Support Desk by AppifyDevs",
    description:
      "Answers from your own records. Orders captured privately. Difficult cases go to a person.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
