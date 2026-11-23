"use client";

import { useEffect, useState } from "react";
import {
  IconBrandWhatsapp,
  IconBuildingStore,
  IconBulb,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconDeviceProjector,
  IconMaximize,
  IconPhoto,
  IconPlugConnected,
  IconSchool,
  IconShieldCheck,
  IconSun,
} from "@tabler/icons-react";

const WHATSAPP_NUMBER = "51941801827";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, estoy interesado en el *Pack de 3 Proyectores Epson PowerLite 980W* a *S/ 4,000.00 (IGV incluido)*. Quisiera consultar disponibilidad y forma de entrega."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const COUNTDOWN_STORAGE_KEY = "epson_980w_pack_offer_end";

const PRODUCT_GALLERY = [
  {
    id: "pack",
    label: "Pack ×3",
    src: "/epson-980w-projector-package.jpg",
    alt: "Pack de 3 Proyectores Epson PowerLite 980W",
  },
  {
    id: "frontal",
    label: "Vista Frontal",
    src: "/epson-980w-projector-front-view.jpg",
    alt: "Proyector Epson PowerLite 980W vista frontal",
  },
  {
    id: "puertos",
    label: "Conectividad",
    src: "/epson-980w-projector-connectivity.jpg",
    alt: "Puertos HDMI y conectividad Epson PowerLite 980W",
  },
];

const SPEC_GROUPS = [
  {
    title: "Óptica y Proyección",
    items: [
      { label: "Sistema de Proyección", value: "Epson 3LCD de 3 chips" },
      {
        label: "Método de Proyección",
        value: "Poly-silicon TFT active matrix",
      },
      { label: "Pantalla LCD", value: "0.59 pulgadas (D9)" },
      { label: "Luminosidad en Color y Blanco", value: "3,800 Lúmenes" },
      { label: "Resolución Nativa", value: "WXGA (1280 × 800 px) · 16:10" },
      { label: "Número de Píxeles", value: "1,024,000 px (1280 × 800) × 3" },
      { label: "Relación de Contraste", value: "Hasta 15,000:1" },
      {
        label: "Reproducción de Color",
        value: "10 bit · Hasta 1 billón de colores",
      },
    ],
  },
  {
    title: "Lámpara y Pantalla",
    items: [
      { label: "Tipo de Lámpara", value: "210W UHE E-TORL" },
      { label: "Vida Útil (Normal / ECO)", value: "6,000 hrs / 12,000 hrs" },
      {
        label: "Tamaño Proyectado",
        value: '29" – 280" (0.74 – 7.11 m) / hasta 300"',
      },
      {
        label: "Relación de Proyección",
        value: "1.38 (Zoom: Wide) – 2.24 (Zoom: Tele)",
      },
      {
        label: "Corrección de Trapecio",
        value: "Vertical ±30° / Horizontal ±30°",
      },
      {
        label: "Método de Visualización",
        value: "Frontal / Posterior / Techo",
      },
    ],
  },
  {
    title: "Conectividad, Energía y Físico",
    items: [
      {
        label: "Entradas Digitales",
        value: "2× HDMI (compatible con MHL 1080p)",
      },
      { label: "USB Plug 'n Play", value: "Compatible con PC y Mac®" },
      {
        label: "App Epson iProjection",
        value: "Hasta 50 disp. / 4 simultáneos (módulo LAN opcional)",
      },
      {
        label: "Dimensiones y Peso",
        value: "309 × 90 × 282 mm · 3.1 kg (por unidad)",
      },
      { label: "Seguridad", value: "Kensington Lock y traba de seguridad" },
      {
        label: "Voltaje y Consumo",
        value: "100–240V AC · 309W Norm / 227W Eco (220V)",
      },
    ],
  },
];

