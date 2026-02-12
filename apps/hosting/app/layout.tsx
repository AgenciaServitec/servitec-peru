import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeaderLayout } from "../components/HeaderLayout";
import { FooterLayout } from "../components/FooterLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Servitec Peru",
  description: "Reparación de proyectores",
  icons: {
    icon: "/icon-servitec.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="antialiased relative">
        <HeaderLayout />

        <div className="relative">
          <div className="absolute inset-0 bg-black/20" />
          <main className="relative">{children}</main>
        </div>

        <FooterLayout />
      </body>
    </html>
  );
}
