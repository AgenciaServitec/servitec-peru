"use client";

import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { AboutDetails } from "@/sections/AboutDetails";
import { ArrowDownRight, Eye, ShieldCheck, Target } from "lucide-react";

export default function About() {
  return (
    <div className="bg-[#050505] text-white selection:bg-[#FFD200] selection:text-black">
      {/* HERO IMPACTANTE */}
      <section className="relative h-[70vh] w-full flex items-end pb-20 overflow-hidden">
        <Image
          src="/content_about/nosotros4.jpg"
          alt="Servitec Team"
          fill
          className="object-cover opacity-30 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

        <ContentWidth className="relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-7xl md:text-[120px] font-black mb-8">
              Nosotros<span className="text-[#FFD200]">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed">
              Expertos en{" "}
              <span className="text-white">infraestructura tecnológica</span> y
              soluciones digitales de alto rendimiento.
            </p>
          </div>
        </ContentWidth>
      </section>

      <ContentWidth className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          <div className="md:col-span-2 md:row-span-2 bg-[#0A0A0A] border border-white/5 rounded-md p-10 relative overflow-hidden group">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <p className="text-2xl md:text-4xl font-light leading-tight tracking-tight text-white/90">
                  Somos una empresa líder en soluciones informáticas,
                  especializada en la
                  <span className="text-[#FFD200] italic font-medium">
                    {" "}
                    asesoría y consultoría
                  </span>{" "}
                  de hardware y software.
                </p>
              </div>
              <p className="text-white/40 max-w-md text-sm leading-relaxed">
                Logramos identificar y entender las necesidades de nuestros
                clientes para ofrecer la mejor solución integral, tanto para
                hogares como para el sector corporativo.
              </p>
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/5 rounded-md p-8 flex flex-col justify-between group hover:border-[#FFD200]/30 transition-all duration-500">
            <div className="h-12 w-12 flex items-center justify-center rounded-md border border-white/10 text-[#FFD200]">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center justify-between">
                Misión <ArrowDownRight className="h-4 w-4 text-white/20" />
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Brindar soluciones de TI con idoneidad, incrementando el valor
                del negocio de cada cliente.
              </p>
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/5 rounded-md p-8 flex flex-col justify-between group hover:border-[#FFD200]/30 transition-all duration-500">
            <div className="h-12 w-12 flex items-center justify-center rounded-md border border-white/10 text-[#FFD200]">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center justify-between">
                Visión <ArrowDownRight className="h-4 w-4 text-white/20" />
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Ser la empresa líder brindando soluciones innovadoras con
                excelencia y calidad técnica.
              </p>
            </div>
          </div>

          <div className="md:col-span-3 bg-[#FFD200] rounded-md p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <ShieldCheck className="h-8 w-8 text-black" />
                <h3 className="text-2xl font-bold text-black">
                  Nuestros valores
                </h3>
              </div>
              <p className="text-black/70 max-w-2xl font-medium leading-relaxed">
                Son los pilares fundamentales en las relaciones con nuestros
                trabajadores, clientes y proveedores. Integridad, transparencia
                y compromiso técnico en cada proyecto.
              </p>
            </div>
          </div>
        </div>
      </ContentWidth>

      <AboutDetails />
    </div>
  );
}
