import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoginModal from "./components/modals/LoginModal";
import Navbar from "./components/navbar/Navbar";
import SignUpModal from "./components/modals/SignupModal";
import AddPortfolioModal from "./components/modals/AddPortfolioModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Niakbond",
  description: "Casting production platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <div className="pt-26">
          {children}
        </div>
        <LoginModal />
        <SignUpModal />
        <AddPortfolioModal />
      </body>
    </html>
  );
}