function formatTwoDigits(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

export default function PackEpson980wLanding() {
  const [activeImg, setActiveImg] = useState(0);
  const [openGroup, setOpenGroup] = useState<number | null>(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const now = Date.now();
    let endTime = now + SEVEN_DAYS_MS;

    try {
      const saved = window.localStorage.getItem(COUNTDOWN_STORAGE_KEY);
      if (saved && Number(saved) > now) {
        endTime = Number(saved);
      } else {
        window.localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(endTime));
      }
    } catch {}

    const updateTimer = () => {
      const diff = Math.max(0, endTime - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#07090D] text-white flex justify-center selection:bg-[#FFB800] selection:text-zinc-950">
      <main className="w-full max-w-120 min-h-screen bg-[#0D1017] border-x border-zinc-800 pb-28 relative overflow-x-hidden">
        <header className="sticky top-0 z-30 bg-[#0D1017]/95 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase text-white">
            Promoción Especial · Pack ×3
          </span>
          <span className="text-xs font-mono text-amber-400">
            Cód. V11H866020
          </span>
        </header>

        <section className="px-4 pt-5 pb-6 bg-[#0D1017]">
          <div className="mb-4 rounded-xl bg-[#FFB800] border-2 border-[#07090D] p-3.5 text-center shadow-[0_4px_0_#07090D] transition-transform duration-200 hover:-translate-y-0.5">
            <p className="text-3xl sm:text-[34px] font-bold uppercase leading-none text-[#07090D]">
              PACK 3 EQUIPOS
            </p>
            <div className="mt-2 bg-[#07090D] text-[#FFB800] text-xs font-semibold py-1.5 px-3 rounded">
              Lleva 3 proyectores Epson a precio de distribuidor
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#FFB800] text-xs font-semibold mb-1.5">
            <IconSchool className="w-4 h-4 shrink-0" />
            <span>Ideal para aulas educativas y auditorios</span>
          </div>

          <h1 className="text-2xl font-bold leading-snug text-white">
            Proyector Epson PowerLite 980W
          </h1>
          <p className="mt-1 text-sm text-zinc-200 leading-relaxed">
            Tecnología 3LCD WXGA · 3,800 lúmenes de brillo en color y blanco.
          </p>

          <div className="mt-5 rounded-2xl bg-[#131822] border-2 border-[#FFB800]/80 p-2.5 shadow-[0_0_28px_rgba(255,184,0,0.28)] transition-all duration-300 hover:border-[#FFB800] hover:shadow-[0_0_36px_rgba(255,184,0,0.42)]">
            <div className="aspect-video w-full rounded-xl bg-[#1A1512] overflow-hidden relative group">
              {PRODUCT_GALLERY[activeImg].src ? (
                <img
                  src={PRODUCT_GALLERY[activeImg].src}
                  alt={PRODUCT_GALLERY[activeImg].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
                  <IconPhoto className="w-9 h-9 text-zinc-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-zinc-300">
                    Espacio para imagen: {PRODUCT_GALLERY[activeImg].label}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Coloca la ruta en PRODUCT_GALLERY[{activeImg}].src
                  </p>
                </div>
              )}
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {PRODUCT_GALLERY.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveImg(idx)}
                  className={`py-2 px-2 rounded-lg text-xs font-bold transition-all duration-200 border cursor-pointer ${
                    activeImg === idx
                      ? "bg-[#FFB800] border-[#FFB800] text-zinc-950 shadow-[0_0_16px_rgba(255,184,0,0.65)] scale-[1.02]"
                      : "bg-[#0D1017] border-zinc-700/80 text-zinc-200 hover:border-[#FFB800]/70 hover:text-[#FFB800] hover:bg-[#181E2B]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#131822] border-2 border-[#FFB800] p-4 shadow-[0_0_24px_rgba(255,184,0,0.12)] transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,184,0,0.22)]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200">
                Precio total por las 3 unidades
              </span>
              <span className="font-bold text-[#00E676]">IGV incluido</span>
            </div>

            <div className="mt-2 flex items-baseline">
              <span className="text-3xl sm:text-4xl font-bold text-white">
                S/ 4,000.00
              </span>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-3.5 px-4 rounded-lg bg-[#00E676] hover:bg-[#00C853] active:scale-[0.99] text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,230,118,0.35)] hover:shadow-[0_0_28px_rgba(0,230,118,0.55)] transition-all duration-200"
            >
              <IconBrandWhatsapp className="w-5 h-5 stroke-[2.2]" />
              <span>Solicitar Pack por WhatsApp</span>
            </a>

            <div className="mt-3.5 pt-3 border-t border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-200">
                <span className="flex items-center gap-1.5">
                  <IconShieldCheck className="w-4 h-4 text-[#FFB800] shrink-0" />
                  Equipos nuevos sellados
                </span>
                <span className="flex items-center gap-1.5">
                  <IconCheck className="w-4 h-4 text-[#00E676] shrink-0" />
                  Factura o Boleta
                </span>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 pt-1">
                <IconBuildingStore className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Servitec Perú Group E.I.R.L. · RUC 20604141240</span>
              </div>
            </div>
          </div>

          <div className="mt-3.5 rounded-xl bg-[#131822] border border-zinc-800 p-3.5">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-300 mb-2.5">
              <IconClock className="w-4 h-4 text-[#FFB800] shrink-0" />
              <span>Vigencia de la oferta: 7 días</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="rounded-lg bg-[#0D1017] border border-zinc-800 py-2 px-1">
                <div className="text-2xl sm:text-[26px] font-bold text-[#FFB800] leading-none tabular-nums">
                  {formatTwoDigits(timeLeft.days)}
                </div>
                <div className="text-[11px] font-medium text-zinc-400 mt-1">
                  Días
                </div>
              </div>

              <div className="rounded-lg bg-[#0D1017] border border-zinc-800 py-2 px-1">
                <div className="text-2xl sm:text-[26px] font-bold text-white leading-none tabular-nums">
                  {formatTwoDigits(timeLeft.hours)}
                </div>
                <div className="text-[11px] font-medium text-zinc-400 mt-1">
                  Horas
                </div>
              </div>

              <div className="rounded-lg bg-[#0D1017] border border-zinc-800 py-2 px-1">
                <div className="text-2xl sm:text-[26px] font-bold text-white leading-none tabular-nums">
                  {formatTwoDigits(timeLeft.minutes)}
                </div>
                <div className="text-[11px] font-medium text-zinc-400 mt-1">
                  Min
                </div>
              </div>

              <div className="rounded-lg bg-[#0D1017] border border-zinc-800 py-2 px-1">
                <div className="text-2xl sm:text-[26px] font-bold text-[#00E676] leading-none tabular-nums">
                  {formatTwoDigits(timeLeft.seconds)}
                </div>
                <div className="text-[11px] font-medium text-zinc-400 mt-1">
                  Seg
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-2">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3.5 rounded-xl bg-[#131822] border border-zinc-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FFB800]/70 hover:bg-[#171D29]">
              <IconSun className="w-5 h-5 text-[#FFB800] mb-1.5" />
              <div className="text-base font-bold text-white leading-tight">
                3,800 lúmenes
              </div>
              <div className="text-xs text-zinc-300 mt-1 leading-snug">
                Brillo en color y blanco para aulas iluminadas
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#131822] border border-zinc-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400/70 hover:bg-[#171D29]">
              <IconDeviceProjector className="w-5 h-5 text-sky-400 mb-1.5" />
              <div className="text-base font-bold text-white leading-tight">
                WXGA 3LCD
              </div>
              <div className="text-xs text-zinc-300 mt-1 leading-snug">
                1280 × 800 px · Colores 3× más brillantes
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#131822] border border-zinc-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00E676]/70 hover:bg-[#171D29]">
              <IconBulb className="w-5 h-5 text-[#00E676] mb-1.5" />
              <div className="text-base font-bold text-white leading-tight">
                12,000 horas
              </div>
              <div className="text-xs text-zinc-300 mt-1 leading-snug">
                Lámpara E-TORL (Modo ECO) / 6,000h Normal
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#131822] border border-zinc-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FFB800]/70 hover:bg-[#171D29]">
              <IconMaximize className="w-5 h-5 text-[#FFB800] mb-1.5" />
              <div className="text-base font-bold text-white leading-tight">
                Hasta 300&quot;
              </div>
              <div className="text-xs text-zinc-300 mt-1 leading-snug">
                Pantalla dividida en 2 señales simultáneas
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-5">
          <h2 className="text-base font-bold text-white mb-3">
            ¿Por qué elegir el Epson PowerLite 980W?
          </h2>

          <div className="space-y-2.5 text-sm">
            <div className="p-3.5 rounded-xl bg-[#131822] border border-zinc-800 transition-all duration-200 hover:border-zinc-600 hover:bg-[#171D29]">
              <h3 className="font-semibold text-white">
                Tecnología 3LCD de 3 chips
              </h3>
              <p className="text-xs text-zinc-200 mt-1 leading-relaxed">
                Imágenes claras, nítidas y sin efecto arcoíris, manteniendo{" "}
                <strong className="font-semibold text-[#FFB800]">
                  3,800 lúmenes tanto en color como en blanco
                </strong>{" "}
                incluso en ambientes con luz natural o artificial encendida.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#131822] border border-zinc-800 transition-all duration-200 hover:border-zinc-600 hover:bg-[#171D29]">
              <h3 className="font-semibold text-white flex items-center gap-1.5">
                <IconPlugConnected className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Conectividad HDMI / MHL e iProjection</span>
              </h3>
              <p className="text-xs text-zinc-200 mt-1 leading-relaxed">
                Incorpora{" "}
                <strong className="font-semibold text-sky-400">
                  2 puertos HDMI
                </strong>{" "}
                (con soporte MHL para replicar video 1080p desde móviles).
                Compatible con la app{" "}
                <strong className="font-semibold text-white">
                  Epson iProjection
                </strong>{" "}
                para conectar hasta 50 dispositivos y mostrar 4 pantallas en
                simultáneo{" "}
                <span className="text-zinc-400">
                  (requiere módulo LAN inalámbrico opcional, no incluido)
                </span>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white">
              Especificaciones Técnicas
            </h2>
            <span className="text-xs text-zinc-300">Por unidad</span>
          </div>

          <div className="space-y-2">
            {SPEC_GROUPS.map((group, idx) => {
              const isOpen = openGroup === idx;
              return (
                <div
                  key={group.title}
                  className={`rounded-xl bg-[#131822] border transition-colors duration-200 overflow-hidden ${
                    isOpen
                      ? "border-[#FFB800]/60"
                      : "border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenGroup(isOpen ? null : idx)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold uppercase text-white hover:bg-[#1A2130] transition-colors cursor-pointer"
                  >
                    <span>{group.title}</span>
                    <IconChevronDown
                      className={`w-4 h-4 text-[#FFB800] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-3 divide-y divide-zinc-800 border-t border-zinc-800">
                      {group.items.map((spec) => (
                        <div
                          key={spec.label}
                          className="py-2.5 px-1.5 -mx-1.5 rounded flex justify-between items-start gap-4 text-xs transition-colors hover:bg-zinc-800/40"
                        >
                          <span className="text-zinc-300 shrink-0 max-w-[45%]">
                            {spec.label}
                          </span>
                          <span className="text-white font-medium text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <footer className="mt-8 px-4 pt-5 pb-4 border-t border-zinc-800 text-center text-xs text-zinc-300 space-y-1.5">
          <p className="text-white font-semibold">
            Servitec Perú Group E.I.R.L. · RUC 20604141240
          </p>
          <p className="text-zinc-300 font-medium">
            Pack promocional de 3 unidades · Epson PowerLite 980W (V11H866020)
          </p>
          <p className="text-zinc-400">
            Precio expresado en Soles (S/) incluido IGV. Sujeto a disponibilidad
            de stock.
          </p>
        </footer>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 bg-[#0D1017]/95 backdrop-blur-md border-t border-zinc-800 px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium text-zinc-300">
              Pack 3× Epson 980W
            </p>
            <p className="text-lg font-bold text-white leading-tight">
              S/ 4,000.00{" "}
              <span className="text-xs font-semibold text-[#00E676]">
                inc. IGV
              </span>
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-[#00E676] hover:bg-[#00C853] active:scale-[0.98] text-zinc-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_16px_rgba(0,230,118,0.3)] hover:shadow-[0_0_24px_rgba(0,230,118,0.5)] transition-all duration-200 shrink-0"
          >
            <IconBrandWhatsapp className="w-5 h-5 stroke-[2.2]" />
            <span>Cotizar ahora</span>
          </a>
        </div>
      </main>
    </div>
  );
}
