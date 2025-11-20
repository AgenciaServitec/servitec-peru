import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeaderLayout } from "@/components/HeaderLayout";
import { FooterLayout } from "@/components/FooterLayout";

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

        <div className="relative content-wrapper">
          <div className="global-background"></div>
          <div className="relative z-10">{children}</div>
        </div>

        <FooterLayout />

        <style>
          {`
            .content-wrapper {
              position: relative;
              width: 100%;
            }
          
            .global-background {
              position: absolute;
              inset: 0;
              z-index: -1;
              pointer-events: none;
          
              background-color: #0d0d0d;
              background-image:
                radial-gradient(
                  circle at 50% 50%,
                  rgba(255, 230, 0, 0.12) 1px,   /* puntos amarillos */
                  transparent 0
                ),
                linear-gradient(rgba(255, 220, 0, 0.05) 1px, transparent 0), /* líneas amarillas verticales suaves */
                linear-gradient(
                  90deg,
                  rgba(255, 220, 0, 0.05) 1px,
                  transparent 0
                ); /* líneas horizontales */
              background-size:
                80px 80px,  
                40px 40px, 
                40px 40px;
            }
          
            .global-background::after {
              content: "";
              position: absolute;
              inset: 0;
              background: radial-gradient(
                circle,
                rgba(255, 255, 0, 0.10) 1px,  /* brillo suave amarillo */
                transparent 1px
              );
              background-size: 120px 120px;
              opacity: 0.7;
              filter: drop-shadow(0 0 8px rgba(255, 255, 0, 0.25));
            }
          `}
        </style>
      </body>
    </html>
  );
}
