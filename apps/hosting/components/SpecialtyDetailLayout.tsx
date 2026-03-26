"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { SERVICES_DATA } from "@/data-list/services";
import TaxData from "@/sections/TaxData";
import { ButtonLink } from "@/components/ui/button-link";
import ServiceRequestForm from "@/components/ServiceRequestForm";

export default function SpecialtyDetailLayout({
  specialtyName,
  specialtyType,
}: {
  specialtyName: string;
  specialtyType: string;
}) {
  const associatedServices = SERVICES_DATA.filter(
    (service) => service.typeSpeciality === specialtyType
  );

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-primary/30">
      <section className="relative pt-32 pb-16 border-b border-white/5 overflow-hidden">
        <img
          src="/assets/images/about/ecran.jpeg"
          className="w-full h-full object-cover opacity-40 absolute left-0 top-0"
          alt="Fondo de servicio técnico"
        />

        <ContentWidth className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
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

      <ServiceRequestForm specialtyName={specialtyName} />

      {/*<section className="py-24 bg-white/2 border-y border-white/5">*/}
      {/*  <ContentWidth>*/}
      {/*    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">*/}
      {/*      <div className="space-y-4">*/}
      {/*        <div className="flex items-center gap-3">*/}
      {/*          <ShieldCheck className="h-5 w-5" />*/}
      {/*          <h4 className="font-bold text-sm">Qué incluye</h4>*/}
      {/*        </div>*/}
      {/*        <ul className="space-y-2 text-sm text-white/50">*/}
      {/*          <li className="flex items-start gap-2">*/}
      {/*            • Diagnóstico electrónico base*/}
      {/*          </li>*/}
      {/*          <li className="flex items-start gap-2">*/}
      {/*            • Informe técnico detallado*/}
      {/*          </li>*/}
      {/*          <li className="flex items-start gap-2">*/}
      {/*            • Garantía por el trabajo*/}
      {/*          </li>*/}
      {/*        </ul>*/}
      {/*      </div>*/}
      {/*      <div className="space-y-4">*/}
      {/*        <div className="flex items-center gap-3">*/}
      {/*          <Clock className="h-5 w-5" />*/}
      {/*          <h4 className="font-bold text-sm">Tiempos estimados</h4>*/}
      {/*        </div>*/}
      {/*        <p className="text-sm text-white/50 leading-relaxed">*/}
      {/*          El diagnóstico inicial se realiza en un periodo de 24 a 48*/}
      {/*          horas. reparaciones menores pueden concluirse el mismo día según*/}
      {/*          disponibilidad de componentes.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      <div className="space-y-4">*/}
      {/*        <div className="flex items-center gap-3">*/}
      {/*          <Info className="h-5 w-5" />*/}
      {/*          <h4 className="font-bold text-sm">Aviso importante</h4>*/}
      {/*        </div>*/}
      {/*        <p className="text-sm text-white/40 leading-relaxed">*/}
      {/*          Servitec perú group es un centro de soporte independiente. no*/}
      {/*          somos servicio oficial de fabricantes. el servicio no incluye*/}
      {/*          repuestos no detallados en el presupuesto.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </ContentWidth>*/}
      {/*</section>*/}

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
                    className="object-cover opacity-70 group-hover:scale-105 transition-all duration-700"
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
                      <h3 className="text-xl font-bold mb-3 text-white hover:underline">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-2">
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
