import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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
  title: "Servitec Perú | Soporte Técnico e Informático Especializado",
  description:
    "Líderes en reparación de laptops, proyectores y servidores en Lima. Soporte técnico profesional con garantía para empresas y hogares. ¡Contáctanos ahora!",
  keywords: [
    "reparación de laptops lima",
    "reparación de proyectores",
    "mantenimiento de servidores",
    "soporte técnico especializado",
    "Servitec Perú",
  ],
  openGraph: {
    title: "Servitec Perú | Expertos en Soporte Técnico e Informática",
    description:
      "Reparación garantizada de laptops, proyectores y cámaras. Soluciones tecnológicas integrales en Lima. ¡Tu equipo en manos de expertos!",
    url: "https://www.servitecperu.com",
    siteName: "Servitec Perú",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Servitec Perú - Soporte Técnico",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  icons: {
    icon: "/icon-servitec.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Servitec Perú",
    image: "https://www.servitecperu.com/icon-servitec.png",
    "@id": "https://www.servitecperu.com",
    url: "https://www.servitecperu.com",
    telephone: "+51941801827",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ca. Coronel Bermudez 113, Lima 15064",
      addressLocality: "Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    description:
      "Empresa líder en servicios informáticos, reparación de proyectores, laptops y cámaras de seguridad.",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <html
      lang="es"
      className="dark bg-[#050505]"
      style={{ colorScheme: "dark" }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative text-white bg-[#050505] selection:bg-primary/30 min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <HeaderLayout />

        <main className="flex-1">{children}</main>

        <CookieBanner />
        <FooterLayout />

        <WhatsAppButton />

        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
