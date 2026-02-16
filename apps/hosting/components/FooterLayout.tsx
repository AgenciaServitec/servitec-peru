"use client";

import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Smartphone,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const TikTokIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const FooterLayout = () => {
  const razonSocial = "Servitec Perú Group E.I.R.L.";
  const ruc = "20604141240";

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 font-sans">
      <ContentWidth>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <Image
                src="/logo-servitec.png"
                alt="Logo de Servitec Perú"
                width={160}
                height={34}
                className="opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
              />
              <p className="text-sm leading-relaxed text-white/40 max-w-sm">
                Líderes en ingeniería de hardware y recuperación de sistemas
                críticos. Soporte técnico de alta precisión en Lima con más de
                10 años de trayectoria.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                Nuestras Redes
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    icon: <Facebook size={18} />,
                    href: "#",
                    label: "Facebook",
                  },
                  {
                    icon: <Instagram size={18} />,
                    href: "#",
                    label: "Instagram",
                  },
                  {
                    icon: <TikTokIcon size={18} />,
                    href: "#",
                    label: "TikTok",
                  },
                  { icon: <Youtube size={18} />, href: "#", label: "YouTube" },
                  {
                    icon: <Linkedin size={18} />,
                    href: "#",
                    label: "LinkedIn",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-white/5 rounded-sm text-white/30 hover:text-primary hover:border-primary/40 transition-all bg-white/[0.02]"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Servicios
            </h3>
            <ul className="space-y-3">
              {[
                "Reparación de Laptops",
                "Soporte de Servidores",
                "Cámaras de Seguridad",
                "Recuperación de Datos",
                "Mantenimiento PC",
                "Proyectores",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/servicios"
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6 border-l border-white/5 pl-0 lg:pl-8">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Centro de Soporte
            </h3>
            <ul className="space-y-5">
              <li className="flex gap-4 text-sm text-white/50">
                <MapPin size={20} className="text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-white/80">Sede Chorrillos</span>
                  <span className="text-xs">Néstor Bermúdez 113, Lima</span>
                  <a
                    href="#"
                    className="text-primary text-[10px] uppercase font-bold hover:underline flex items-center gap-1"
                  >
                    Google Maps <ArrowUpRight size={12} />
                  </a>
                </div>
              </li>
              <li className="flex gap-4 text-sm text-white/50">
                <Clock size={20} className="text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-white/80">Laboratorio</span>
                  <span className="text-xs">Lun – Vie: 9am – 7pm</span>
                </div>
              </li>
              <li className="flex gap-4 text-sm text-white/50">
                <Smartphone size={20} className="text-primary shrink-0" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white/80 font-bold">941 801 827</span>
                    <span className="text-[9px] border border-white/10 px-1 text-white/30 uppercase">
                      Principal
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/80 font-bold">972 252 744</span>
                    <span className="text-[9px] border border-white/10 px-1 text-white/30 uppercase">
                      Soporte
                    </span>
                  </div>
                </div>
              </li>
              <li className="flex gap-4 text-sm text-white/50">
                <Mail size={20} className="text-primary shrink-0" />
                <span className="text-xs truncate">
                  contactos@servitec-peru.com
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="p-5 border border-white/10 bg-white/[0.02] rounded-sm space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/80 flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" /> Datos
                Fiscales
              </h3>
              <div className="space-y-3 text-xs text-white/70">
                <div className="space-y-1">
                  <p className="text-[9px] text-white/30 uppercase tracking-widest">
                    Razón Social
                  </p>
                  <p className="font-medium leading-tight">{razonSocial}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-white/30 uppercase tracking-widest">
                    RUC
                  </p>
                  <p className="font-mono tracking-widest">{ruc}</p>
                </div>
              </div>
            </div>

            <Link
              href="/reclamaciones"
              className="group flex items-center gap-4 p-4 border border-white/10 bg-white/[0.03] rounded-sm hover:border-primary/40 transition-all"
            >
              <Image
                src="/complaints-book.jpg"
                width={40}
                height={24}
                alt="Libro de Reclamaciones"
              />
              <div className="text-left leading-tight">
                <p className="text-[10px] font-bold text-white uppercase tracking-tight">
                  Libro de Reclamaciones
                </p>
                <p className="text-[9px] text-white/30 font-normal">
                  Atención de quejas y reclamos
                </p>
              </div>
            </Link>

            <div className="space-y-3 pt-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                Métodos de Pago
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Visa", "Yape", "Plin", "Efectivo"].map((pago) => (
                  <div
                    key={pago}
                    className="px-3 py-1.5 border border-white/5 bg-white/[0.02] rounded-sm text-[9px] font-bold text-white/40 uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all cursor-default"
                  >
                    {pago}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.15em] text-white/20">
            <div className="flex flex-wrap justify-center gap-8">
              <Link
                href="/politicas-privacidad"
                className="hover:text-white transition-colors"
              >
                Políticas de Privacidad
              </Link>
              <Link
                href="/terminos-condiciones"
                className="hover:text-white transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/politica-cookies"
                className="hover:text-white transition-colors"
              >
                Política de Cookies
              </Link>
            </div>
            <p className="font-normal">
              © 2018 - 2026 Servitec Perú • Todos los derechos reservados
            </p>
          </div>
        </div>
      </ContentWidth>
    </footer>
  );
};
