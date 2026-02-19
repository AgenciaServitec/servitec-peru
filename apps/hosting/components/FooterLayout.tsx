"use client";

import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import {
  ArrowUpRight,
  Banknote,
  Clock,
  Facebook,
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

  const paymentMethods = [
    { name: "BCP", src: "/payment-methods/bcp.png", isImage: true },
    { name: "Yape", src: "/payment-methods/yape.png", isImage: true },
    { name: "Plin", src: "/payment-methods/plin.webp", isImage: true },
    {
      name: "Efectivo",
      icon: <Banknote size={30} className="text-green-900" />,
      isImage: false,
    },
  ];

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
                Expertos en reparación de hardware y recuperación de sistemas
                críticos. Soporte técnico de alta precisión en Lima con más de
                10 años de trayectoria.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[12px] font-bold text-white/30">
                Nuestras Redes
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    icon: <Facebook size={18} />,
                    href: "https://www.facebook.com/Servitec.chorrillos/",
                    label: "Facebook",
                  },
                  {
                    icon: <TikTokIcon size={18} />,
                    href: "https://www.tiktok.com/@servitec_peru_group?is_from_webapp=1&sender_device=pc",
                    label: "TikTok",
                  },
                  {
                    icon: <Youtube size={18} />,
                    href: "https://youtube.com/@servitecperugroupeirl?si=KxiXQcoBzJ9vJ6BY",
                    label: "YouTube",
                  },
                  {
                    icon: <Linkedin size={18} />,
                    href: "https://www.linkedin.com/in/servitec-per%C3%BA-group-eirl-0208ab2b3/",
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
            <h3 className="text-[11px] font-bold text-primary">Servicios</h3>
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
            <h3 className="text-[11px] font-bold text-white">
              Centro de Soporte
            </h3>
            <ul className="space-y-5">
              <li className="flex gap-4 text-sm text-white/50">
                <MapPin size={20} className="text-white shrink-0" />
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-white/80">Sede Oficina</span>
                    <span className="text-xs">Néstor Bermúdez 113, Lima</span>
                    <a
                      href="https://maps.app.goo.gl/e42NrfST8MbG67pr7"
                      target="_blank"
                      className="text-primary text-[12px] font-bold hover:underline flex items-center gap-1"
                    >
                      Google Maps <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-white/80">Sede Taller Kiwi</span>
                    <span className="text-xs">
                      Justo Pastor Davila 117, Lima
                    </span>
                    <a
                      href="https://maps.app.goo.gl/MjiQNwEjCp1mae4eA"
                      target="_blank"
                      className="text-primary text-[12px] font-bold hover:underline flex items-center gap-1"
                    >
                      Google Maps <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex gap-4 text-sm text-white/50">
                <Clock size={20} className="text-white shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-white/80">Laboratorio</span>
                  <span className="text-xs">Lun – Vie: 9am – 7pm</span>
                </div>
              </li>
              <li className="flex gap-4 text-sm text-white/50">
                <Smartphone size={20} className="text-white shrink-0" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white/80 font-bold">941 801 827</span>
                    <span className="text-[9px] border border-white/10 px-1 text-white/30">
                      Principal
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/80 font-bold">972 252 744</span>
                    <span className="text-[9px] border border-white/10 px-1 text-white/30">
                      Soporte
                    </span>
                  </div>
                </div>
              </li>
              <li className="flex gap-4 text-sm text-white/50">
                <Mail size={20} className="text-white shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:contacto@servitecperu.com"
                    target="_blank"
                    className="text-xs truncate"
                  >
                    contacto@servitecperu.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="p-5 border border-white/10 bg-white/[0.02] rounded-sm space-y-4">
              <h3 className="text-[11px] font-bold text-white/80 flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" /> Datos
                Fiscales
              </h3>
              <div className="space-y-3 text-xs text-white/70">
                <div className="space-y-1">
                  <p className="text-[9px] text-white/30">Razón Social</p>
                  <p className="font-medium leading-tight">{razonSocial}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-white/30">RUC</p>
                  <p>{ruc}</p>
                </div>
              </div>
            </div>

            <Link href="/reclamaciones" className="flex items-center gap-4">
              <Image
                src="/complaints-book.jpg"
                width={60}
                height={24}
                alt="Libro de Reclamaciones"
              />
              <div className="text-left">
                <p className="text-[12px] font-bold text-white">
                  Libro de Reclamaciones
                </p>
                <p className="text-[12px] text-white/30 font-normal">
                  Atención de quejas y reclamos
                </p>
              </div>
            </Link>

            <div className="space-y-3 pt-2">
              <h3 className="text-[12px] font-bold text-white/30">
                Método de Pago
              </h3>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((pago) => (
                  <div
                    key={pago.name}
                    className="h-8 p-2 flex items-center justify-center border border-white/5 bg-white rounded-sm"
                  >
                    {pago.isImage ? (
                      <Image
                        src={pago.src!}
                        alt={pago.name}
                        width={30}
                        height={20}
                      />
                    ) : (
                      <div className="flex items-center gap-1.5 text-white/40">
                        {pago.icon}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-[12px]">
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/politicas-privacidad">Políticas de Privacidad</Link>
              <Link href="/terminos-condiciones">Términos y Condiciones</Link>
              <Link href="/politica-cookies">Política de Cookies</Link>
              <Link href="/politica-servicio">Política de Servicio</Link>
            </div>
            <p className="text-center font-normal">
              © 2018 - 2026 Servitec Perú • Todos los derechos reservados
            </p>
          </div>
        </div>
      </ContentWidth>
    </footer>
  );
};
