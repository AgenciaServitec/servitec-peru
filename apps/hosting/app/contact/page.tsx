"use client";

import * as React from "react";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, MapPin, PhoneCall, Sparkles } from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  service: string | undefined;
  brandModel: string;
  issue: string;
  preferred: "whatsapp" | "call";
};

const SERVICES = [
  "Reparación de proyectores",
  "Reparación de laptops",
  "Reparación de celulares",
  "Redes y servidores",
  "Cámaras de seguridad",
  "Desarrollo web / sistemas",
  "Otro",
];

export default function Contact() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<FormState>({
    name: "",
    phone: "",
    service: SERVICES[0],
    brandModel: "",
    issue: "",
    preferred: "whatsapp" as const,
  });

  const address = "Néstor Bermúdez 113, Chorrillos, Lima, Perú";
  const schedule = "Lun–Vie: 9:00 a.m. – 7:00 p.m.";

  const whatsappUrl = React.useMemo(() => {
    const template = `*CONSULTA TÉCNICA ESPECIALIZADA*
---------------------------------------
*Cliente:* ${data.name || "No especificado"}
*Contacto:* ${data.phone || "No especificado"}
*Servicio:* ${data.service}
*Equipo:* ${data.brandModel || "No especificado"}
*Consulta/Falla:* ${data.issue || "Sin descripción"}
*Preferencia:* ${data.preferred === "whatsapp" ? "Responder por WhatsApp" : "Solicita llamada telefónica"}
---------------------------------------
_Enviado desde el Centro de Consultas Servitec_`;

    return `https://wa.me/51941801827?text=${encodeURIComponent(template)}`;
  }, [data]);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setLoading(false);
    }, 500);
  }

  return (
    <section className="bg-[#050505] selection:bg-[#FFD200] selection:text-black min-h-screen">
      {/* HERO INDUSTRIAL STYLE */}
      <div className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

        <div className="relative z-20 text-center px-6">
          <h1 className="text-6xl md:text-9xl font-black text-white">
            Contacto<span className="text-[#FFD200]">.</span>
          </h1>
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-white/60">Centro de Consultas Técnicas</p>
          </div>
        </div>
      </div>

      <ContentWidth>
        <div className="py-24 grid gap-12 lg:grid-cols-3 lg:items-start">
          {/* Formulario Principal */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Realizar Consulta Especializada
              </h2>
              <p className="text-white/40 text-lg font-light max-w-2xl">
                ¿Tiene dudas sobre su equipo o infraestructura? Describa su
                problema y un ingeniero le brindará orientación inicial.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-md overflow-hidden relative group transition-all duration-500 hover:border-white/10 shadow-2xl">
              <div className="p-8 md:p-12">
                <form onSubmit={onSubmit} className="space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label>Nombre completo</Label>
                      <Input
                        value={data.name}
                        onChange={onChange("name")}
                        className="bg-black/40 border-white/10 rounded-md text-white h-12 focus:border-[#FFD200] transition-all placeholder:text-white/10"
                        placeholder="Nombre y Apellido"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>WhatsApp / Celular</Label>
                      <Input
                        value={data.phone}
                        onChange={onChange("phone")}
                        className="bg-black/40 border-white/10 rounded-md text-white h-12 focus:border-[#FFD200] transition-all placeholder:text-white/10"
                        placeholder="999 999 999"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label>Área de interés</Label>
                      <select
                        value={data.service}
                        onChange={(e) =>
                          setData((p) => ({ ...p, service: e.target.value }))
                        }
                        className="w-full h-12 bg-black/40 border border-white/10 rounded-md px-3 text-white/80 outline-none focus:border-[#FFD200] transition-all"
                      >
                        {SERVICES.map((s) => (
                          <option key={s} value={s} className="bg-[#0A0A0A]">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <Label>Marca y Modelo (Opcional)</Label>
                      <Input
                        value={data.brandModel}
                        onChange={onChange("brandModel")}
                        className="bg-black/40 border-white/10 rounded-md text-white h-12 focus:border-[#FFD200] transition-all placeholder:text-white/10"
                        placeholder="Ej: Epson L3110 / MacBook Pro"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>¿En qué podemos ayudarle?</Label>
                    <Textarea
                      value={data.issue}
                      onChange={onChange("issue")}
                      className="min-h-[140px] bg-black/40 border-white/10 rounded-md text-white p-4 focus:border-[#FFD200] transition-all placeholder:text-white/10 resize-none"
                      placeholder="Describa su duda técnica o los síntomas de su equipo..."
                      required
                    />
                  </div>

                  <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex bg-black p-1 border border-white/10 rounded-md">
                      <button
                        type="button"
                        onClick={() =>
                          setData((prev) => ({
                            ...prev,
                            preferred: "whatsapp",
                          }))
                        }
                        className={`px-6 py-2 font-bold tracking-widest rounded-md transition-all ${data.preferred === "whatsapp" ? "bg-[#FFD200] text-black shadow-lg" : "text-white/30 hover:text-white"}`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setData((prev) => ({ ...prev, preferred: "call" }))
                        }
                        className={`px-6 py-2 font-bold tracking-widest rounded-md transition-all ${data.preferred === "call" ? "bg-[#FFD200] text-black shadow-lg" : "text-white/30 hover:text-white"}`}
                      >
                        Llamada
                      </button>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full md:w-fit bg-primary text-black font-bold rounded-md px-12 py-8 hover:scale-[1.05] transition-all shadow-[0_10px_30px_rgba(255,210,0,0.15)]"
                    >
                      {loading ? "Procesando..." : "Enviar Consulta"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-md p-10 space-y-10">
              <div className="flex items-start gap-5">
                <div className="bg-white/5 p-3 rounded-md border border-white/10">
                  <MapPin className="h-5 w-5 text-[#FFD200]" />
                </div>
                <div>
                  <p className="text-white/20">Sede Central</p>
                  <p className="text-white/80 font-bold">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-white/5 p-3 rounded-md border border-white/10">
                  <Clock className="h-5 w-5 text-[#FFD200]" />
                </div>
                <div>
                  <p className="text-white/20">Disponibilidad</p>
                  <p className="text-white/80 font-bold">{schedule}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FFD200] rounded-md p-10 relative overflow-hidden group border border-white/10 shadow-xl">
              <div className="relative z-10">
                <div className="bg-black p-3 rounded-md w-fit mb-8 shadow-xl">
                  <Sparkles className="h-6 w-6 text-[#FFD200]" />
                </div>
                <h3 className="text-3xl font-bold text-black">
                  Atención <br /> Inmediata
                </h3>
                <ul className="space-y-5">
                  {[
                    "Análisis preliminar",
                    "Resolución de dudas",
                    "Asesoría de mejora",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 font-bold text-black/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href="tel:+51941801827"
              className="flex items-center justify-center gap-4 w-full py-8 border border-white/10 bg-white/5 text-white font-bold rounded-md hover:bg-[#FFD200] hover:text-black hover:border-[#FFD200] transition-all group shadow-xl"
            >
              <PhoneCall className="h-5 w-5 text-[#FFD200] group-hover:text-black" />{" "}
              Soporte Telefónico
            </a>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
