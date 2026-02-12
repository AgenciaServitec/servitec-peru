"use client";

import Image from "next/image";
import Link from "next/link";
import { ContentWidth } from "@/components/ContentWidth";

type Social = {
  name: "Facebook" | "TikTok" | "Instagram" | "YouTube";
  href: string;
  brand: "facebook" | "tiktok" | "instagram" | "youtube";
};

const socials: Social[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Servitec.chorrillos/?locale=es_LA",
    brand: "facebook",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@TU_USUARIO",
    brand: "tiktok",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/TU_USUARIO",
    brand: "instagram",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@TU_CANAL",
    brand: "youtube",
  },
];

const posts = [
  {
    title: "Recupera la potencia de tu imagen",
    meta: "Tips • Proyectores",
    image: "/projector-repair.png",
  },
  {
    title: "Mantenimiento preventivo",
    meta: "Servicio • Taller",
    image: "/preventive-maintenance.jpg",
  },
  {
    title: "Cambio de lámpara con garantía",
    meta: "Caso real",
    image: "/projector-lamp-replacement.png",
  },
];

// Iconos simples (sin librería extra)
function SocialIcon({ brand }: { brand: Social["brand"] }) {
  switch (brand) {
    case "facebook":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 2 6.48 2 12.07c0 5.03 3.66 9.21 8.44 9.93v-7.03H7.9V12.07h2.54V9.86c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.9h-2.32V22c4.78-.72 8.44-4.9 8.44-9.93Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.6 5.82c1.02 1.2 2.3 1.92 3.7 2.1v3.13c-1.44-.05-2.8-.5-4-1.3v6.02c0 3.47-2.81 6.28-6.28 6.28A6.28 6.28 0 0 1 3.74 15.8c0-3.47 2.81-6.28 6.28-6.28.33 0 .66.03.98.08v3.46a2.9 2.9 0 0 0-.98-.17 2.91 2.91 0 1 0 2.91 2.91V2h3.06c.08 1.42.55 2.72 1.61 3.82Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5.2-.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21.6 7.2a3 3 0 0 0-2.11-2.12C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.49.48A3 3 0 0 0 2.4 7.2 31.5 31.5 0 0 0 2 12a31.5 31.5 0 0 0 .4 4.8 3 3 0 0 0 2.11 2.12c1.69.48 7.49.48 7.49.48s5.8 0 7.49-.48a3 3 0 0 0 2.11-2.12A31.5 31.5 0 0 0 22 12a31.5 31.5 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
        </svg>
      );
  }
}

export function SocialProof() {
  const primary = socials[0];

  return (
    <section className="py-10 my-20">
      <ContentWidth>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left */}
          <div className="lg:col-span-5">
            <p className="text-sm text-white/60">Comunidad</p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Síguenos en nuestras redes
            </h2>

            <p className="mt-3 text-white/70 max-w-md">
              Publicamos tips, trabajos realizados y novedades. Mira casos
              reales y recomendaciones para cuidar tu equipo.
            </p>

            {/* Social chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white hover:bg-white/[0.1]"
                >
                  <SocialIcon brand={s.brand} />
                  {s.name}
                </Link>
              ))}
            </div>

            {/* Primary CTA */}
            <div className="mt-5">
              <Link
                href={primary.href}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm text-white hover:bg-white/15"
              >
                Ver publicaciones
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {posts.map((p) => (
                <div
                  key={p.title}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-white/60">{p.meta}</p>
                    <p className="mt-1 text-sm font-medium text-white line-clamp-2">
                      {p.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
