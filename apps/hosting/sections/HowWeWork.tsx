"use client";

import { ContentWidth } from "@/components/ContentWidth";
import { BadgeCheck, ClipboardList, Timer, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Diagnóstico claro",
    desc: "Revisamos el equipo minuciosamente para detectar la falla real y ofrecerte las mejores opciones.",
    icon: ClipboardList,
  },
  {
    title: "Propuesta y tiempos",
    desc: "Te enviamos un presupuesto detallado con costos y tiempos de entrega antes de proceder.",
    icon: Timer,
  },
  {
    title: "Servicio técnico",
    desc: "Nuestros especialistas ejecutan la reparación siguiendo estándares de calidad y pruebas.",
    icon: Wrench,
  },
  {
    title: "Entrega con garantía",
    desc: "Recibes tu equipo operativo con un certificado de garantía real por el servicio realizado.",
    icon: BadgeCheck,
  },
];

export function HowWeWork() {
  return (
    <section id="proceso" className="py-24 bg-black border-t border-white/5">
      <ContentWidth>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
              Proceso
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-2">
              ¿Cómo trabajamos? {/* Título todo blanco: más elegante */}
            </h2>
          </div>
          <p className="text-white/40 max-w-xs text-sm md:text-right leading-relaxed font-normal">
            Metodología técnica diseñada para garantizar la integridad de tu
            infraestructura.
          </p>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-sm overflow-hidden">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group relative bg-black p-8 transition-colors duration-300 hover:bg-neutral-950"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center border border-white/10 rounded-sm text-white/40 transition-all duration-300 group-hover:border-primary group-hover:text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                    Paso 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight mb-3">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/40 font-normal">
                  {s.desc}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </ContentWidth>
    </section>
  );
}
