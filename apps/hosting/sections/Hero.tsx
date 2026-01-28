"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  FileText,
  MapPin,
  PhoneCall,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContentWidth } from "@/components/ContentWidth";

type Props = {
  title?: React.ReactNode;
  subtitle?: string;
  videoSrc?: string;
  posterSrc?: string;
  overlayDark?: string;
  overlayLeft?: boolean;
};

export function Hero({
  title = (
    <>
      Reparación y soporte técnico{" "}
      <span className="text-primary">con garantía</span>
    </>
  ),
  subtitle = "Proyectores, laptops, celulares, redes y soluciones tecnológicas para empresas y hogares.",
  videoSrc = "/videos/hero-repair.mp4",
  posterSrc = "/images/hero-poster.webp",
  overlayDark = "bg-black/65",
  overlayLeft = true,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-background pt-20">
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
        >
          <source src="/video-hero.mp4" type="video/mp4" />
        </video>

        <div className={`absolute inset-0 ${overlayDark}`} />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15" />

        {overlayLeft ? (
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        ) : null}

        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(245,196,0,0.28) 0, transparent 45%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.10) 0, transparent 40%)",
          }}
        />
      </div>

      <ContentWidth>
        <div className="relative">
          <div className="py-12 sm:py-16 md:py-20">
            <div className="max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14, ease: "easeOut" }}
                className="mt-7 grid gap-3 sm:flex sm:flex-wrap"
              >
                <Button
                  size="lg"
                  className="w-full bg-primary text-black hover:bg-primary/90 sm:w-auto"
                  asChild
                >
                  <a
                    href="https://wa.me/51941801827"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      className="w-20 h-20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      fill="currentColor"
                    >
                      <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full bg-white/10 text-white hover:bg-white/15 sm:w-auto"
                  asChild
                >
                  <a href="/servicios">
                    Ver servicios
                    <ArrowRight className="ml-2 w-4" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 space-y-2 text-sm text-white/70 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4" />
                  <strong>Chorrillos - Lima</strong>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4" />
                  <strong>Lun–Vie 9:00 a.m. – 7:00 p.m.</strong>
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck className="w-4" />
                  <strong>Atención a empresas y hogares</strong>
                </span>
              </motion.div>

              <div className="mt-8 md:hidden">
                <Card className="border-white/10 bg-white/10 backdrop-blur-md">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-white/70 font-bold">
                          Cotización
                        </p>
                        <h3 className="mt-1 text-base font-medium text-white">
                          ¿Necesitas un precio estimado?
                        </h3>
                        <p className="mt-2 text-sm text-white/75">
                          Envíanos el modelo y una foto del problema.
                        </p>
                      </div>
                      <div className="rounded-xl bg-primary/15 p-2 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        className="w-full bg-primary text-black hover:bg-primary/90"
                        asChild
                      >
                        <a href="/contacto">
                          Solicitar cotización
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>

                    <p className="mt-3 text-xs text-white/60">
                      Con una foto del equipo avanzamos más rápido.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
            className="absolute bottom-4 md:bottom-8 right-0 hidden md:block"
          >
            <Card className="w-[360px] border-white/10 bg-white/10 backdrop-blur-md shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-white/70 font-bold">
                      Cotización
                    </p>
                    <h3 className="mt-1 text-base font-medium text-white">
                      ¿Necesitas un precio estimado?
                    </h3>
                    <p className="mt-2 text-sm text-white/75">
                      Envíanos el modelo y una foto del problema. Te respondemos
                      con una propuesta.
                    </p>
                  </div>
                  <div className="rounded-xl bg-primary/15 p-2 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  <Button
                    className="w-full bg-primary text-black hover:bg-primary/90"
                    asChild
                  >
                    <a href="/contacto">
                      Solicitar cotización
                      <ArrowRight className="ml-2 w-4" />
                    </a>
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-full bg-white/10 text-white hover:bg-white/15"
                    asChild
                  >
                    <a
                      href="https://wa.me/51941801827"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <PhoneCall className="mr-2 w-4" />
                      Hablar con un técnico
                    </a>
                  </Button>
                </div>

                <p className="mt-3 text-xs text-white/60">
                  Tip: con una foto del equipo avanzamos más rápido.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </ContentWidth>
    </section>
  );
}
