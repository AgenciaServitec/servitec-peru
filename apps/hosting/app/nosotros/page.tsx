"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Award,
  Clock,
  MapPin,
  MessageSquare,
  MonitorCheck,
  PhoneCall,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";

export default function About() {
  const [activeSede, setActiveSede] = useState(0);

  const sedes = [
    {
      name: "Sede Chorrillos",
      address: "Néstor Bermúdez 113, Chorrillos, Lima, Perú",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.123456789!2d-77.021!3d-12.176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDEwJzMzLjYiUyA3N8KwMDEnMTUuNiJX!5e0!3m2!1ses-419!2spe!4v123456789",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Segunda Sede",
      address: "Dirección de la segunda sede aquí, Lima, Perú",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.0!2d-77.0!3d-12.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAwJzAwLjAiUyA3N8KwMDAnMDAuMCJX!5e0!3m2!1ses-419!2spe!4v987654321",
      image:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const currentSede = sedes[activeSede];
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentSede.address)}`;

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-20">
      <section className="relative py-20">
        <ContentWidth>
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-[12px] mb-4 block">
              Trayectoria y Confianza
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl max-w-5xl leading-[1.1]">
              Comprometidos con la <br />
              Excelencia Técnica
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg max-w-3xl mx-auto">
              Especialistas en soporte técnico avanzado y recuperación de
              sistemas. Soluciones de alta precisión en Lima con más de 10 años
              de experiencia comprobada.
            </p>
          </div>
        </ContentWidth>
      </section>

      <ContentWidth>
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
            <div className="relative md:col-span-2 md:row-span-2 bg-neutral-900/50 rounded-2xl overflow-hidden border border-white/10 group min-h-[300px]">
              <div className="absolute inset-0 bg-neutral-800" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-left">
                <p className="text-primary font-bold text-[11px] uppercase tracking-widest mb-2">
                  Sede Principal
                </p>
                <h3 className="text-xl font-semibold tracking-tight">
                  Laboratorio de Micro-electrónica
                </h3>
              </div>
            </div>
            <div className="md:col-span-2 md:row-span-1 bg-neutral-900/50 rounded-2xl border border-white/5" />
            <div className="md:col-span-1 md:row-span-1 bg-neutral-900/50 rounded-2xl border border-white/5" />
            <div className="md:col-span-1 md:row-span-1 bg-primary rounded-2xl p-8 flex flex-col justify-end text-left">
              <Award className="text-black w-10 h-10 mb-4" />
              <h3 className="text-black font-bold text-lg leading-tight tracking-tight">
                Técnicos Certificados
              </h3>
            </div>
          </div>
        </section>

        <section className="py-20 border-y border-white/5 my-12 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-left">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5 text-primary" />,
                title: "Garantía Escrita",
                desc: "Seguridad total en cada reparación efectuada.",
              },
              {
                icon: <Zap className="w-5 h-5 text-primary" />,
                title: "Atención Ágil",
                desc: "Tiempos de respuesta y entrega optimizados.",
              },
              {
                icon: <MonitorCheck className="w-5 h-5 text-primary" />,
                title: "Repuestos Originales",
                desc: "Solo componentes certificados y de grado A.",
              },
              {
                icon: <MessageSquare className="w-5 h-5 text-primary" />,
                title: "Asesoría Directa",
                desc: "Trato personalizado directamente con el técnico.",
              },
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-[#0A0A0A] rounded-xl border border-white/10 mb-6 group-hover:border-primary/50 transition-colors">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-[17px] mb-3 text-white">
                  {item.title}
                </h4>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[200px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight text-white">
                {" "}
                Nuestra Visión{" "}
              </h2>
              <p className="text-[13px] text-white/50 leading-relaxed">
                {" "}
                Ser el aliado de confianza para hogares y empresas en Lima.{" "}
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight text-primary">
                {" "}
                Misión Técnica{" "}
              </h2>
              <p className="text-[13px] text-white/50 leading-relaxed">
                {" "}
                Brindar soporte especializado de alta precisión.{" "}
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight text-white">
                {" "}
                Compromiso{" "}
              </h2>
              <p className="text-[13px] text-white/50 leading-relaxed">
                {" "}
                Cada intervención técnica cuenta con nuestro sello de
                garantía.{" "}
              </p>
            </div>
          </div>
        </section>
      </ContentWidth>

      <section className="pt-20">
        <ContentWidth>
          <div className="mb-8">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">
              {" "}
              Ubicación{" "}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              {" "}
              Encuentra tu centro de soporte{" "}
            </h2>

            <div className="flex gap-2 mt-6">
              {sedes.map((sede, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSede(index)}
                  className={`px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all rounded-md border ${
                    activeSede === index
                      ? "bg-primary text-black border-primary shadow-[0_0_20px_rgba(255,215,0,0.15)]"
                      : "bg-neutral-900 text-white/40 border-white/5 hover:border-white/20"
                  }`}
                >
                  {sede.name}
                </button>
              ))}
            </div>
          </div>
        </ContentWidth>

        <div className="w-full mt-10">
          <ContentWidth>
            <div className="flex flex-col md:flex-row items-stretch justify-between bg-[#0A0A0A] border border-white/10 rounded-t-2xl overflow-hidden">
              <div className="flex flex-1 flex-col md:flex-row items-center p-5 gap-6">
                <div className="h-20 w-32 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-neutral-800">
                  <img
                    src={currentSede.image}
                    alt="Fachada de la sede"
                    className="h-full w-full object-cover transition-opacity duration-500"
                  />
                </div>

                <div className="flex flex-col gap-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-white/90">
                      {" "}
                      {currentSede.address}{" "}
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2.5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-xs text-white/50 font-medium">
                      {" "}
                      Lun–Vie: 9:00 a.m. – 7:00 p.m.{" "}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-6 border-t md:border-t-0 md:border-l border-white/10 bg-white/[0.01]">
                <Button
                  variant="ghost"
                  className="rounded-md text-white hover:bg-white/5 border border-white/10 h-11 px-6 text-xs font-bold group"
                  asChild
                >
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cómo llegar{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  className="rounded-md bg-primary text-black hover:bg-primary/90 h-11 px-6 text-xs font-bold"
                  asChild
                >
                  <a
                    href="https://wa.me/51941801827"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PhoneCall className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </ContentWidth>

          <div className="relative h-[550px] w-full border-y border-white/10 bg-[#111]">
            <iframe
              key={activeSede}
              src={currentSede.mapEmbedUrl}
              className="h-full w-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
