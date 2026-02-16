"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react";
import { SERVICES_DATA } from "@/data-list/services";

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
    <div className="bg-black">
      {/* SECCIÓN 01: FORMULARIO DE COTIZACIÓN */}
      <section className="pt-32 pb-20">
        <ContentWidth>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-3">
                Asistencia Técnica
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Cotiza tu reparación de{" "}
                <span className="text-white/60">{specialtyName}</span>
              </h2>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-md overflow-hidden shadow-2xl">
              <div className="grid grid-cols-3 border-b border-white/5 bg-white/[0.01]">
                {[
                  { id: 1, label: "Equipo", icon: Cpu },
                  { id: 2, label: "Ubicación", icon: MapPin },
                  { id: 3, label: "Finalizar", icon: Send },
                ].map((s) => (
                  <div
                    key={s.id}
                    className={`py-4 flex items-center justify-center gap-2 border-r border-white/5 last:border-r-0 transition-colors ${
                      step >= s.id ? "text-primary" : "text-white/10"
                    }`}
                  >
                    <s.icon className="h-3.5 w-3.5" strokeWidth={2} />
                    <span className="text-[9px] uppercase tracking-widest font-black hidden md:block">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-6 md:p-10">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-white/30 uppercase tracking-tighter ml-1">
                            Modelo del equipo
                          </label>
                          <Input
                            placeholder="Ej: MacBook Pro M2..."
                            className="bg-white/[0.02] border-white/10 h-11 text-sm focus-visible:ring-primary rounded-md"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-white/30 uppercase tracking-tighter ml-1">
                            Servicio requerido
                          </label>
                          <Select>
                            <SelectTrigger className="bg-white/[0.02] border-white/10 h-11 text-sm rounded-md text-white/50">
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-white/10 text-white">
                              <SelectItem value="rep">
                                Reparación Técnica
                              </SelectItem>
                              <SelectItem value="man">Mantenimiento</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-tighter ml-1">
                          Describe el problema
                        </label>
                        <Textarea
                          placeholder="Cuéntanos qué síntomas presenta..."
                          className="bg-white/[0.02] border-white/10 min-h-[100px] text-sm rounded-md resize-none"
                        />
                      </div>
                      <div className="flex justify-end border-t border-white/5 pt-6">
                        <Button
                          onClick={nextStep}
                          className="bg-primary text-black font-black rounded-md px-8 h-12 uppercase text-[10px] tracking-widest hover:bg-primary/80"
                        >
                          Siguiente
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input
                          placeholder="Nombre completo"
                          className="bg-white/[0.02] border-white/10 h-11 text-sm rounded-md"
                        />
                        <Input
                          placeholder="WhatsApp"
                          className="bg-white/[0.02] border-white/10 h-11 text-sm rounded-md"
                        />
                        <Input
                          placeholder="Distrito"
                          className="bg-white/[0.02] border-white/10 h-11 text-sm rounded-md"
                        />
                        <Input
                          placeholder="Dirección"
                          className="bg-white/[0.02] border-white/10 h-11 text-sm rounded-md"
                        />
                      </div>
                      <div className="flex justify-between border-t border-white/5 pt-6">
                        <Button
                          variant="ghost"
                          onClick={prevStep}
                          className="text-white/40 hover:text-white uppercase text-[10px] tracking-widest rounded-md"
                        >
                          Volver
                        </Button>
                        <Button
                          onClick={nextStep}
                          className="bg-primary text-black font-black rounded-md px-8 h-12 uppercase text-[10px] tracking-widest"
                        >
                          Continuar
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="s3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-6"
                    >
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                        <CheckCircle2
                          className="h-8 w-8 text-primary"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Datos verificados
                      </h3>
                      <p className="text-xs text-white/40 mb-8">
                        Click en el botón para contactar a un técnico en vivo.
                      </p>
                      <Button className="bg-primary text-black font-black rounded-md w-full max-w-xs h-14 uppercase text-[11px] tracking-widest shadow-xl shadow-primary/10 transition-transform active:scale-95">
                        <MessageSquare className="mr-2 h-4 w-4 fill-current" />{" "}
                        Iniciar Chat WhatsApp
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ContentWidth>
      </section>

      {/* SECCIÓN 02: GRILLA TÉCNICA APEGADA (Estilo Especialidades) */}
      <section className="pb-32 border-t border-white/5 pt-20">
        <ContentWidth>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-3">
                Módulos de Servicio
              </span>
              <h2 className="text-3xl font-bold text-white leading-tight">
                Fallas frecuentes en <br />{" "}
                <span className="text-white/40">{specialtyName}</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 border border-white/10 rounded-sm overflow-hidden">
            {associatedServices.map((item) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group relative bg-black overflow-hidden flex flex-col min-h-[340px]"
              >
                {/* Imagen de fondo con Zoom */}
                <div className="absolute inset-0 z-0 transition-all duration-700">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                {/* Contenido */}
                <div className="relative z-10 p-8 flex flex-col h-full">
                  <div className="flex justify-end items-start mb-8">
                    <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/40 font-normal line-clamp-2 mb-8">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-6">
                      <Button
                        asChild
                        className="h-10 px-6 bg-primary text-black font-bold text-xs hover:bg-white transition-colors rounded-md"
                      >
                        <Link href={`/servicios/${item.slug}`}>Detalles</Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </ContentWidth>
      </section>
    </div>
  );
}
