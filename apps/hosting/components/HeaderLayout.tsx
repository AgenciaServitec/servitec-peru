"use client";

import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { ContentWidth } from "@/components/ContentWidth";
import { HardHat, Headset, Store } from "lucide-react";

export const HeaderLayout = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300",
        scrolled
          ? "bg-black/55 backdrop-blur-md border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <ContentWidth>
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-servitec.png"
              alt="Logo de Servitec Perú"
              width={170}
              height={36}
              priority
            />
          </Link>

          {/* Mobile */}
          <button className="lg:hidden rounded-xl border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10">
            <svg
              className="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              fill="currentColor"
            >
              <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
            </svg>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-4">
            <ul className="flex items-center gap-2">
              <NavItem href="/" label="Inicio">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272h16v176c0 35.3 28.7 64 64 64h288c35.3 0 64-28.7 64-64V272h16c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1zM240 320h32c26.5 0 48 21.5 48 48v96H192v-96c0-26.5 21.5-48 48-48"
                  />
                </svg>
              </NavItem>

              <NavItem href="/services" label="Servicios">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14 15h-4v-2H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6h-8zm6-9h-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v4h20V8a2 2 0 0 0-2-2m-4 0H8V4h8z"
                  />
                </svg>
              </NavItem>

              <NavItem href="/about" label="Nosotros">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M24 14.6c0 .6-1.2 1-2.6 1.2c-.9-1.7-2.7-3-4.8-3.9c.2-.3.4-.5.6-.8h.8c3.1-.1 6 1.8 6 3.5M6.8 11H6c-3.1 0-6 1.9-6 3.6c0 .6 1.2 1 2.6 1.2c.9-1.7 2.7-3 4.8-3.9zm5.2 1c2.2 0 4-1.8 4-4s-1.8-4-4-4s-4 1.8-4 4s1.8 4 4 4m0 1c-4.1 0-8 2.6-8 5c0 2 8 2 8 2s8 0 8-2c0-2.4-3.9-5-8-5"
                  />
                </svg>
              </NavItem>

              <NavItem href="/contact" label="Contacto">
                <Headset className="w-4" />
              </NavItem>
            </ul>

            <div className="flex items-center gap-2 pl-2">
              <CtaPill href="/work" variant="work">
                <HardHat className="w-4" />
                <span>Servitec Work</span>
              </CtaPill>

              <CtaPill href="/tienda" variant="shop">
                <Store className="w-4" />
                <span>Tienda</span>
              </CtaPill>
            </div>
          </nav>
        </div>
      </ContentWidth>
    </header>
  );
};

function NavItem({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
      >
        {children}
        <span>{label}</span>
      </Link>
    </li>
  );
}

function CtaPill({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "work" | "shop";
  children: ReactNode;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition border";

  const styles =
    variant === "work"
      ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
      : "border-primary/30 bg-primary/15 text-white hover:bg-primary/20";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
