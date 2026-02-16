"use client";

import { ChevronRight, ShieldCheck } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";

export default function TerminosCondiciones() {
  const lastUpdate = "2026-01-21";
  const empresa = "SERVITEC PERU";

  const secciones = [
    { id: "general", label: "Condiciones Generales" },
    { id: "servicios", label: "Servicios y Reparaciones" },
    { id: "garantia", label: "Políticas de Garantía" },
    { id: "responsabilidad", label: "Limitación de Responsabilidad" },
    { id: "propiedad", label: "Propiedad Intelectual" },
  ];

  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-20 font-sans text-white/90">
      <ContentWidth>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4 border-b border-white/5 pb-12">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Términos y Condiciones
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg max-w-2xl">
              Reglas y lineamientos legales para el uso de nuestro sitio web y
              la prestación de nuestros servicios técnicos.
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
                    Al utilizar nuestros servicios, usted acepta estos términos
                    de manera integral.
                  </p>
                  <a
                    href="https://wa.me/51941801827"
                    target="_blank"
                    className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-md w-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                  >
                    <ShieldCheck size={18} />
                    Consultar Términos
                  </a>
                </div>
              </div>
            </aside>

            <div className="space-y-6 text-white/70">
              <section
                id="general"
                className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Condiciones Generales
                </h2>
                <p className="text-sm md:text-base leading-relaxed">
                  El acceso y uso de este sitio web propiedad de{" "}
                  <span className="text-white font-medium">{empresa}</span> se
                  rige por los términos descritos aquí. Cualquier persona que
                  realice una transacción o utilice el sitio web declara conocer
                  y aceptar estos términos y condiciones.
                </p>
              </section>

              <section
                id="servicios"
                className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Servicios y Reparaciones
                </h2>
                <div className="text-sm md:text-base leading-relaxed space-y-4">
                  <p>
                    <span className="text-white font-medium">{empresa}</span>{" "}
                    ofrece servicios de reparación de laptops, proyectores y
                    soporte técnico. Todo servicio está sujeto a una evaluación
                    previa (diagnóstico).
                  </p>
                  <p>
                    Los presupuestos brindados tienen una validez temporal. El
                    cliente es responsable de respaldar su información antes de
                    entregar cualquier equipo para servicio técnico.
                  </p>
                </div>
              </section>

              <section
                id="garantia"
                className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Políticas de Garantía
                </h2>
                <p className="text-sm md:text-base leading-relaxed">
                  Todos nuestros servicios de reparación cuentan con un periodo
                  de garantía específico que será indicado en su comprobante o
                  guía de servicio. La garantía cubre defectos de mano de obra y
                  repuestos instalados por nosotros, pero queda anulada por
                  golpes, humedad o manipulación de terceros.
                </p>
              </section>

              <section
                id="responsabilidad"
                className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Limitación de Responsabilidad
                </h2>
                <p className="text-sm md:text-base leading-relaxed">
                  <span className="text-white font-medium">{empresa}</span> no
                  se hace responsable por la pérdida de datos o software no
                  original instalado en los equipos. Es responsabilidad del
                  cliente asegurar la legalidad y respaldo de su información.
                </p>
              </section>

              <section
                id="propiedad"
                className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Propiedad Intelectual
                </h2>
                <p className="text-sm md:text-base leading-relaxed">
                  El contenido, logos, gráficos y textos de este sitio son
                  propiedad de{" "}
                  <span className="text-white font-medium">{empresa}</span>.
                  Queda prohibida su reproducción total o parcial sin
                  autorización expresa.
                </p>
              </section>
            </div>
          </div>
        </div>
      </ContentWidth>
    </main>
  );
}