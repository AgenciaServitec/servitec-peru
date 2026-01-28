"use client";

import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  FileText,
  MapPin,
  PhoneCall,
} from "lucide-react";

export function CTA() {
  return (
    <section className="py-14">
      <ContentWidth>
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-[#F5C400] to-[#E6B800]">
          <div className="relative p-8 sm:p-10 md:p-12">
            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              {/* Left */}
              <div className="md:col-span-7">
                <p className="text-sm text-black/70">Atención rápida</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                  ¿Necesitas ayuda con tu equipo?
                </h2>
                <p className="mt-3 max-w-xl text-black/80">
                  Escríbenos por WhatsApp con el modelo y una foto del problema.
                  Te orientamos y, si deseas, te enviamos una cotización.
                </p>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-black/70">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4" />
                    <strong>Chorrillos - Lima</strong>
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4" />
                    <strong>Lun–Vie 9:00 a.m. – 7:00 p.m.</strong>
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="w-4" />
                    <strong>Empresas y hogares</strong>
                  </span>
                </div>
              </div>

              {/* Right (anchored panel) */}
              <div className="md:col-span-5">
                <div className="rounded-2xl border border-black/10 bg-black/10 p-4 sm:p-5">
                  <p className="text-sm font-medium text-black">
                    Contáctanos ahora
                  </p>
                  <p className="mt-1 text-sm text-black/70">
                    Respuesta rápida por WhatsApp o solicita una cotización.
                  </p>

                  <div className="mt-4 grid gap-3">
                    <Button
                      size="lg"
                      className="w-full bg-black text-white hover:bg-black/90"
                      asChild
                    >
                      <a
                        href="https://wa.me/51941801827"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <PhoneCall className="mr-2 h-4 w-4" />
                        WhatsApp
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>

                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full bg-white/70 text-black hover:bg-white"
                      asChild
                    >
                      <a href="/contacto">
                        <FileText className="mr-2 h-4 w-4" />
                        Solicitar cotización
                      </a>
                    </Button>
                  </div>

                  <p className="mt-3 text-xs text-black/60">
                    Tip: si adjuntas una foto del equipo, avanzamos más rápido.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* subtle texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.28) 0, transparent 55%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.18) 0, transparent 55%)",
            }}
          />
        </div>
      </ContentWidth>
    </section>
  );
}
