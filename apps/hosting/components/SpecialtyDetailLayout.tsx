"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Plus } from "lucide-react";
import { SERVICES_DATA } from "@/data-list/services";
import TaxData from "@/sections/TaxData";
import { ButtonLink } from "@/components/ui/button-link";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export default function SpecialtyDetailLayout({
  specialtyName,
  specialtyImage,
  specialtyType,
}: {
  specialtyName: string;
  specialtyImage: string;
  specialtyType: string;
}) {
  const associatedServices = SERVICES_DATA.filter(
    (service) => service.typeSpeciality === specialtyType
  );

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-primary/30">
      <section className="relative pt-32 pb-16 border-b border-white/5 overflow-hidden">
        <img
          src={specialtyImage || ""}
          className="w-full h-full object-cover opacity-70 absolute left-0 top-0"
          alt="Fondo de servicio técnico"
        />

        <ContentWidth className="relative z-10 space-y-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-7xl xl:text-8xl font-bold mb-6 text-shadow-[4px_4px_4px_rgba(0,0,0,0.5)] uppercase italic"
            >
              {specialtyName}
            </motion.h1>
            <p className="text-white text-shadow-[4px_4px_4px_rgba(0,0,0,0.5)] text-base md:text-lg max-w-2xl mx-auto">
              Servicio técnico multimarca en lima por servitec perú group.
              atención presencial en laboratorio especializado para diagnósticos
              electrónicos.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <ButtonLink
              className="w-full md:w-auto"
              href="https://api.whatsapp.com/send/?phone=51941801827&text=Hola+Servitec%2C+deseo+un+diagnostico+para+mi+proyector&type=phone_number&app_absent=0"
              icon={IconBrandWhatsapp}
            >
              WhatsApp
            </ButtonLink>
            <ButtonLink
              className="w-full md:w-auto"
              href="tel:941801827"
              icon={Phone}
              variant="secondary"
            >
              Hablemos
            </ButtonLink>
          </div>
        </ContentWidth>
      </section>

      <ServiceRequestForm specialtyName={specialtyName} />

      <section className="py-24">
        <ContentWidth>
          <div className="space-y-4 mb-10">
            <h2 className="text-5xl md:text-6xl font-bold text-white">
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
                className="group relative bg-black min-h-85 flex flex-col overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 z-0 transition-all duration-700">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 p-8 flex flex-col h-full grow">
                  <div className="flex justify-end items-start mb-8">
                    <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={`/servicios/${item.slug}`}
                      className="inline-block"
                    >
                      <h3 className="text-xl font-bold mb-3 text-white hover:underline text-shadow-[4px_4px_4px_rgba(0,0,0,0.5)]">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-white text-shadow-[4px_4px_4px_rgba(0,0,0,0.5)] text-sm leading-relaxed mb-8 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center">
                      <ButtonLink
                        href={`/servicios/${item.slug}`}
                        icon={Plus}
                        variant="outline"
                      >
                        Ver Detalles
                      </ButtonLink>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </ContentWidth>
      </section>

      <TaxData />
    </div>
  );
}
