"use client";

import { ChevronRight, Cookie } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";

export default function PoliticaCookies() {
  const lastUpdate = "2026-01-21";

  const secciones = [
    { id: "definicion", label: "¿Qué son las cookies?" },
    { id: "tipos", label: "Tipos de cookies que usamos" },
    { id: "finalidad", label: "Finalidad de las cookies" },
    { id: "gestion", label: "Cómo gestionar las cookies" },
  ];

  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-20 font-sans text-white/90">
      <ContentWidth>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4 border-b border-white/5 pb-12">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Política de Cookies
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg max-w-2xl">
              Explicamos cómo utilizamos las cookies para mejorar tu experiencia
              de navegación y el rendimiento de nuestro sitio web.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 items-start">
            <aside className="sticky top-32 space-y-6">
              <div className="bg-[#111111] border border-white/10 rounded-md p-8 space-y-8">
                <div>
                  <h3 className="text-white font-semibold text-xl mb-1">
                    Navegación
                  </h3>
                  <p className="text-[11px] text-white/30 font-mono uppercase tracking-[0.2em]">
                    Actualizado: {lastUpdate}
                  </p>
                </div>

                <nav className="flex flex-col gap-4">
                  {secciones.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="group flex items-center justify-between text-white/50 hover:text-primary transition-colors text-sm font-medium"
                    >
                      {item.label}
                      <ChevronRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-primary"
                      />
                    </a>
                  ))}
                </nav>

                <div className="pt-6 border-t border-white/5 space-y-6">
                  <p className="text-xs text-white/40 leading-relaxed">
                    Las cookies nos ayudan a ofrecerte un servicio más rápido y
                    personalizado.
                  </p>
                  <button className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-md w-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02]">
                    <Cookie size={18} />
                    Aceptar Cookies
                  </button>
                </div>
              </div>
            </aside>

            <div className="space-y-6 text-white/70">
              <section
                id="definicion"
                className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  ¿Qué son las cookies?
                </h2>
                <p className="text-sm md:text-base leading-relaxed">
                  Las cookies son pequeños archivos de texto que los sitios web
                  envían al navegador y que se almacenan en el terminal del
                  usuario (computadora o dispositivo móvil). Estos archivos
                  permiten que el sitio recuerde información sobre tu visita, lo
                  que puede facilitar tu próxima visita y hacer que el sitio te
                  resulte más útil.
                </p>
              </section>

              <section
                id="tipos"
                className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Tipos de cookies que usamos
                </h2>
                <div className="text-sm md:text-base leading-relaxed space-y-4">
                  <p>
                    <span className="text-white font-medium">
                      Cookies Técnicas:
                    </span>{" "}
                    Son esenciales para que puedas navegar por la web y usar sus
                    funciones, como el acceso a áreas seguras o el
                    funcionamiento del chat de WhatsApp.
                  </p>
                  <p>
                    <span className="text-white font-medium">
                      Cookies de Análisis:
                    </span>{" "}
                    Nos permiten cuantificar el número de usuarios y realizar la
                    medición y análisis estadístico del uso que hacen los
                    usuarios de nuestra web para mejorar nuestros servicios.
                  </p>
                </div>
              </section>

              <section
                id="finalidad"
                className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Finalidad de las cookies
                </h2>
                <p className="text-sm md:text-base leading-relaxed">
                  Utilizamos esta información exclusivamente para fines
                  estadísticos y para mejorar la experiencia técnica del
                  usuario. En ningún caso las cookies que utilizamos recogen
                  datos personales sensibles que puedan identificarte
                  directamente sin tu consentimiento previo.
                </p>
              </section>

              <section
                id="gestion"
                className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Cómo gestionar las cookies
                </h2>
                <p className="text-sm md:text-base leading-relaxed">
                  Puedes permitir, bloquear o eliminar las cookies instaladas en
                  tu equipo mediante la configuración de las opciones del
                  navegador instalado en tu computadora o dispositivo móvil. Ten
                  en cuenta que, si bloqueas todas las cookies, es posible que
                  algunas funciones de la web de{" "}
                  <span className="text-white font-medium">SERVITEC PERU</span>{" "}
                  no estén disponibles.
                </p>
              </section>
            </div>
          </div>
        </div>
      </ContentWidth>
    </main>
  );
}