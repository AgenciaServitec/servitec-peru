"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Ubicacion from "@/sections/Ubication";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    documento: "",
    servicio: "",
    mensaje: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="bg-[#050505] min-h-screen" />;

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedPrivacy) {
      alert("Por favor, acepta las políticas de privacidad para continuar.");
      return;
    }

    const numeroWA = "51941801827";
    const texto =
      `*SOLICITUD DE SOPORTE*%0A` +
      `*Nombre:* ${formData.nombre}%0A` +
      `*DNI/RUC:* ${formData.documento}%0A` +
      `*WhatsApp:* ${formData.telefono}%0A` +
      `*Servicio:* ${formData.servicio}%0A` +
      `*Mensaje:* ${formData.mensaje}`;

    window.open(`https://wa.me/${numeroWA}?text=${texto}`, "_blank");
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-20 font-sans relative overflow-hidden">
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <ContentWidth>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
            >
              Contacto
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white text-base md:text-xl leading-relaxed max-w-2xl mx-auto opacity-70"
            >
              ¿Cómo podemos ayudarte hoy? Soporte técnico especializado para
              soluciones inmediatas en Lima.
            </motion.p>
          </div>
        </ContentWidth>
      </section>

      <section className="py-24 relative z-10">
        <ContentWidth>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: <Phone className="w-5 h-5" />,
                title: "Llamada Directa",
                value: "+51 941 801 827",
                link: "tel:+51941801827",
              },
              {
                icon: <MessageSquare className="w-5 h-5" />,
                title: "WhatsApp Business",
                value: "Atención Inmediata",
                link: "https://wa.me/51941801827",
              },
              {
                icon: <Mail className="w-5 h-5" />,
                title: "Correo Electrónico",
                value: "contacto@servitec-peru.com",
                link: "mailto:contacto@servitec-peru.com",
              },
            ].map((item, idx) => (
              <a
                href={item.link}
                key={idx}
                className="p-8 rounded-sm border border-white/5"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-sm mb-6 text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-primary font-medium">{item.value}</p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                  Soporte Especializado
                </h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  Nuestro equipo procesará tu solicitud para brindarte una
                  solución técnica en menos de 30 minutos.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-2">
                  <div className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Garantía Real
                    </h4>
                    <p className="text-xs text-white/30">
                      Respaldo técnico en cada trabajo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 p-8 md:p-12 rounded-sm border border-white/5 bg-neutral-900/40">
              <form
                onSubmit={handleWhatsAppSend}
                className="grid grid-cols-1 sm:grid-cols-2 gap-8"
              >
                <div className="space-y-2">
                  <label className="text-[11px] font-bold">
                    Nombre Completo
                  </label>
                  <Input
                    required
                    placeholder="Ej. Juan Pérez"
                    className="bg-black/40 border-white/10 h-12 rounded-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold">DNI / RUC</label>
                  <Input
                    required
                    placeholder="Número de documento"
                    className="bg-black/40 border-white/10 h-12 rounded-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, documento: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold">WhatsApp</label>
                  <Input
                    required
                    type="tel"
                    placeholder="999 999 999"
                    className="bg-black/40 border-white/10 h-12 rounded-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold">Correo</label>
                  <Input
                    required
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="bg-black/40 border-white/10 h-12 rounded-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, correo: e.target.value })
                    }
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[11px] font-bold">
                    Servicio Requerido
                  </label>
                  <Input
                    required
                    placeholder="¿En qué podemos ayudarte?"
                    className="bg-black/40 border-white/10 h-12 rounded-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, servicio: e.target.value })
                    }
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[11px] font-bold">
                    Mensaje Técnico
                  </label>
                  <Textarea
                    placeholder="Describe brevemente el problema de tu equipo..."
                    className="bg-black/40 border-white/10 min-h-[120px] rounded-sm resize-none"
                    onChange={(e) =>
                      setFormData({ ...formData, mensaje: e.target.value })
                    }
                  />
                </div>

                <div className="sm:col-span-2 flex items-center space-x-3 pt-2">
                  <Checkbox
                    id="privacy"
                    checked={acceptedPrivacy}
                    onCheckedChange={(checked) =>
                      setAcceptedPrivacy(checked as boolean)
                    }
                    className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="grid gap-1.5">
                    <label
                      htmlFor="privacy"
                      className="text-[11px] font-medium text-white/50 cursor-pointer select-none"
                    >
                      Acepto las{" "}
                      <Link
                        href="/politicas-privacidad"
                        className="text-primary hover:underline"
                      >
                        políticas de privacidad
                      </Link>{" "}
                      y el tratamiento de mis datos para fines de soporte
                      técnico.
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2 pt-4">
                  <Button type="submit" className="btn-primary w-full h-14">
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitud</span>
                  </Button>

                  <div className="flex items-center justify-center gap-8 mt-8 opacity-20">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      <span className="text-[9px] font-bold">
                        Privacidad Protegida
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" />
                      <span className="text-[9px] font-bold">
                        Soporte Técnico
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ContentWidth>
      </section>

      <Ubicacion />
    </div>
  );
}
