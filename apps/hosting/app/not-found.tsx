"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, Settings } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Fondo con Grid (Igual que el Hero) */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-primary/[0.02] blur-[120px]" />
      </div>

      <ContentWidth>
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Icono animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <Settings className="w-24 h-24 text-white/5 animate-[spin_10s_linear_infinite]" />
            <AlertTriangle className="w-10 h-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </motion.div>

          {/* Texto de error */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-9xl font-black tracking-tighter text-white/10"
            >
              404
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Sistema fuera de <span className="text-primary">alcance</span>
              </h2>
              <p className="text-white/40 text-sm md:text-base max-w-md mx-auto">
                La página que buscas no existe o ha sido movida a un nuevo
                sector del servidor.
              </p>
            </motion.div>
          </div>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button size="lg" className="btn-primary px-8" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/10 text-white/60 hover:text-white"
              asChild
            >
              <Link href="/reclamaciones">Soporte Técnico</Link>
            </Button>
          </motion.div>
        </div>
      </ContentWidth>
    </main>
  );
}