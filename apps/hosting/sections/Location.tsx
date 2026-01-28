"use client";

import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MapPin,
  PhoneCall,
} from "lucide-react";

export function Location() {
  const address = "Néstor Bermúdez 113, Chorrillos, Lima, Perú";

  // Tu link (sirve para abrir en Maps)
  const openMapUrl = "https://maps.app.goo.gl/5C5kWSvjttEVV6EG9";

  const gmapsQuery = encodeURIComponent(address);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${gmapsQuery}`;

  // ✅ embed real (src del iframe que pasaste)
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.0337289762615!2d-77.01948293044596!3d-12.171208899254715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b783a900bdaf%3A0x607fff39cb74344a!2sCa.%20Coronel%20Bermudez%20113%2C%20Lima%2015064!5e0!3m2!1ses-419!2spe!4v1769639574948!5m2!1ses-419!2spe";

  return (
    <section className="py-14">
      <ContentWidth>
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground">Ubicación</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Visítanos o escríbenos
          </h2>
          <p className="mt-3 text-muted-foreground">
            Estamos en Chorrillos y atendemos por coordinación a empresas en
            Lima Metropolitana.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* INFO (izquierda) */}
          <div className="order-2 lg:order-1">
            <Card className="h-full border-white/10 bg-white/[0.04]">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  {/* Dirección */}
                  <div className="flex gap-3">
                    <div className="mt-0.5 rounded-xl bg-primary/15 p-2 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Dirección
                      </p>
                      <p className="mt-1 text-sm text-white/70">{address}</p>
                    </div>
                  </div>

                  {/* Horario */}
                  <div className="mt-5 flex gap-3">
                    <div className="mt-0.5 rounded-xl bg-primary/15 p-2 text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Horario de atención
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        Lun–Vie: 9:00 a.m. – 7:00 p.m.
                      </p>
                    </div>
                  </div>

                  {/* Cobertura (compacta, sin repetir badges) */}
                  <div className="mt-6">
                    <p className="text-sm font-medium text-white mb-3">
                      Cobertura de atención
                    </p>

                    <ul className="grid grid-cols-2 gap-3 text-sm text-white/70">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Lima Metropolitana
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Atención a empresas
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Hogares y negocios
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Atención por coordinación
                      </li>
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <Button
                    className="bg-primary text-black hover:bg-primary/90"
                    size="lg"
                    asChild
                  >
                    <a href={directionsUrl} target="_blank" rel="noreferrer">
                      Cómo llegar <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <Button
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/15"
                    size="lg"
                    asChild
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

                <p className="mt-4 text-xs text-white/60">
                  Tip: envíanos una foto del equipo y el modelo antes de venir
                  para una atención más rápida.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* MAP (derecha) */}
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              {/* mini header del mapa */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="truncate">{address}</span>
                </div>

                {/* ✅ Solo Abrir (sin repetir Cómo llegar) */}
                <Button
                  variant="secondary"
                  className="bg-white/10 text-white hover:bg-white/15"
                  asChild
                  size="sm"
                >
                  <a href={openMapUrl} target="_blank" rel="noreferrer">
                    Abrir <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* iframe */}
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
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
