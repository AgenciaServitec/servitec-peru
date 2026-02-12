"use client";

import { Button } from "@/components/ui/button";
import { ContentWidth } from "@/components/ContentWidth";
import { ArrowUpRight, Facebook, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function DigitalSolutions() {
  return (
    <section className="py-24 bg-[#050505] overflow-hidden">
      <ContentWidth>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#0A0A0A] via-[#0A0A0A] to-[#FFD200]/10 border border-white/5 rounded-md p-8 md:p-14 relative overflow-hidden group transition-all duration-500 hover:border-[#FFD200]/30">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFD200]/10 blur-[100px] rounded-full group-hover:bg-[#FFD200]/20 transition-all duration-700" />

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-[#FFD200] rounded-md">
                  <Sparkles className="h-4 w-4 text-black" />
                </div>
                <span className="text-[#FFD200] font-mono text-xs tracking-[0.4em] uppercase font-bold">
                  Premium Digital
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tighter uppercase">
                DISEÑO QUE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
                  CONVIERTE
                </span>
              </h2>

              <p className="text-white/50 text-base md:text-lg max-w-sm mb-12 leading-relaxed">
                Creamos plataformas digitales rápidas, seguras y optimizadas
                para transformar visitantes en clientes.
              </p>

              <Button
                asChild
                className="w-fit bg-[#FFD200] text-black font-black rounded-md px-10 py-7 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,210,0,0.2)] hover:shadow-[0_0_30px_rgba(255,210,0,0.4)]"
              >
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-base"
                >
                  INICIAR PROYECTO{" "}
                  <ArrowUpRight className="h-5 w-5 stroke-[3]" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 rounded-md p-8 flex flex-col justify-between group transition-all duration-500 hover:bg-[#1877F2]/5 hover:border-[#1877F2]/40">
            <div className="flex justify-between items-start">
              <div className="h-14 w-14 flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-white group-hover:bg-[#1877F2] group-hover:border-[#1877F2] transition-all duration-500">
                <Facebook className="h-7 w-7" />
              </div>
              <div className="text-[10px] font-mono text-white/20 tracking-widest">
                CONNECT
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-[#1877F2] transition-colors">
                Facebook{" "}
                <span className="text-white/20 group-hover:text-[#1877F2]/40">
                  Community
                </span>
              </h3>
              <p className="text-sm text-white/40 mt-2 leading-relaxed">
                Únete a más de 5k seguidores y obtén contenido técnico diario.
              </p>
            </div>
          </div>

          <div className="bg-[#FFD200] rounded-md p-8 flex flex-col justify-between group overflow-hidden relative transition-all duration-500 hover:rotate-[1deg] hover:scale-[1.02]">
            <div className="relative z-10 flex flex-col h-full">
              <div className="bg-black p-3 rounded-md w-fit mb-auto">
                <ShieldCheck className="h-6 w-6 text-[#FFD200]" />
              </div>

              <div>
                <span className="text-black/60 font-mono text-xs uppercase tracking-tighter block mb-1 font-bold">
                  Soporte Hardware & Software
                </span>
                <h3 className="text-3xl font-black text-black leading-none uppercase tracking-tighter">
                  100% GARANTÍA <br />
                  EN CADA TRABAJO
                </h3>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 text-[10rem] font-black text-black/10 select-none leading-none">
              S
            </div>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
