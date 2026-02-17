"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Braces,
  Code2,
  Database,
  Globe,
  Laptop,
  MousePointer2,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentWidth } from "@/components/ContentWidth";

const floatingVariants = (duration: number, yDist: number) => ({
  animate: {
    y: [0, yDist, 0],
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

export function DigitalBanner() {
  return (
    <section className="py-6 bg-[#050505] overflow-hidden font-sans">
      <ContentWidth>
        <div className="relative min-h-[300px] md:min-h-[340px] w-full rounded-[2rem] bg-[#0f0f1a] border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-purple-600/15 via-pink-600/5 to-transparent" />

          <motion.div
            variants={floatingVariants(4, -15)}
            animate="animate"
            className="absolute top-8 right-[38%] opacity-20 text-blue-400"
          >
            <Code2 size={40} strokeWidth={1.5} />
          </motion.div>

          <motion.div
            variants={floatingVariants(5, 15)}
            animate="animate"
            className="absolute bottom-10 right-[22%] opacity-15 text-purple-400"
          >
            <Database size={32} strokeWidth={1.5} />
          </motion.div>

          <motion.div
            variants={floatingVariants(6, -10)}
            animate="animate"
            className="absolute top-16 right-[8%] opacity-20 text-pink-400"
          >
            <Braces size={38} strokeWidth={1.5} />
          </motion.div>

          <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full border-[10px] border-white/5 flex items-center justify-center pointer-events-none">
            <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 p-[1.5px] opacity-70">
              <div className="w-full h-full rounded-full bg-[#0f0f1a] flex flex-col items-center justify-center relative">
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-32 h-20 md:w-44 md:h-28 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-lg p-3 shadow-2xl relative z-10"
                >
                  <div className="flex gap-1 mb-2">
                    <div className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-yellow-500/50 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full" />
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full mb-2" />
                  <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />

                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 rounded-md"
                  >
                    <MousePointer2 className="text-white w-3 h-3 md:w-4 md:h-4" />
                  </motion.div>
                </motion.div>

                <span className="text-[8px] text-white/20 mt-4 tracking-[0.4em] font-black uppercase">
                  Servitec Lab
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-20 h-full flex flex-col justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h2 className="text-3xl md:text-5xl font-black text-white leading-[0.95] mb-4 tracking-tighter uppercase">
                DESARROLLO WEB <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  & ESCALABILIDAD
                </span>
              </h2>

              <p className="text-neutral-400 text-[11px] md:text-sm mb-6 max-w-[280px] md:max-w-sm leading-relaxed">
                Transformamos tus ideas en ecosistemas digitales escalables:
                e-commerce, apps móviles y software de alto rendimiento.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <Button className="bg-white text-black hover:bg-neutral-200 font-bold px-6 py-5 md:px-8 md:py-6 rounded-sm transition-all flex items-center gap-2 group border-none text-xs md:text-sm">
                  SOLICITAR CONSULTORÍA
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-6 pt-2 border-t border-white/5">
                {[
                  { icon: Globe, label: "SITIOS WEB" },
                  { icon: Smartphone, label: "MOBILE APPS" },
                  { icon: Laptop, label: "SISTEMAS" },
                  { icon: ShoppingBag, label: "E-COMMERCE" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 group cursor-default"
                  >
                    <s.icon className="text-blue-500/60 w-3.5 h-3.5" />
                    <span className="text-[9px] text-white/40 uppercase font-black tracking-widest group-hover:text-blue-400 transition-colors">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
