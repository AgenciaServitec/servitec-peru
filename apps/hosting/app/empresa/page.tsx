"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";

export default function Company() {
  const [isMounted, setIsMounted] = useState(false);
  const razonSocial = "Servitec Perú Group E.I.R.L.";
  const ruc = "20604141240";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="bg-[#050505] min-h-screen" />;

  const steps = [
    {
      t: "Recepción técnica",
      d: "Registro formal del equipo en nuestro laboratorio con inventario detallado.",
    },
    {
      t: "Diagnóstico base",
      d: "Evaluación electrónica y mecánica por ingenieros especializados.",
    },
    {
      t: "Presupuesto formal",
      d: "Envío de cotización detallando repuestos y horas hombre de servicio.",
    },
    {
      t: "Ejecución técnica",
      d: "Intervención especializada bajo estándares de limpieza y precisión industrial.",
    },
    {
      t: "Control de calidad",
      d: "Pruebas de estrés y estabilidad antes de la liberación final del equipo.",
    },
    {
      t: "Entrega certificada",
      d: "Liquidación del servicio con garantía y reporte técnico.",
    },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-20 font-sans relative overflow-hidden">
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 60s linear infinite;
        }
        .animate-marquee-reverse {
          display: flex;
          width: max-content;
          animation: marquee-reverse 60s linear infinite;
        }
        .marquee-group:hover .animate-marquee,
        .marquee-group:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>

      <section className="relative h-[40vh] flex items-center justify-center border-b border-white/5">
        <ContentWidth>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
            >
              Nuestra Empresa
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-white text-base md:text-xl leading-relaxed max-w-2xl mx-auto opacity-80"
            >
              Infraestructura técnica y respaldo legal de {razonSocial}.
            </motion.p>
          </div>
        </ContentWidth>
      </section>

      <section className="py-20 border-b border-white/5">
        <ContentWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-10 border border-white/10 bg-white/[0.01] rounded-sm">
              <h3 className="flex items-center gap-3 text-white/40 font-bold mb-8">
                Información de registro
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                <div>
                  <p className="text-[10px] text-white/30 mb-1">Razón social</p>
                  <p className="text-lg font-bold text-white">{razonSocial}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 mb-1">RUC</p>
                  <p className="text-lg text-white">{ruc}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 mb-1">
                    Tipo de contribuyente
                  </p>
                  <p className="text-sm text-white/70">
                    Empresa Individual de Resp. Ltda.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 mb-1">Jurisdicción</p>
                  <p className="text-sm text-white/70">Lima, Perú</p>
                </div>
              </div>
            </div>

            <div className="p-10 border border-white/10 bg-white/[0.01] rounded-sm">
              <h3 className="flex items-center gap-3 text-white/40 font-bold mb-8">
                Marco operativo
              </h3>
              <p className="text-base text-white/70 leading-relaxed mb-6">
                Gestionamos operaciones como centro de soporte técnico
                multimarca con autonomía operativa. Nuestra estructura permite
                la importación y uso de componentes compatibles, asegurando
                estándares de calidad sin las restricciones de exclusividad de
                fabricantes.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] text-white/40 border border-white/10 px-3 py-1 rounded-sm">
                  Soporte técnico
                </span>
                <span className="text-[10px] text-white/40 border border-white/10 px-3 py-1 rounded-sm">
                  Importación directa
                </span>
              </div>
            </div>
          </div>
        </ContentWidth>
      </section>
      <section className="py-24">
        <ContentWidth>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center text-white">
              Flujo de trabajo
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
              <div className="space-y-20 relative">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row items-center justify-center relative group"
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors hidden md:block" />
                    <div
                      className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:pr-20 md:text-right" : "md:pl-20 md:text-left md:order-last"}`}
                    >
                      <h4 className="text-xl font-bold mb-2 text-white">
                        {step.t}
                      </h4>
                      <p className="text-white/40 leading-relaxed text-sm md:text-base max-w-md mx-auto md:mx-0">
                        {step.d}
                      </p>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContentWidth>
      </section>

      <section className="py-24 bg-white/[0.01] border-y border-white/5 overflow-hidden marquee-group">
        <ContentWidth>
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center text-white">
            Nuestras instalaciones
          </h2>
        </ContentWidth>
        <div className="space-y-4">
          <div className="animate-marquee">
            {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((img, i) => (
              <div key={i} className="px-2">
                <div className="relative w-[300px] md:w-[480px] aspect-video rounded-sm overflow-hidden border border-white/10 group">
                  <Image
                    src={`/galeria/empresa-${img}.jpg`}
                    alt="Instalaciones"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="animate-marquee-reverse">
            {[6, 5, 4, 3, 2, 1, 6, 5, 4, 3, 2, 1].map((img, i) => (
              <div key={i} className="px-2">
                <div className="relative w-[300px] md:w-[480px] aspect-video rounded-sm overflow-hidden border border-white/10 group">
                  <Image
                    src={`/galeria/empresa-${img}.jpg`}
                    alt="Laboratorio"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <ContentWidth>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
            Cumplimiento y normativa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "Libro de reclamaciones", h: "/reclamaciones" },
              { n: "Políticas de servicio", h: "/politica-servicio" },
              { n: "Términos y condiciones", h: "/terminos-condiciones" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.h}
                className="group p-10 border border-white/10 bg-white/[0.01] rounded-sm hover:border-white/20 hover:bg-white/[0.03] transition-all flex flex-col items-center gap-6 text-center"
              >
                <FileText
                  className="text-white/20 group-hover:text-white transition-colors"
                  size={32}
                />
                <span className="text-[11px] font-bold text-white/40 group-hover:text-white transition-colors">
                  {item.n}
                </span>
              </Link>
            ))}
          </div>
        </ContentWidth>
      </section>
    </div>
  );
}
