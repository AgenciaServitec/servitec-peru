import React, { useState } from "react";
import {
  Building,
  Clock,
  MapPin,
  Navigation,
  PhoneCall,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentWidth } from "@/components/ContentWidth";

const SEDES = [
  {
    id: "oficina",
    name: "Oficina",
    distrito: "Chorrillos",
    address: "Calle Néstor Bermúdez 113, Chorrillos, Lima",
    horario: "Lun – Vie: 9AM – 7PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.1350304609246!2d-77.0188392!3d-12.1712089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b7788f5f5189%3A0x70a366f7a0e80cd0!2sServitec%20Per%C3%BA%20Group%20EIRL%20%E2%80%94%20Oficina%20Administrativa!5e0!3m2!1ses-419!2spe!4v1771539804756!5m2!1ses-419!2spe",
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Servitec+Per%C3%BA+Group+EIRL+Oficina+Administrativa+-12.1712089,-77.0188392",
  },
  {
    id: "kiwi",
    name: "Taller",
    distrito: "Chorrillos",
    address: "Justo Pastor Davil 117, Chorrillos 15064",
    horario: "Lun – Vie: 9AM – 7PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.074325530455!2d-77.0184858!3d-12.175343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b7788f078293%3A0xeec5e7a15ec3f73b!2sServitec%20Per%C3%BA%20Group%20EIRL%20%E2%80%94%20Taller%20T%C3%A9cnico!5e0!3m2!1ses-419!2spe!4v1771539819520!5m2!1ses-419!2spe",
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=current+location&destination=-12.175343,-77.0184858",
  },
];

export default function Ubicacion() {
  const [activeSede, setActiveSede] = useState(SEDES[0]);

  return (
    <section className="relative w-full pt-24 border-t border-white/5">
      <ContentWidth>
        <div className="mb-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                Nuestras Sedes
              </h2>
              <p className="text-white/40 max-w-xl text-sm leading-relaxed">
                Laboratorios especializados equipados con tecnología de
                diagnóstico avanzada para soporte presencial garantizado en
                Lima.
              </p>
            </div>

            <Tabs
              defaultValue={activeSede.id}
              onValueChange={(val) =>
                setActiveSede(SEDES.find((s) => s.id === val)!)
              }
              className="w-full md:w-auto"
            >
              <TabsList className="bg-white/5 border border-white/10 p-1 h-12 rounded-sm">
                {SEDES.map((sede) => (
                  <TabsTrigger
                    key={sede.id}
                    value={sede.id}
                    className="px-10 data-[state=active]:bg-primary data-[state=active]:text-black rounded-sm transition-all"
                  >
                    {sede.id === "oficina" ? <Building /> : <Wrench />}
                    {sede.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-white/5 py-10">
            <div className="flex items-center gap-5">
              <div className="p-3 border border-white/10 rounded-sm">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/30 mb-1">
                  Dirección Exacta
                </p>
                <p className="text-sm text-white/90 font-medium">
                  {activeSede.address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="p-3 border border-white/10 rounded-sm">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/30 mb-1">
                  Horario Laboral
                </p>
                <p className="text-sm text-white/90 font-medium">
                  {activeSede.horario}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-end">
              <Button variant="outline" className="btn-ghost-dark" asChild>
                <a
                  href="https://wa.me/51941801827"
                  target="_blank"
                  rel="noreferrer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Contactar</span>
                </a>
              </Button>
              <Button className="btn-primary" asChild>
                <a
                  href={activeSede.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Cómo llegar</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </ContentWidth>

      <div className="relative w-full h-[400px] md:h-[500px]">
        <iframe
          src={activeSede.mapEmbedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
