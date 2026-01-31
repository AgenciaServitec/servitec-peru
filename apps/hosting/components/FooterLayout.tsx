import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import {
  BadgeCheck,
  Building2,
  Clock,
  Facebook,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

export const FooterLayout = () => {
  const razonSocial = "Servitec Perú Group E.I.R.L.";
  const ruc = "20604141240";

  return (
    <footer className="bg-[#0A0D12] border-t border-white/10">
      <ContentWidth>
        <div className="py-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-center lg:justify-start">
            <Image
              src="/logo-servitec.png"
              alt="Logo de Servitec Perú"
              width={180}
              height={38}
              priority
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-base sm:text-lg font-semibold text-white text-center">
              Conéctate Socialmente con Servitec
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-8">
              <a
                href="https://www.facebook.com/Servitec.chorrillos/?locale=es_LA"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.05] transition"
              >
                <span className="text-white/90 group-hover:text-white">
                  <Facebook />
                </span>
                <span className="text-sm text-white/80 group-hover:text-white">
                  Visítanos en Facebook
                </span>
              </a>

              <a
                href="https://www.youtube.com/channel/UC0fs7G_IrQ9nBPOpKsaDTJg"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.05] transition"
              >
                <span className="text-white/90 group-hover:text-white">
                  <Youtube />
                </span>
                <span className="text-sm text-white/80 group-hover:text-white">
                  Visítanos en YouTube
                </span>
              </a>

              <a
                href="https://wa.me/51941801827"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.05] transition"
              >
                <span className="text-white/90 group-hover:text-white">
                  <Facebook />
                </span>
                <span className="text-sm text-white/80 group-hover:text-white">
                  Escríbenos en WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="py-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-white font-semibold text-base mb-3">
              Sobre nosotros
            </h3>
            <p className="text-sm leading-relaxed text-white/70">
              Somos una empresa que brinda servicios informáticos de forma
              integral en la asesoría y consultoría en hardware y software,
              tanto para usuarios domésticos, negocios y empresas corporativas.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-3">
              Horario de atención
            </h3>
            <div className="flex items-start gap-2 text-sm text-white/70">
              <Clock className="mt-0.5 h-4 w-4 text-primary" />
              <span>9:00 am a 6:00 pm</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-3">
              Dirección
            </h3>
            <div className="flex items-start gap-2 text-sm text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <span>Néstor Bermúdez 113, Chorrillos, Lima, Perú</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-3">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>941 801 827</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>972 252 744</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contactos@servitec-peru.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-white/60">
              Copyright © 2026 - Todos los derechos reservados
            </p>

            <div className="flex flex-col gap-2 text-sm text-white/60 sm:flex-row sm:items-center sm:gap-6">
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span>Razón social: {razonSocial}</span>
              </span>

              <span className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" />
                <span>RUC: {ruc}</span>
              </span>
            </div>
          </div>

          <a
            href="https://drive.google.com/file/d/1zEqBvWZsx0zsnixUNf1Ag_xrlqOfGIK4/view?pli=1"
            className="text-sm text-white/60 hover:text-white transition"
          >
            Terminos y condiciones
          </a>
        </div>
      </ContentWidth>
    </footer>
  );
};
