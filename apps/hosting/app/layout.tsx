import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
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

const SITE_URL = "https://www.servitecperu.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
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
    url: SITE_URL,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ComputerRepair"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Servitec Perú Group E.I.R.L.",
  alternateName: "Servitec Perú",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo-servitec.png`,
  image: `${SITE_URL}/og-image.png`,
  telephone: ["+51972252744", "+51941801827"],
  priceRange: "$$",
  taxID: "20604141240",
  description:
    "Servicio técnico independiente en Lima especializado en diagnóstico, mantenimiento y reparación de proyectores, laptops y equipos informáticos. Empresa formal con RUC 20604141240.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Néstor Bermúdez 113",
    addressLocality: "Chorrillos",
    addressRegion: "Lima",
    postalCode: "15064",
    addressCountry: "PE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -12.193026,
    longitude: -77.012351,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "13:00",
    },
  ],
  areaServed: {
    "@type": "Place",
    name: "Lima Metropolitana",
  },
  sameAs: [
    "https://www.facebook.com/Servitec.chorrillos",
    "https://www.youtube.com/@SERVITECPERUGROUPEIRL",
    "https://www.tiktok.com/@servitec_peru_group",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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

        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}