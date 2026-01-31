"use client";

import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { BadgeCheck, ClipboardList, Timer, Wrench } from "lucide-react";

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

const stats = [
  { label: "Respuesta", value: "En el día" },
  { label: "Garantía", value: "Por servicio" },
  { label: "Atención", value: "Empresas, Instituciones Educativas y Hogares" },
];

export function HowWeWork() {
  return (
    <section className="py-14 my-20">
      <ContentWidth>
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm text-white/60">Confianza</p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Cómo trabajamos
            </h2>

            <p className="mt-3 text-white/70">
              Un proceso simple y transparente: primero diagnóstico, luego
              propuesta, y recién se ejecuta el servicio.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-xs text-white/55">{s.label}</p>
                <p className="mt-1 text-sm font-medium text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;

            return (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:bg-white/[0.055] hover:-translate-y-0.5"
              >
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-white/55">
                      Paso {idx + 1}{" "}
                      <span className="mx-2 text-white/25">•</span>
                      <span className="text-white/70">Proceso</span>
                    </p>

                    <h3 className="mt-1 text-base font-semibold text-white">
                      {s.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-px w-full bg-white/10" />
                <div className="mt-2 flex items-center justify-between text-xs text-white/55">
                  <span>Atención clara y rápida</span>
                  <span className="inline-flex items-center gap-2 text-white/70 opacity-0 transition group-hover:opacity-100">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    Verificado
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
              Hablar por WhatsApp
            </a>
          </Button>

          <Button
            variant="secondary"
            className="bg-white/10 text-white hover:bg-white/15 border border-white/10"
            asChild
            size="lg"
          >
            <a href="/contacto">Solicitar cotización</a>
          </Button>
        </div>
      </ContentWidth>
    </section>
  );
}
