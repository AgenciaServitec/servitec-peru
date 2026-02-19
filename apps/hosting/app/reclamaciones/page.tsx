"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContentWidth } from "@/components/ContentWidth";
import {
  FileText,
  Info,
  MessageSquare,
  Send,
  Upload,
  User,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReclamacionesPage() {
  const [formType, setFormType] = useState<"RECLAMO" | "QUEJA">("RECLAMO");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-20">
      <ContentWidth>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto mb-12 text-center md:text-left"
        >
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-[1.1]">
              Libro de <br />
              <span className="text-primary font-black">Reclamaciones</span>
            </h1>
          </div>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mt-4">
            Registra tu disconformidad de manera formal. En Servitec Perú Group
            nos comprometemos a resolver tus dudas en el plazo legal de 15 días
            hábiles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <form className="space-y-12 bg-neutral-900/30 border border-white/5 p-6 md:p-12 rounded-sm shadow-2xl">
            {/* SECCIÓN 1: CONSUMIDOR */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  1. Identificación del consumidor
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white/50 text-xs ml-1">
                    Nombre completo
                  </Label>
                  <Input
                    placeholder="Nombre y apellidos"
                    className="bg-white/[0.03] border-white/10 h-12 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/50 text-xs ml-1">DNI / CE</Label>
                  <Input
                    placeholder="Documento de identidad"
                    className="bg-white/[0.03] border-white/10 h-12 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/50 text-xs ml-1">
                    Email de contacto
                  </Label>
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="bg-white/[0.03] border-white/10 h-12 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/50 text-xs ml-1">
                    Teléfono / Celular
                  </Label>
                  <Input
                    type="tel"
                    placeholder="999 999 999"
                    className="bg-white/[0.03] border-white/10 h-12 focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white/50 text-xs ml-1">
                    Dirección domiciliaria
                  </Label>
                  <Input
                    placeholder="Av, Jr, Calle - Distrito"
                    className="bg-white/[0.03] border-white/10 h-12 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/50 text-xs ml-1">
                    Padre o Madre (Si es menor de edad)
                  </Label>
                  <Input
                    placeholder="Nombre del apoderado"
                    className="bg-white/[0.03] border-white/10 h-12 focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* SECCIÓN 2: BIEN CONTRATADO */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText size={16} className="text-primary" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  2. Detalles del bien o servicio
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white/50 text-xs ml-1">
                    Sede de atención
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-white/[0.03] border-white/10 h-12 text-white">
                      <SelectValue placeholder="Selecciona una sede" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-white/10 text-white">
                      <SelectItem value="nestor">
                        Sede Néstor Bermejo
                      </SelectItem>
                      <SelectItem value="kiwi">Sede Taller Kiwi</SelectItem>
                      <SelectItem value="online">
                        Atención Online / Delivery
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label className="text-white/50 text-xs ml-1">
                      N° Comprobante / OS
                    </Label>
                    <Input
                      placeholder="Ej. OS-1234"
                      className="bg-white/[0.03] border-white/10 h-12 focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div className="w-32 space-y-2">
                    <Label className="text-white/50 text-xs ml-1">
                      Monto (S/.)
                    </Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="bg-white/[0.03] border-white/10 h-12 focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN 3: RECLAMACIÓN */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare size={16} className="text-primary" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  3. Detalle de la reclamación
                </h2>
              </div>

              <div className="flex gap-4">
                {(["RECLAMO", "QUEJA"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormType(type)}
                    className={cn(
                      "flex-1 p-4 rounded-sm border transition-all text-left space-y-1",
                      formType === type
                        ? "bg-primary border-primary text-black shadow-lg shadow-primary/10"
                        : "bg-white/[0.02] border-white/10 text-white/40 hover:border-white/20"
                    )}
                  >
                    <div className="font-bold text-sm tracking-tight">
                      {type}
                    </div>
                    <div
                      className={cn(
                        "text-[10px]",
                        formType === type ? "text-black/60" : "text-white/20"
                      )}
                    >
                      {type === "RECLAMO"
                        ? "Falla técnica / Servicio"
                        : "Queja por mala atención"}
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-white/50 text-xs ml-1">
                    Descripción de lo sucedido
                  </Label>
                  <Textarea
                    placeholder="Bríndanos detalles sobre el inconveniente..."
                    className="bg-white/[0.03] border-white/10 min-h-[140px] resize-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/50 text-xs ml-1">
                    Pedido o solución solicitada
                  </Label>
                  <Textarea
                    placeholder="¿Cómo podemos resolver este inconveniente?"
                    className="bg-white/[0.03] border-white/10 min-h-[100px] resize-none focus:border-primary/50 transition-colors"
                  />
                </div>

                {/* CAMPO ADJUNTO OPCIONAL */}
                <div className="space-y-2">
                  <Label className="text-white/50 text-xs ml-1">
                    Adjuntar evidencia (Opcional)
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-between w-full h-12 px-4 bg-white/[0.03] border border-white/10 rounded-sm cursor-pointer hover:bg-white/[0.06] transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Upload size={14} className="text-primary" />
                        <span className="text-sm text-white/40 italic">
                          {fileName
                            ? fileName
                            : "Foto de OS, boleta o falla..."}
                        </span>
                      </div>
                      {fileName && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setFileName(null);
                          }}
                          className="p-1 hover:bg-white/10 rounded-full"
                        >
                          <X size={14} className="text-white/60" />
                        </button>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <div className="space-y-8 pt-6">
              <div className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                <Info size={20} className="text-primary shrink-0 mt-0.5" />
                <p className="text-[11px] text-white/40 leading-relaxed">
                  Conforme a lo establecido en el Código de Protección y Defensa
                  del Consumidor, Servitec Perú Group cuenta con un plazo de 15
                  días hábiles para dar respuesta a su requerimiento.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-primary hover:bg-white text-black font-bold rounded-sm transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.99]"
              >
                <Send size={16} />
                Registrar Reclamación Formal
              </Button>
            </div>
          </form>
        </motion.div>
      </ContentWidth>
    </div>
  );
}
