import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const MonaSans = Mona_Sans({
  variable: "--font-Mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "prepWise",
  description: "an Ai-powered platform to prepare for mock interview",
};

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${MonaSans.className} antialiased pattern`}>
        <Toaster/>
        {children}
      </body>
    </html>
  );
}
