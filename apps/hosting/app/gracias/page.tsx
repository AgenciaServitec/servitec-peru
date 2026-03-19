"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export default function ThankYouPage() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="relative z-20 px-6 max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="mb-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
            >
              <CheckCircle2 className="w-20 h-20 text-primary stroke-[1.5]" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">
            {["Solicitud", "Recibida"].map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block mx-2"
                initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-md mb-12 font-light leading-relaxed">
            Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto
            contigo a la brevedad posible para brindarte una solución técnica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <ButtonLink href="/" variant="outline" icon={ArrowLeft}>
              Volver al inicio
            </ButtonLink>

            <ButtonLink
              href="https://wa.me/51941801827"
              icon={IconBrandWhatsapp}
            >
              Soporte Inmediato
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
