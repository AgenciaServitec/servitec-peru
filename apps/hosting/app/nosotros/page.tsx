"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Building, CheckCircle2 } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Ubicacion from "@/sections/Ubication";
import TaxData from "@/sections/TaxData";

export default function About() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  if (!isMounted) return <div className="bg-[#050505] min-h-screen" />;

  function handleMouseMove({
    clientX,
    clientY,
    currentTarget,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="bg-[#050505] text-white min-h-screen pt-20 font-sans relative overflow-hidden selection:bg-primary/30"
    >
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <ContentWidth>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 drop-shadow-2xl"
            >
              Nosotros
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white text-base md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-lg"
            >
              Soporte técnico especializado y soluciones digitales en Lima.
              Eficiencia y garantía desde 2018.
            </motion.p>
          </div>
        </ContentWidth>
      </section>

      <section className="py-20 relative z-10">
        <ContentWidth>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-sm border border-white/5 backdrop-blur-sm space-y-4">
              <h3 className="font-bold">¿Quiénes Somos?</h3>
              <p className="text-white text-lg">
                Un equipo técnico{" "}
                <span className="text-primary">especializado</span> comprometido
                con la continuidad operativa de tu tecnología.
              </p>
              <p className="text-white/40 text-sm">
                En Servitec Perú Group, combinamos experiencia técnica con una
                atención transparente y personalizada.
              </p>
            </div>

            <div className="p-8 rounded-sm border border-white/5 backdrop-blur-sm space-y-4">
              <h3 className="font-bold">¿Qué Hacemos?</h3>
              <p className="text-white text-lg">
                Soluciones integrales en{" "}
                <span className="text-primary">Hardware y Software</span> para
                equipos multimarca.
              </p>
              <p className="text-white/40 text-sm">
                Desde mantenimiento preventivo de proyectores hasta reparación
                electrónica avanzada de laptops y optimización de sistemas.
              </p>
            </div>

            <div className="p-8 rounded-sm border border-white/5 backdrop-blur-sm space-y-4">
              <h3 className="font-bold">¿Dónde Operamos?</h3>
              <p className="text-white text-lg">
                Sede central en <span className="text-primary">Chorrillos</span>{" "}
                con cobertura de servicio técnico en toda Lima.
              </p>
              <p className="text-white/40 text-sm">
                Contamos con laboratorio propio equipado para diagnósticos
                precisos y atención presencial garantizada.
              </p>
            </div>
          </div>
        </ContentWidth>
      </section>

      <section className="py-24 relative z-10 border-y border-white/5 backdrop-blur-sm">
        <ContentWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[450px] md:h-[550px] flex items-center justify-center">
              <div className="absolute left-0 top-0 w-[70%] h-[80%] rounded-sm overflow-hidden border border-white/10 shadow-2xl z-0">
                <img
                  src="/assets/images/about/ecran.jpeg"
                  alt="Laboratorio Servitec"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="absolute right-0 bottom-0 w-[65%] h-[75%] rounded-sm overflow-hidden border-[10px] bg-[#050505] border-[#050505] z-10 shadow-2xl">
                <img
                  src="/assets/images/about/preventive-maintenance-2.jpeg"
                  alt="Mantenimiento preventivo"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-bold text-white leading-[1.1]">
                  Nuestra Historia
                </h2>
                <div className="space-y-4">
                  <p className="text-white/60 text-base md:text-sm leading-relaxed">
                    Servitec Perú Group nació en 2018 en Chorrillos con el
                    objetivo de ofrecer un soporte técnico multimarca confiable
                    y transparente en Lima.
                  </p>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Lo que comenzó como un taller de reparación local ha crecido
                    gracias a la confianza de nuestros clientes, permitiéndonos
                    brindar soluciones de hardware a entidades como el Ejército
                    del Perú y diversas empresas que buscan diagnósticos
                    precisos y garantía real en cada trabajo.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 pt-4">
                {[
                  {
                    title: "Inicios en Chorrillos (2018)",
                    desc: "Taller técnico independiente enfocado en electrónica.",
                  },
                  {
                    title: "Soporte Institucional",
                    desc: "Aliados técnicos especializados para el Ejército del Perú.",
                  },
                  {
                    title: "Experiencia Comprobada",
                    desc: "Más de 5,000 reparaciones exitosas documentadas.",
                  },
                  {
                    title: "Evolución en Hardware",
                    desc: "Especialistas en la recuperación de equipos multimarca.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="text-white font-bold text-sm">
                        {item.title}
                      </h5>
                      <p className="text-white/30 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-2 pt-6">
                <Button size="lg" className="btn-primary" asChild>
                  <Link href="/especialidades">
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M14 15h-4v-2H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6h-8zm6-9h-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v4h20V8a2 2 0 0 0-2-2m-4 0H8V4h8z"
                        />
                      </svg>
                      Nuestras Especialidades
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="btn-ghost-dark"
                  asChild
                >
                  <Link href="/empresa">
                    <span className="flex items-center gap-2">
                      <Building />
                      Nuestra empresa
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ContentWidth>
      </section>

      <Ubicacion />

      <TaxData />
    </div>
  );
}
