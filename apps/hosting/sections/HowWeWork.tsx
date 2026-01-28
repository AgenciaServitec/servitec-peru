"use client";

import { ContentWidth } from "@/components/ContentWidth";
import { Card, CardContent } from "@/components/ui/card";
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
    <section className="py-14">
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

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <Card
                key={s.title}
                className="border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-primary/15 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-base font-medium text-white">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/70">{s.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button className="bg-primary text-black hover:bg-primary/90" asChild>
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
