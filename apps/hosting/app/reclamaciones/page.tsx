"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ContentWidth } from "@/components/ContentWidth";
import { FileText, Info, MessageSquare, Send, User } from "lucide-react";

// Shadcn UI Components (Asumiendo que están en la ruta estándar)
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export default function ReclamacionesPage() {
  const [formType, setFormType] = useState<"RECLAMO" | "QUEJA">("RECLAMO");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  function handleMouseMove({
    clientX,
    clientY,
    currentTarget,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative isolate bg-[#050505] min-h-screen pt-32 pb-20 overflow-hidden"
    >
      {/* BACKGROUND EFFECTS (Consistente con Hero) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            x: useTransform(springX, (v) => v * -0.015),
            y: useTransform(springY, (v) => v * -0.015),
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-primary/[0.015] blur-[120px]" />
      </div>

      <ContentWidth>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-3xl mx-auto mb-12 space-y-4 relative z-10"
        >
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
              Libro de <br />
              <span className="text-primary">Reclamaciones</span>
            </h1>
            <div className="h-1 w-20 bg-primary/20 rounded-full" />
          </div>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Registra tu disconformidad de manera formal. En Servitec Perú Group
            nos comprometemos a resolver tus dudas en el plazo legal de 15 días
            hábiles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <form className="space-y-10 bg-white/[0.02] border border-white/5 p-6 md:p-10 rounded-sm shadow-2xl backdrop-blur-sm">
            {/* SECCIÓN 1: CONSUMIDOR */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <User size={18} className="text-primary" />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  1. Identificación del Consumidor
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-white/30 font-bold tracking-widest ml-1">
                    Nombre Completo
                  </Label>
                  <Input
                    placeholder="Nombre y Apellidos"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-white/30 font-bold tracking-widest ml-1">
                    DNI / CE
                  </Label>
                  <Input
                    placeholder="Documento de identidad"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-white/30 font-bold tracking-widest ml-1">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-white/30 font-bold tracking-widest ml-1">
                    Teléfono
                  </Label>
                  <Input
                    type="tel"
                    placeholder="Celular de contacto"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase text-white/30 font-bold tracking-widest ml-1">
                  Dirección Completa
                </Label>
                <Input
                  placeholder="Av, Jr, Calle - Distrito"
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/40"
                />
              </div>
            </section>

            {/* SECCIÓN 2: SERVICIO */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <FileText size={18} className="text-primary" />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  2. Bien Contratado
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-white/30 font-bold tracking-widest ml-1">
                    N° Comprobante / OS
                  </Label>
                  <Input
                    placeholder="Ej. OS-1234"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-white/30 font-bold tracking-widest ml-1">
                    Monto (S/.)
                  </Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/40"
                  />
                </div>
              </div>
            </section>

            {/* SECCIÓN 3: RECLAMACIÓN */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <MessageSquare size={18} className="text-primary" />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  3. Detalle de Reclamación
                </h2>
              </div>

              <div className="flex gap-4">
                {(["RECLAMO", "QUEJA"] as const).map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant="outline"
                    onClick={() => setFormType(type)}
                    className={cn(
                      "flex-1 h-auto py-4 rounded-sm transition-all flex flex-col items-center gap-1 border-white/5",
                      formType === type
                        ? "border-primary bg-primary/[0.05] text-primary hover:bg-primary/[0.08] hover:text-primary shadow-[0_0_15px_rgba(234,179,8,0.05)]"
                        : "bg-white/[0.01] text-white/30 hover:bg-white/[0.03] hover:text-white"
                    )}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-widest">
                      {type}
                    </span>
                    <span className="text-[8px] opacity-40 uppercase tracking-tighter">
                      {type === "RECLAMO"
                        ? "Falla en servicio"
                        : "Queja por atención"}
                    </span>
                  </Button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-white/30 font-bold tracking-widest ml-1">
                    Descripción de los hechos
                  </Label>
                  <Textarea
                    placeholder="Describe lo sucedido..."
                    className="bg-white/[0.03] border-white/10 text-white min-h-[120px] focus-visible:ring-primary/40 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-white/30 font-bold tracking-widest ml-1">
                    Pedido del cliente
                  </Label>
                  <Textarea
                    placeholder="¿Qué solución solicitas?"
                    className="bg-white/[0.03] border-white/10 text-white min-h-[80px] focus-visible:ring-primary/40 resize-none"
                  />
                </div>
              </div>
            </section>

            <div className="space-y-6 pt-4">
              <Alert className="bg-white/[0.02] border-white/5 rounded-sm">
                <Info className="h-4 w-4 text-primary" />
                <AlertDescription className="text-[11px] text-white/50 leading-relaxed italic ml-2">
                  Al enviar este formulario, usted declara que los datos
                  proporcionados son verdaderos. Servitec Perú atenderá su
                  solicitud en un plazo máximo de 15 días hábiles conforme a
                  ley.
                </AlertDescription>
              </Alert>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-white text-black font-bold uppercase text-[12px] py-6 rounded-sm transition-all flex items-center justify-center gap-3 tracking-[0.2em] shadow-lg shadow-primary/5 active:scale-[0.98]"
              >
                <Send size={14} /> Registrar Reclamación
              </Button>
            </div>
          </form>
        </motion.div>
      </ContentWidth>
    </div>
  );
}
