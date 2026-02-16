"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Clock,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
  ShieldCheck,
  Star,
} from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Contact() {
  const [activeSede, setActiveSede] = useState(0);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    documento: "",
    servicio: "",
    mensaje: "",
  });

  const sedes = [
    {
      name: "Sede Chorrillos",
      address: "Néstor Bermúdez 113, Chorrillos, Lima, Perú",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.78911571272!2d-77.022915!3d-12.181347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b7681f21670b%3A0xc3f348008851416e!2sCa.%20Coronel%20Bermudez%20113%2C%20Chorrillos%2015064!5e0!3m2!1ses-419!2spe!4v1700000000000",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Segunda Sede",
      address: "Dirección de la segunda sede aquí, Lima, Perú",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
      image:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const currentSede = sedes[activeSede];
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentSede.address)}`;

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const numeroWA = "51941801827";
    const texto =
      `*NUEVA SOLICITUD DE SOPORTE - SERVITEC*%0A%0A` +
      `*Nombre:* ${formData.nombre}%0A` +
      `*DNI/RUC:* ${formData.documento}%0A` +
      `*Teléfono:* ${formData.telefono}%0A` +
      `*Correo:* ${formData.correo}%0A` +
      `*Servicio:* ${formData.servicio || "No especificado"}%0A` +
      `*Detalle:* ${formData.mensaje}`;

    window.open(`https://wa.me/${numeroWA}?text=${texto}`, "_blank");
  };

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-20">
      {/* 1. HERO SECTION */}
      <section className="py-20">
        <ContentWidth>
          <div className="flex flex-col items-center text-center">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-[12px] mb-4 block">
              Atención al Cliente
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl max-w-4xl leading-[1.1]">
              ¿Cómo podemos <br /> ayudarte hoy?
            </h1>
          </div>
        </ContentWidth>
      </section>

      <ContentWidth>
        {/* 2. CANALES DE CONTACTO */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 text-left">
          {[
            {
              icon: <Phone className="w-5 h-5 text-primary" />,
              title: "Llamada Directa",
              value: "+51 941 801 827",
              link: "tel:+51941801827",
            },
            {
              icon: <MessageSquare className="w-5 h-5 text-primary" />,
              title: "WhatsApp Business",
              value: "Atención Inmediata",
              link: "https://wa.me/51941801827",
            },
            {
              icon: <Mail className="w-5 h-5 text-primary" />,
              title: "Correo Electrónico",
              value: "contacto@servitec-peru.com",
              link: "mailto:contacto@servitec-peru.com",
            },
          ].map((item, idx) => (
            <a
              href={item.link}
              key={idx}
              className="group p-8 bg-neutral-900/40 border border-white/5 rounded-md hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#0A0A0A] rounded-md border border-white/10 mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-primary font-bold text-sm tracking-wide">
                {item.value}
              </p>
            </a>
          ))}
        </section>

        {/* 3. FORMULARIO Y TRUST SIGNALS */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-16 pb-24 border-b border-white/5">
          <div className="lg:col-span-2 space-y-12 text-left">
            <div>
              <h2 className="text-3xl font-semibold mb-6">
                Soporte Especializado
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Nuestro equipo técnico procesará tu solicitud para brindarte una
                solución en menos de 30 minutos vía WhatsApp.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-md border border-white/5">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 font-medium">
                      "Excelente servicio, recuperaron la información de mi
                      laptop en un solo día. Muy recomendados."
                    </p>
                    <p className="text-xs text-white/40 mt-2 font-bold uppercase tracking-wider">
                      — Carlos Mendoza
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-white/5 flex items-center justify-center border border-white/10">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-base text-white">
                      Garantía Servitec
                    </h4>
                    <p className="text-sm text-white/40 mt-1">
                      Todos nuestros trabajos cuentan con certificación técnica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-neutral-900/30 border border-white/10 p-8 md:p-10 rounded-md shadow-2xl">
            <form
              onSubmit={handleWhatsAppSend}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="flex flex-col gap-2.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 ml-1">
                  Nombre Completo
                </label>
                <Input
                  required
                  placeholder="Ej. Juan Pérez"
                  className="bg-[#0A0A0A] border-white/10 h-12 text-sm px-4 focus-visible:ring-primary focus-visible:ring-offset-0"
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 ml-1">
                  DNI / RUC
                </label>
                <Input
                  required
                  placeholder="Número de documento"
                  className="bg-[#0A0A0A] border-white/10 h-12 text-sm px-4 focus-visible:ring-primary focus-visible:ring-offset-0"
                  onChange={(e) =>
                    setFormData({ ...formData, documento: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 ml-1">
                  WhatsApp
                </label>
                <Input
                  required
                  type="tel"
                  placeholder="999 999 999"
                  className="bg-[#0A0A0A] border-white/10 h-12 text-sm px-4 focus-visible:ring-primary focus-visible:ring-offset-0"
                  onChange={(e) =>
                    setFormData({ ...formData, telefono: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 ml-1">
                  Correo Electrónico
                </label>
                <Input
                  required
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="bg-[#0A0A0A] border-white/10 h-12 text-sm px-4 focus-visible:ring-primary focus-visible:ring-offset-0"
                  onChange={(e) =>
                    setFormData({ ...formData, correo: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2.5 sm:col-span-2 text-left">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 ml-1">
                  Tipo de Servicio
                </label>
                <Select
                  required
                  onValueChange={(value) =>
                    setFormData({ ...formData, servicio: value })
                  }
                >
                  <SelectTrigger className="bg-[#0A0A0A] border-white/10 h-12 text-sm px-4 focus:ring-primary focus:ring-offset-0 text-white">
                    <SelectValue placeholder="¿Qué servicio necesitas?" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                    <SelectItem value="Reparación de Laptops / PC">
                      Reparación de Laptops / PC
                    </SelectItem>
                    <SelectItem value="Recuperación de Datos">
                      Recuperación de Datos
                    </SelectItem>
                    <SelectItem value="Mantenimiento Preventivo">
                      Mantenimiento Preventivo
                    </SelectItem>
                    <SelectItem value="Servidores y Redes">
                      Servidores y Redes
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2.5 sm:col-span-2 text-left">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 ml-1">
                  Mensaje Técnico
                </label>
                <Textarea
                  required
                  placeholder="Describe brevemente el problema de tu equipo..."
                  className="bg-[#0A0A0A] border-white/10 text-sm p-4 min-h-[120px] resize-none focus-visible:ring-primary focus-visible:ring-offset-0"
                  onChange={(e) =>
                    setFormData({ ...formData, mensaje: e.target.value })
                  }
                />
              </div>

              <div className="sm:col-span-2 pt-4">
                <Button
                  type="submit"
                  className="w-full bg-primary text-black hover:bg-primary/90 font-bold py-7 text-base rounded-md shadow-xl shadow-primary/10 transition-all active:scale-[0.99]"
                >
                  Enviar Solicitud vía WhatsApp{" "}
                  <MessageSquare className="ml-3 h-5 w-5" />
                </Button>

                <div className="flex items-center justify-center gap-6 mt-6 opacity-40">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Datos Protegidos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Soporte Oficial
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </ContentWidth>

      {/* 4. UBICACIÓN DINÁMICA */}
      <section className="pt-20">
        <ContentWidth>
          <div className="mb-8 text-left">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">
              Ubicación
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Nuestras Sedes
            </h2>
            <div className="flex gap-2 mt-6">
              {sedes.map((sede, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSede(index)}
                  className={`px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all rounded-md border ${
                    activeSede === index
                      ? "bg-primary text-black border-primary shadow-lg shadow-primary/20"
                      : "bg-neutral-900 text-white/40 border-white/5 hover:border-white/20"
                  }`}
                >
                  {sede.name}
                </button>
              ))}
            </div>
          </div>
        </ContentWidth>

        <div className="w-full mt-10">
          <ContentWidth>
            <div className="flex flex-col md:flex-row items-stretch justify-between bg-[#0A0A0A] border border-white/10 rounded-t-md overflow-hidden">
              <div className="flex flex-1 flex-col md:flex-row items-center p-6 gap-6">
                <div className="h-20 w-32 shrink-0 rounded-md overflow-hidden border border-white/10 bg-neutral-800">
                  <img
                    src={currentSede.image}
                    alt="Sede"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-white/90">
                      {currentSede.address}
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2.5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-xs text-white/50 font-medium">
                      Lun–Vie: 9:00 a.m. – 7:00 p.m.
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-6 border-t md:border-t-0 md:border-l border-white/10 bg-white/[0.01]">
                <Button
                  variant="ghost"
                  className="rounded-md text-white border-white/10 h-11 px-6 text-xs font-bold hover:bg-white/5"
                  asChild
                >
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cómo llegar <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  className="rounded-md bg-primary text-black h-11 px-6 text-xs font-bold shadow-lg shadow-primary/10 hover:bg-primary/90"
                  asChild
                >
                  <a
                    href="https://wa.me/51941801827"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PhoneCall className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </ContentWidth>
          <div className="relative h-[500px] w-full border-y border-white/10 bg-neutral-900">
            <iframe
              key={activeSede}
              src={currentSede.mapEmbedUrl}
              className="h-full w-full border-none"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
