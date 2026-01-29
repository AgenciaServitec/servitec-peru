"use client";

import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Timer,
  Wrench,
} from "lucide-react";

const steps = [
  {
    title: "Diagnóstico claro",
    desc: "Revisamos el equipo y te indicamos la falla y las opciones.",
    icon: ClipboardList,
  },
  {
    title: "Propuesta y tiempos",
    desc: "Te confirmamos el costo estimado y el tiempo de entrega antes de iniciar.",
    icon: Timer,
  },
  {
    title: "Servicio técnico",
    desc: "Ejecutamos la reparación o mantenimiento con pruebas de funcionamiento.",
    icon: Wrench,
  },
  {
    title: "Entrega con garantía",
    desc: "Te entregamos el equipo operativo y con garantía por el servicio realizado.",
    icon: BadgeCheck,
  },
];

export function HowWeWork() {
  return (
    <section className="py-10">
      <ContentWidth>
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground">Confianza</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Cómo trabajamos
          </h2>
          <p className="mt-3 text-muted-foreground">
            Un proceso simple y transparente: primero diagnóstico, luego
            propuesta, y recién se ejecuta el servicio.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition"
              >
                {/* left line */}
                <div className="absolute left-6 top-0 h-full w-px bg-white/10" />

                {/* step dot */}
                <div className="relative flex gap-4">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs text-white/50">Paso {idx + 1}</p>
                    <h3 className="mt-1 text-base font-medium text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            className="bg-primary text-black hover:bg-primary/90"
            asChild
            size="lg"
          >
            <a
              href="https://wa.me/51941801827"
              target="_blank"
              rel="noreferrer"
            >
              Hablar por WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>

          <Button
            variant="secondary"
            className="bg-white/10 text-white hover:bg-white/15"
            asChild
            size="lg"
          >
            <a href="/contacto">
              Solicitar cotización <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </ContentWidth>
    </section>
  );
}
