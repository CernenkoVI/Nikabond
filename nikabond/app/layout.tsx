import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoginModal from "./components/modals/LoginModal";
import Navbar from "./components/navbar/Navbar";
import SignUpModal from "./components/modals/SignupModal";
import AddPortfolioModal from "./components/modals/AddPortfolioModal";
import AddAgentModal from "./components/modals/AddAgentModal";
import AddProjectModal from "./components/modals/AddProjectModal";
import AddRoleModal from "./components/modals/AddRoleModal";
import AddSessionModal from "./components/modals/AddSessionModal";
import AssignActorsModal from "./components/modals/AssignActorsModal";
import EditActorModal from "./components/modals/EditActorModal";
import EditAgentModal from "./components/modals/EditAgentModal";
import EditProjectModal from "./components/modals/EditProjectModal";
import EditRoleModal from "./components/modals/EditRoleModal";
import EditSessionModal from "./components/modals/EditSessionModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikabond",
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
        <AddAgentModal />
        <AddProjectModal />
        <AddRoleModal />
        <AddSessionModal />
        <AssignActorsModal />
        <EditActorModal />
        <EditAgentModal />
        <EditProjectModal />
        <EditRoleModal />
        <EditSessionModal />
      </body>
    </html>
  );
}
