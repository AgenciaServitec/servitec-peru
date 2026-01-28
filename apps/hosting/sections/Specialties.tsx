"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";

type ServiceCard = {
  title: string;
  description: string;
  image: string;
  tag: string;
  bullets: string[];
  href: string;
};

const services: ServiceCard[] = [
  {
    title: "Reparación de proyectores",
    description:
      "Diagnóstico, mantenimiento y solución de fallas comunes con garantía.",
    image: "/services-images/data-recovery-images/data-recovery.png",
    tag: "Garantía",
    bullets: [
      "Limpieza interna",
      "Cambio de lámpara",
      "Revisión de imagen / enfoque",
    ],
    href: "/servicios/reparacion-de-proyectores",
  },
  {
    title: "Reparación de laptops",
    description:
      "Solución de fallas, mantenimiento y upgrades para mejor rendimiento.",
    image: "/services-images/data-recovery-images/data-recovery.png",
    tag: "Rápido",
    bullets: ["Optimización", "SSD / RAM", "Pantalla / teclado"],
    href: "/servicios/reparacion-de-laptops",
  },
  {
    title: "Reparación de celulares",
    description: "Pantalla, batería, puertos y fallas de software.",
    image: "/services-images/data-recovery-images/data-recovery.png",
    tag: "Taller",
    bullets: ["Pantallas", "Baterías", "Puertos / carga"],
    href: "/servicios/reparacion-de-celulares",
  },
];

export function Specialties() {
  return (
    <section className="py-14">
      <ContentWidth>
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground">Especialidades</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Servicios principales
          </h2>
          <p className="mt-3 text-muted-foreground">
            Selecciona un servicio para ver el detalle. Si no estás seguro,
            puedes solicitar una cotización.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card
              key={s.title}
              className={[
                "overflow-hidden border-white/10 bg-white/[0.04]",
                "transition hover:-translate-y-0.5 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-black/30 py-0",
              ].join(" ")}
            >
              {/* IMAGE: full-bleed + no “aire” */}
              <div className="relative w-full">
                {/* Usa aspect ratio para que se vea consistente */}
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority={false}
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                </div>

                <div className="absolute left-4 top-4">
                  <Badge className="bg-primary text-black hover:bg-primary/90">
                    {s.tag}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-base font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.description}</p>

                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* BOTONES: más grandes y aprovechan espacio */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/15"
                    asChild
                  >
                    <Link href={s.href}>
                      Ver detalle <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="lg"
                    className="bg-primary text-black hover:bg-primary/90"
                    asChild
                  >
                    <Link href="/contacto">
                      Cotizar <FileText className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentWidth>
    </section>
  );
}
