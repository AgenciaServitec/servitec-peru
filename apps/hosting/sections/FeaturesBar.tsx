"use client";

import { ContentWidth } from "@/components/ContentWidth";
import { motion } from "framer-motion";
import { Cpu, HardDrive, Monitor } from "lucide-react";

const features = [
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Laboratorio Técnico",
    description: "Reparación electrónica avanzada",
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: "Componentes de Fábrica",
    description: "Repuestos certificados y stock",
  },
  {
    icon: <HardDrive className="w-5 h-5" />,
    title: "Optimización de Sistemas",
    description: "Software, Firmware y Data",
  },
];

export function FeaturesBar() {
  return (
    <section className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <ContentWidth>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 px-4 text-center md:text-left relative"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center border border-white/10 bg-white/[0.03] shadow-inner">
                {feature.icon}
              </div>

              <div className="flex flex-col">
                <span className="text-white font-semibold text-base tracking-tight">
                  {feature.title}
                </span>
                <span className="text-white/40 text-[11px] md:text-xs uppercase tracking-wider font-medium">
                  {feature.description}
                </span>
              </div>

              {idx < features.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 h-10 w-px bg-white/5" />
              )}
            </motion.div>
          ))}
        </div>
      </ContentWidth>
    </section>
  );
}
