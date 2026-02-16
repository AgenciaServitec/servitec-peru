"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContentWidth } from "@/components/ContentWidth";
import { ArrowLeft, CheckCircle2, ChevronRight, Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SERVICES_DATA } from "@/data-list/services";
import { SPECIALTIES_DATA } from "@/data-list/specialties";

interface Props {
  params: Promise<{ type: string }>;
}

export default function ServiceDetailPage({ params }: Props) {
  const { type } = React.use(params);
  const service = SERVICES_DATA.find((s) => s.slug === type);

  if (!service) notFound();

  // MEJORA DEFINITIVA: Cruzar servicios con SPECIALTIES_DATA
  const allSpecialties = React.useMemo(() => {
    // 1. Obtenemos los 'typeSpeciality' únicos presentes en tus servicios
    const uniqueTypes = Array.from(
      new Set(SERVICES_DATA.map((s) => s.typeSpeciality))
    );

    // 2. Mapeamos esos tipos a la información completa de SPECIALTIES_DATA
    return uniqueTypes.map((typeKey) => {
      const specialtyInfo = SPECIALTIES_DATA.find(
        (spec) => spec.type === typeKey
      );

      return {
        type: typeKey,
        // Si lo encuentra en la data usa el slug real, si no, usa el type como backup
        slug: specialtyInfo ? specialtyInfo.slug : typeKey,
        // Si lo encuentra usa el title oficial, si no, lo formatea
        title: specialtyInfo ? specialtyInfo.title : typeKey.replace(/-/g, " "),
      };
    });
  }, []);

  const similarServices = SERVICES_DATA.filter(
    (s) =>
      s.typeSpeciality === service.typeSpeciality && s.slug !== service.slug
  ).slice(0, 6);

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* HEADER CON EFECTO COMETA */}
      <section className="relative pt-32 pb-20 border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M -100 250 L 1100 250"
              stroke="rgba(234, 179, 8, 0.3)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0.1, pathOffset: -0.1, opacity: 0 }}
              animate={{ pathOffset: [0, 1.2], opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        <ContentWidth className="relative z-10">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-8 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Volver al Catálogo
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-semibold text-white tracking-tighter leading-[1.1]">
              {service.title}
              <span className="text-primary">.</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <p className="text-white/50 text-lg md:text-xl font-medium">
                {service.description}
              </p>
            </div>
          </div>
        </ContentWidth>
      </section>

      <ContentWidth className="py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* NAVEGACIÓN LATERAL */}
          <aside className="lg:col-span-3 order-2 lg:order-1 space-y-10">
            <div className="sticky top-32 space-y-10">
              <div>
                <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-5 opacity-40">
                  Especialidades
                </h4>
                <div className="flex flex-col gap-2">
                  {allSpecialties.map((spec) => (
                    <Link
                      key={spec.type}
                      href={`/especialidades/${spec.slug}`}
                      className="group flex items-center justify-between p-4 bg-zinc-900/20 border border-zinc-800/40 hover:border-primary/30 hover:bg-zinc-900/50 transition-all rounded-xl"
                    >
                      <span className="text-zinc-400 group-hover:text-white text-[12px] font-bold uppercase tracking-wide transition-colors">
                        {spec.title}
                      </span>
                      <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              {similarServices.length > 0 && (
                <div>
                  <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-5 opacity-40">
                    Servicios Similares
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {similarServices.map((sim) => (
                      <Link
                        key={sim.slug}
                        href={`/servicios/${sim.slug}`}
                        className="p-5 bg-[#0a0a0a] border border-zinc-800/60 hover:border-zinc-600 transition-all rounded-2xl group relative overflow-hidden"
                      >
                        <p className="text-white text-[13px] font-bold leading-snug mb-2 relative z-10">
                          {sim.title}
                        </p>
                        <span className="text-primary text-[10px] font-black uppercase tracking-widest relative z-10 flex items-center gap-1">
                          Ficha Técnica <ChevronRight className="h-3 w-3" />
                        </span>
                        <Cpu className="absolute -bottom-4 -right-4 h-16 w-16 text-white/[0.03] group-hover:text-primary/[0.05] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <main className="lg:col-span-9 order-1 lg:order-2 space-y-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Disponibilidad", val: "Inmediata / Express" },
                { label: "Garantía Real", val: "Certificada por escrito" },
                { label: "Repuestos", val: "OEM / Originales" },
                {
                  label: "Intervención",
                  val: "Nivel 3 (Componente)",
                  color: "text-primary",
                },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-2xl"
                >
                  <p className="text-[9px] uppercase text-zinc-500 font-black tracking-widest mb-2">
                    {spec.label}
                  </p>
                  <p
                    className={`font-bold text-[11px] md:text-xs uppercase ${spec.color || "text-zinc-200"}`}
                  >
                    {spec.val}
                  </p>
                </div>
              ))}
            </div>

            <div className="max-w-4xl space-y-20">
              <section>
                <h2 className="text-3xl font-semibold text-white tracking-tighter mb-8">
                  Análisis Técnico
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                  {service.longDescription}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-10">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary whitespace-nowrap">
                    Protocolo de Laboratorio_
                  </h3>
                  <div className="h-px w-full bg-zinc-800" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.includes.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-5 bg-zinc-900/20 border border-zinc-800/40 rounded-xl group hover:bg-zinc-900/40 transition-colors"
                    >
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-zinc-300 font-bold text-[12px] uppercase tracking-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Box de Ingeniería */}
              <div className="bg-[#0a0a0a] border border-zinc-800 p-10 rounded-3xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary fill-primary/20" />{" "}
                    Ingeniería Aplicada
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        t: "Limpieza Ultrasónica",
                        d: "Remoción de sulfatación profunda en placas base.",
                      },
                      {
                        t: "Seguridad ESD",
                        d: "Protección total contra descargas electroestáticas.",
                      },
                      {
                        t: "Micro-Soldadura",
                        d: "Intervención de componentes SMD bajo microscopio.",
                      },
                      {
                        t: "Pruebas de Estrés",
                        d: "Certificación de estabilidad post-reparación.",
                      },
                    ].map((item) => (
                      <div key={item.t} className="space-y-1">
                        <p className="text-white text-[12px] font-bold uppercase tracking-widest">
                          {item.t}
                        </p>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                          {item.d}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <Cpu className="absolute -bottom-10 -right-10 h-64 w-64 text-white/[0.02] group-hover:text-primary/[0.03] transition-colors pointer-events-none" />
              </div>
            </div>

            {/* CTA Final */}
            <div className="bg-primary p-1 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_-12px_rgba(234,179,8,0.3)]">
              <div className="bg-primary p-10 flex flex-col md:flex-row justify-between items-center gap-8 rounded-[2.3rem] border border-black/5">
                <div className="max-w-md text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-black uppercase leading-[0.85] text-black mb-4">
                    ¿Necesitas una <br /> Cotización real?
                  </h3>
                  <p className="font-bold text-[11px] text-black/70 uppercase tracking-widest">
                    Atención inmediata por ingenieros certificados.
                  </p>
                </div>
                <Button className="bg-black text-white hover:bg-zinc-900 px-12 h-16 font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-xl">
                  Cotizar por WhatsApp
                </Button>
              </div>
            </div>
          </main>
        </div>
      </ContentWidth>
    </div>
  );
}
