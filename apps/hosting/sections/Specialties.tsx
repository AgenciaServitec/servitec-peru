"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";
import SpecialtiesData from "../data-list/specialties.json";

type Specialty = {
  type: string;
  title: string;
  description: string;
  image: string;
  includes: string[];
};

const TAG_BY_TYPE: Record<string, string> = {
  "projector-repair": "Garantía",
  "laptop-repair": "Rápido",
  "smartphone-repair": "Taller",
};

export function Specialties() {
  const data = SpecialtiesData as Specialty[];

  const baseItems = useMemo(() => {
    return data.map((item) => ({
      title: item.title,
      description: item.description,
      image: item.image,
      tag: TAG_BY_TYPE[item.type] ?? "Servicio",
      bullets: (item.includes ?? []).slice(0, 3),
      // ✅ ahora va a /services con type-specialty
      href: `/services?type-specialty=${encodeURIComponent(item.type)}`,
    }));
  }, [data]);

  // ✅ duplicamos para que el loop sea “infinito”
  const items = useMemo(() => [...baseItems, ...baseItems], [baseItems]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [cardStep, setCardStep] = useState<number>(380 + 24); // fallback
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  // medir ancho real de una card + gap
  useEffect(() => {
    const measure = () => {
      const scroller = scrollerRef.current;
      const card = cardRef.current;
      if (!scroller || !card) return;

      const styles = window.getComputedStyle(scroller);
      const gap = parseFloat(styles.columnGap || styles.gap || "24") || 24;
      setCardStep(card.getBoundingClientRect().width + gap);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // posicionar en la mitad para poder ir “a ambos lados”
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // espera un tick para que calcule tamaños
    const id = window.setTimeout(() => {
      el.scrollLeft = el.scrollWidth / 4; // punto cómodo dentro del primer bloque
    }, 50);

    return () => window.clearTimeout(id);
  }, []);

  // autoplay lento, “uno por uno”
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const interval = window.setInterval(() => {
      if (isHoveringRef.current) return;
      if (isDraggingRef.current) return;

      el.scrollBy({ left: cardStep, behavior: "smooth" });
    }, 3500); // velocidad (más alto = más lento)

    return () => window.clearInterval(interval);
  }, [cardStep]);

  // loop infinito: si pasa del medio, vuelve sin que se note
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const half = el.scrollWidth / 2;
      // si te vas muy a la derecha, regresa una “mitad”
      if (el.scrollLeft > half + cardStep * 2) {
        el.scrollLeft = el.scrollLeft - half;
      }
      // si te vas muy a la izquierda, avanza una “mitad”
      if (el.scrollLeft < cardStep * 2) {
        el.scrollLeft = el.scrollLeft + half;
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [cardStep]);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = direction === "left" ? -cardStep : cardStep;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Drag to scroll (mouse) sin descuadrar
  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = scrollerRef.current;
    if (!el || !isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    el.scrollLeft = dragStartScrollLeftRef.current - dx;
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section id="servicios" className="py-14 my-20">
      <div className="rounded-[28px] bg-[#F6F7F9] border border-black/10">
        <ContentWidth>
          <div className="py-12">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                {/* ✅ Cambiado a “Especialidades” */}
                <p className="text-sm text-black/60">Especialidades</p>

                {/* ✅ Mejor naming */}
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                  Soluciones por categoría
                </h2>

                <p className="mt-3 text-black/70">
                  Elige una categoría para ver los servicios disponibles. Si no
                  estás seguro, puedes solicitar una cotización.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* ✅ más visible en blanco */}
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-black/[0.03]"
                >
                  Ver todos los servicios
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {/* Controls (desktop) */}
                <div className="hidden lg:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollByCard("left")}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/20 bg-black text-white hover:bg-black/90"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollByCard("right")}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/20 bg-black text-white hover:bg-black/90"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Carousel */}
            <div className="mt-8">
              <div
                ref={scrollerRef}
                onMouseEnter={() => (isHoveringRef.current = true)}
                onMouseLeave={() => {
                  isHoveringRef.current = false;
                  onMouseUp();
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                className={[
                  "flex gap-6 overflow-x-auto pb-2",
                  "scroll-smooth",
                  "snap-x snap-mandatory",
                  "cursor-grab active:cursor-grabbing select-none",
                  "[-ms-overflow-style:none] [scrollbar-width:none]",
                  "[&::-webkit-scrollbar]:hidden",
                ].join(" ")}
              >
                {items.map((s, idx) => (
                  <Card
                    key={`${s.href}-${idx}`}
                    ref={idx === 0 ? cardRef : undefined}
                    className={[
                      "snap-start",
                      "w-[320px] sm:w-[360px] lg:w-[380px] flex-none",
                      "overflow-hidden border border-black/10 bg-white",
                      "shadow-[0_8px_28px_rgba(0,0,0,0.08)]",
                      "transition hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(0,0,0,0.12)] py-0",
                    ].join(" ")}
                  >
                    <div className="relative w-full">
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 380px"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                      </div>

                      <div className="absolute left-4 top-4">
                        <Badge className="bg-primary text-black hover:bg-primary/90">
                          {s.tag}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-base font-semibold text-black">
                        {s.title}
                      </h3>

                      <p className="mt-2 text-sm text-black/70 line-clamp-2">
                        {s.description}
                      </p>

                      {s.bullets.length > 0 && (
                        <ul className="mt-4 space-y-2 text-sm text-black/70">
                          {s.bullets.map((b) => (
                            <li key={`${b}-${idx}`} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                              <span className="line-clamp-1">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button
                          size="lg"
                          variant="secondary"
                          className="bg-black/[0.04] text-black hover:bg-black/[0.07] border border-black/10"
                          asChild
                        >
                          <Link href={s.href}>
                            Ver servicios{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          size="lg"
                          className="bg-primary text-black hover:bg-primary/90"
                          asChild
                        >
                          <Link href="/contact">
                            Cotizar <FileText className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="mt-3 text-xs text-black/60 lg:hidden">
                Desliza hacia los lados para ver más categorías. (Auto: se pausa
                al tocar)
              </p>
            </div>
          </div>
        </ContentWidth>
      </div>
    </section>
  );
}
