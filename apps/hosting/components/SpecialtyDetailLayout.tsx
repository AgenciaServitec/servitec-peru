"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Info, Plus, ShieldCheck } from "lucide-react";
import { SERVICES_DATA } from "@/data-list/services";
import TaxData from "@/sections/TaxData";
import Ubicacion from "@/sections/Ubication";

export default function SpecialtyDetailLayout({
  specialtyName,
  specialtyType,
}: {
  specialtyName: string;
  specialtyType: string;
}) {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const associatedServices = SERVICES_DATA.filter(
    (service) => service.typeSpeciality === specialtyType
  );

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-primary/30">
      <section className="relative pt-32 pb-16 border-b border-white/5">
        <ContentWidth>
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
            >
              {specialtyName}
            </motion.h1>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
              Servicio técnico multimarca en lima por servitec perú group.
              atención presencial en laboratorio especializado para diagnósticos
              electrónicos.
            </p>
          </div>
        </ContentWidth>
      </section>

      {/* 2. FORMULARIO DE SOLICITUD DE SERVICIO */}
      {/*<section className="py-20 relative z-10">*/}
      {/*  <ContentWidth>*/}
      {/*    <div className="max-w-3xl mx-auto">*/}
      {/*      /!* Indicador de Pasos Separado (Estilo Superior) *!/*/}
      {/*      <div className="mb-12 pt-4 px-4">*/}
      {/*        <div className="relative flex justify-between max-w-md mx-auto">*/}
      {/*          /!* Línea de fondo *!/*/}
      {/*          <div className="absolute top-5 left-0 w-full h-[2px] bg-white/5 z-0 rounded-full" />*/}

      {/*          /!* Línea de progreso (verde esmeralda) *!/*/}
      {/*          <div*/}
      {/*            className="absolute top-5 left-0 h-[2px] bg-[#22C55E] transition-all duration-700 ease-in-out z-0 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)]"*/}
      {/*            style={{ width: `${(step - 1) * 50}%` }}*/}
      {/*          />*/}

      {/*          {[*/}
      {/*            { id: 1, label: "Equipo", icon: Cpu },*/}
      {/*            { id: 2, label: "Contacto", icon: MapPin },*/}
      {/*            { id: 3, label: "Finalizar", icon: CheckCircle2 },*/}
      {/*          ].map((s) => {*/}
      {/*            const Icon = s.icon;*/}
      {/*            const isActive = step >= s.id;*/}
      {/*            const isCompleted = step > s.id;*/}

      {/*            return (*/}
      {/*              <div*/}
      {/*                key={s.id}*/}
      {/*                className="relative z-10 flex flex-col items-center gap-4"*/}
      {/*              >*/}
      {/*                <div*/}
      {/*                  className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-500 ${*/}
      {/*                    isActive*/}
      {/*                      ? "bg-[#0A0A0A] border-[#22C55E] text-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.15)]"*/}
      {/*                      : "bg-[#0A0A0A] border-white/10 text-white/10"*/}
      {/*                  }`}*/}
      {/*                >*/}
      {/*                  {isCompleted ? (*/}
      {/*                    <CheckCircle2 className="h-5 w-5 animate-in zoom-in duration-300 text-[#22C55E]" />*/}
      {/*                  ) : (*/}
      {/*                    <Icon className="h-4 w-4" />*/}
      {/*                  )}*/}
      {/*                </div>*/}
      {/*                <span*/}
      {/*                  className={`text-[10px] lowercase font-medium transition-colors duration-300 ${*/}
      {/*                    isActive ? "text-white" : "text-white/20"*/}
      {/*                  }`}*/}
      {/*                >*/}
      {/*                  {s.label}*/}
      {/*                </span>*/}
      {/*              </div>*/}
      {/*            );*/}
      {/*          })}*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      /!* Contenedor del Formulario *!/*/}
      {/*      <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden shadow-2xl">*/}
      {/*        <div className="p-8 md:p-14">*/}
      {/*          <AnimatePresence mode="wait">*/}
      {/*            {step === 1 && (*/}
      {/*              <motion.div*/}
      {/*                key="s1"*/}
      {/*                initial={{ opacity: 0, y: 10 }}*/}
      {/*                animate={{ opacity: 1, y: 0 }}*/}
      {/*                exit={{ opacity: 0, y: -10 }}*/}
      {/*                className="space-y-8"*/}
      {/*              >*/}
      {/*                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">*/}
      {/*                  <div className="space-y-3">*/}
      {/*                    <label className="text-[12px] font-medium text-white/30 ml-1 lowercase">*/}
      {/*                      Modelo del equipo*/}
      {/*                    </label>*/}
      {/*                    <Input*/}
      {/*                      placeholder="ej: macbook pro m2, proyector epson..."*/}
      {/*                      className="bg-white/[0.02] border-white/10 h-13 text-sm rounded-sm focus:border-[#22C55E]/40 transition-all placeholder:text-white/10"*/}
      {/*                    />*/}
      {/*                  </div>*/}
      {/*                  <div className="space-y-3">*/}
      {/*                    <label className="text-[12px] font-medium text-white/30 ml-1 lowercase">*/}
      {/*                      Tipo de servicio*/}
      {/*                    </label>*/}
      {/*                    <Select>*/}
      {/*                      <SelectTrigger className="bg-white/[0.02] border-white/10 h-13 text-sm rounded-sm text-white/50">*/}
      {/*                        <SelectValue placeholder="seleccionar servicio" />*/}
      {/*                      </SelectTrigger>*/}
      {/*                      <SelectContent className="bg-neutral-900 border-white/10 text-white">*/}
      {/*                        <SelectItem value="rep" className="lowercase">*/}
      {/*                          Reparación técnica*/}
      {/*                        </SelectItem>*/}
      {/*                        <SelectItem value="man" className="lowercase">*/}
      {/*                          Mantenimiento preventivo*/}
      {/*                        </SelectItem>*/}
      {/*                      </SelectContent>*/}
      {/*                    </Select>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*                <div className="space-y-3">*/}
      {/*                  <label className="text-[12px] font-medium text-white/30 ml-1 lowercase">*/}
      {/*                    Descripción del problema*/}
      {/*                  </label>*/}
      {/*                  <Textarea*/}
      {/*                    placeholder="cuéntanos qué síntomas presenta el equipo..."*/}
      {/*                    className="bg-white/[0.02] border-white/10 min-h-[140px] text-sm rounded-sm resize-none focus:border-[#22C55E]/40 transition-all placeholder:text-white/10"*/}
      {/*                  />*/}
      {/*                </div>*/}
      {/*                <div className="flex justify-end pt-4">*/}
      {/*                  <Button onClick={nextStep} className="btn-primary">*/}
      {/*                    <ArrowUpRight className="h-4 w-4" /> Siguiente*/}
      {/*                  </Button>*/}
      {/*                </div>*/}
      {/*              </motion.div>*/}
      {/*            )}*/}

      {/*            {step === 2 && (*/}
      {/*              <motion.div*/}
      {/*                key="s2"*/}
      {/*                initial={{ opacity: 0, y: 10 }}*/}
      {/*                animate={{ opacity: 1, y: 0 }}*/}
      {/*                exit={{ opacity: 0, y: -10 }}*/}
      {/*                className="space-y-8"*/}
      {/*              >*/}
      {/*                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">*/}
      {/*                  <div className="space-y-3">*/}
      {/*                    <label className="text-[12px] font-medium text-white/30 ml-1 lowercase">*/}
      {/*                      Nombre completo*/}
      {/*                    </label>*/}
      {/*                    <Input*/}
      {/*                      placeholder="ej: juan pérez"*/}
      {/*                      className="bg-white/[0.02] border-white/10 h-13 text-sm rounded-sm"*/}
      {/*                    />*/}
      {/*                  </div>*/}
      {/*                  <div className="space-y-3">*/}
      {/*                    <label className="text-[12px] font-medium text-white/30 ml-1 lowercase">*/}
      {/*                      Whatsapp de contacto*/}
      {/*                    </label>*/}
      {/*                    <Input*/}
      {/*                      placeholder="ej: 941 801 827"*/}
      {/*                      className="bg-white/[0.02] border-white/10 h-13 text-sm rounded-sm"*/}
      {/*                    />*/}
      {/*                  </div>*/}
      {/*                  <div className="space-y-3">*/}
      {/*                    <label className="text-[12px] font-medium text-white/30 ml-1 lowercase">*/}
      {/*                      Distrito*/}
      {/*                    </label>*/}
      {/*                    <Input*/}
      {/*                      placeholder="ej: santiago de surco..."*/}
      {/*                      className="bg-white/[0.02] border-white/10 h-13 text-sm rounded-sm"*/}
      {/*                    />*/}
      {/*                  </div>*/}
      {/*                  <div className="space-y-3">*/}
      {/*                    <label className="text-[12px] font-medium text-white/30 ml-1 lowercase">*/}
      {/*                      Dirección (opcional)*/}
      {/*                    </label>*/}
      {/*                    <Input*/}
      {/*                      placeholder="av. ejemplo 123"*/}
      {/*                      className="bg-white/[0.02] border-white/10 h-13 text-sm rounded-sm"*/}
      {/*                    />*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*                <div className="flex justify-between items-center pt-6">*/}
      {/*                  <Button*/}
      {/*                    variant="outline"*/}
      {/*                    onClick={prevStep}*/}
      {/*                    className="btn-ghost-dark"*/}
      {/*                  >*/}
      {/*                    Volver*/}
      {/*                  </Button>*/}
      {/*                  <Button onClick={nextStep} className="btn-primary">*/}
      {/*                    Continuar <ArrowUpRight className="ml-2 h-4 w-4" />*/}
      {/*                  </Button>*/}
      {/*                </div>*/}
      {/*              </motion.div>*/}
      {/*            )}*/}

      {/*            {step === 3 && (*/}
      {/*              <motion.div*/}
      {/*                key="s3"*/}
      {/*                initial={{ opacity: 0, scale: 0.98 }}*/}
      {/*                animate={{ opacity: 1, scale: 1 }}*/}
      {/*                className="text-center py-10"*/}
      {/*              >*/}
      {/*                <div className="h-24 w-24 bg-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#22C55E]/20">*/}
      {/*                  <CheckCircle2*/}
      {/*                    className="h-12 w-12 text-[#22C55E]"*/}
      {/*                    strokeWidth={1}*/}
      {/*                  />*/}
      {/*                </div>*/}
      {/*                <h3 className="text-2xl font-bold text-white mb-3 lowercase tracking-tight">*/}
      {/*                  ¡Todo listo!*/}
      {/*                </h3>*/}
      {/*                <p className="text-sm text-white/40 mb-10 max-w-xs mx-auto leading-relaxed lowercase">*/}
      {/*                  Tu solicitud ha sido generada. inicia el chat para*/}
      {/*                  recibir atención inmediata de un especialista.*/}
      {/*                </p>*/}
      {/*                <Button className="btn-primary">*/}
      {/*                  <MessageSquare className="h-5 w-5 fill-current" />{" "}*/}
      {/*                  Iniciar chat whatsapp*/}
      {/*                </Button>*/}
      {/*              </motion.div>*/}
      {/*            )}*/}
      {/*          </AnimatePresence>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </ContentWidth>*/}
      {/*</section>*/}

      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <ContentWidth>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5" />
                <h4 className="font-bold text-sm">Qué incluye</h4>
              </div>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  • diagnóstico electrónico base
                </li>
                <li className="flex items-start gap-2">
                  • informe técnico detallado
                </li>
                <li className="flex items-start gap-2">
                  • garantía real por el trabajo
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5" />
                <h4 className="font-bold text-sm">Tiempos estimados</h4>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                El diagnóstico inicial se realiza en un periodo de 24 a 48
                horas. reparaciones menores pueden concluirse el mismo día según
                disponibilidad de componentes.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5" />
                <h4 className="font-bold text-sm">Aviso importante</h4>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                Servitec perú group es un centro de soporte independiente. no
                somos servicio oficial de fabricantes. el servicio no incluye
                repuestos no detallados en el presupuesto.
              </p>
            </div>
          </div>
        </ContentWidth>
      </section>

      <section className="py-24">
        <ContentWidth>
          <div className="space-y-4 mb-10">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
              Módulos de servicio
            </h2>
            <p className="text-white/40 max-w-xl text-sm leading-relaxed">
              Fallas frecuentes en {specialtyName}
            </p>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 border border-white/10 rounded-sm overflow-hidden">
            {associatedServices.map((item) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group relative bg-black min-h-[340px] flex flex-col overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 z-0 transition-all duration-700">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                <div className="relative z-10 p-8 flex flex-col h-full flex-grow">
                  <div className="flex justify-end items-start mb-8">
                    <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={`/servicios/${item.slug}`}
                      className="inline-block"
                    >
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center">
                      <Button
                        size="lg"
                        variant="outline"
                        className="btn-ghost-dark text-[10px] h-10 px-6"
                        asChild
                      >
                        <Link href={`/servicios/${item.slug}`}>
                          <Plus className="h-3 w-3" />
                          <span>ver detalles</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </ContentWidth>
      </section>

      <Ubicacion />
      <TaxData />
    </div>
  );
}
