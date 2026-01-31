"use client";

import { Button } from "@/components/ui/button";
import { ContentWidth } from "@/components/ContentWidth";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MapPin,
  PhoneCall,
} from "lucide-react";

export function Location() {
  const address = "Néstor Bermúdez 113, Chorrillos, Lima, Perú";
  const openMapUrl = "https://maps.app.goo.gl/5C5kWSvjttEVV6EG9";

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    address
  )}&travelmode=driving`;

  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.0337289762615!2d-77.01948293044596!3d-12.171208899254715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b783a900bdaf%3A0x607fff39cb74344a!2sCa.%20Coronel%20Bermudez%20113%2C%20Lima%2015064!5e0!3m2!1ses-419!2spe!4v1769639574948!5m2!1ses-419!2spe";

  return (
    <section className="py-14 my-20">
      <ContentWidth>
        <div className="max-w-2xl">
          <p className="text-sm text-white/60">Ubicación</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Visítanos o escríbenos
          </h2>
          <p className="mt-3 text-white/70">
            Estamos en Chorrillos y atendemos por coordinación a empresas en
            Lima Metropolitana.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="truncate">{address}</span>
            </span>

            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Lun–Vie: 9:00 a.m. – 7:00 p.m.
            </span>

            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Atención por coordinación
            </span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              className="bg-primary text-black hover:bg-primary/90"
              asChild
              size="lg"
            >
              <a href={directionsUrl} target="_blank" rel="noreferrer">
                Cómo llegar <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="secondary"
              className="border border-white/10 bg-white/10 text-white hover:bg-white/15"
              asChild
              size="lg"
            >
              <a href={openMapUrl} target="_blank" rel="noreferrer">
                Abrir mapa <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="secondary"
              className="border border-white/10 bg-white/10 text-white hover:bg-white/15"
              asChild
              size="lg"
            >
              <a
                href="https://wa.me/51941801827"
                target="_blank"
                rel="noreferrer"
              >
                <PhoneCall className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </ContentWidth>

      <div className="mt-6 overflow-hidden border-y border-white/10 bg-black/40">
        <div className="relative h-[360px] sm:h-[420px] lg:h-[520px]">
          <iframe
            src={embedUrl}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5" />
        </div>
      </div>
    </section>
  );
}
