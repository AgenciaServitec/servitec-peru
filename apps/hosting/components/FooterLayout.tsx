import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import {
  BadgeCheck,
  Building2,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

/** Social SVGs (brand) */
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 256"
    width="28"
    height="28"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
    />
  </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 180"
    width="28"
    height="28"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"
    />
    <path
      fill="#000"
      opacity="0.25"
      d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"
    />
    <path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 258"
    width="28"
    height="28"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M128.6 0C58.3 0 1.1 57.2 1.1 127.5c0 22.5 5.9 44.4 17 63.7L0 257.1l67.6-17.7c18.6 10.1 39.6 15.5 60.9 15.5h.1c70.3 0 127.4-57.2 127.4-127.4c0-34-13.2-66.1-37.3-90.2C194.6 13.3 162.6 0 128.6 0z"
    />
    <path
      fill="#fff"
      d="M96.7 74.1c-2.4-5.3-4.9-5.4-7.2-5.5c-1.9-.1-4-.1-6.1-.1c-2.1 0-5.6.8-8.5 4c-2.9 3.2-11.1 10.9-11.1 26.6s11.4 30.8 13 32.9c1.6 2.1 22 35.3 54.4 48.1c26.9 10.6 32.4 8.5 38.2 8c5.8-.5 18.8-7.7 21.5-15.1c2.7-7.4 2.7-13.8 1.9-15.1c-.8-1.3-2.9-2.1-6.1-3.7c-3.2-1.6-18.8-9.3-21.8-10.4c-2.9-1.1-5-1.6-7.2 1.6c-2.1 3.2-8.2 10.4-10.1 12.5c-1.9 2.1-3.7 2.4-6.9.8c-3.2-1.6-13.4-5-25.6-15.8c-9.5-8.4-15.9-18.9-17.7-22.1c-1.9-3.2-.2-4.9 1.4-6.5c1.4-1.4 3.2-3.7 4.8-5.6c1.6-1.9 2.1-3.2 3.2-5.3c1.1-2.1.5-4-.3-5.6c-.8-1.6-7-17.3-9.8-23.6z"
    />
  </svg>
);

export const FooterLayout = () => {
  // ✅ NO invento datos: reemplaza el RUC por el real cuando lo tengas
  const razonSocial = "Servitec Perú Group E.I.R.L.";
  const ruc = "20XXXXXXXXXX";

  return (
    <footer className="mt-10 bg-[#0A0D12] border-t border-white/10">
      <ContentWidth>
        {/* Top row */}
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
                  <FacebookIcon />
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
                  <YouTubeIcon />
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
                  <WhatsAppIcon />
                </span>
                <span className="text-sm text-white/80 group-hover:text-white">
                  Escríbenos en WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        {/* Columns */}
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

        {/* Bottom */}
        <div className="py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-white/60">
              Copyright © 2026 - Todos los derechos reservados
            </p>

            {/* ✅ Razón social + RUC */}
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
