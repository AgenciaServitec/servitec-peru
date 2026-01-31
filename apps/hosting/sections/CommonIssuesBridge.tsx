"use client";

import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

const issues = [
  "No enciende",
  "Imagen borrosa / sin foco",
  "Se apaga / se sobrecalienta",
];

export function CommonIssuesBridge() {
  return (
    <section className="py-12 my-20">
      <ContentWidth>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left */}
          <div className="lg:col-span-5">
            <p className="text-sm text-white/60">Problemas comunes</p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              ¿Qué problema tiene tu equipo?
            </h2>

            <p className="mt-3 text-white/70 max-w-md">
              Elige un problema frecuente para ver el servicio recomendado. Si
              lo prefieres, envíanos una foto por WhatsApp y te orientamos.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                className="bg-primary text-black hover:bg-primary/90"
                asChild
              >
                <a href="#servicios">Ver servicios</a>
              </Button>

              <Button
                variant="secondary"
                className="border border-white/10 bg-white/5 text-white hover:bg-white/10"
                asChild
              >
                <a
                  href="https://wa.me/51941801827"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-3">
              {issues.map((issue) => (
                <a
                  key={issue}
                  href="#servicios"
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.05] transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {issue}
                      </p>
                      <p className="mt-1 text-xs text-white/55">
                        Ver servicio recomendado
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/25">
                      <Wrench className="h-4 w-4 text-primary/90" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
