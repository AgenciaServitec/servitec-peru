"use client";

import { ChevronRight, MessageCircle } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";

export default function PoliticaServicio() {
  const lastUpdate = "2026-02-17";
  const empresa = "SERVITEC PERU GROUP";

  const secciones = [
    {
      id: "inclusion",
      label: "Inclusión del Servicio",
    },
    {
      id: "exclusion",
      label: "Exclusiones",
    },
    {
      id: "garantia",
      label: "Condiciones de Garantía",
    },
    {
      id: "responsabilidad",
      label: "Responsabilidad del Cliente",
    },
    {
      id: "limitaciones",
      label: "Limitaciones Técnicas",
    },
  ];

  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-20 font-sans text-white/90">
      <ContentWidth>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4 border-b border-white/5 pb-12">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Política de Servicio
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg max-w-2xl">
              Lineamientos técnicos, alcances y condiciones de garantía para
              asegurar la transparencia en cada reparación y soporte.
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
                    Cualquier duda adicional sobre nuestros términos puede ser
                    consultada vía WhatsApp.
                  </p>

                  <a
                    href="https://wa.me/51941801827"
                    target="_blank"
                    className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-md w-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle size={18} />
                    Consultar Soporte
                  </a>
                </div>
              </div>
            </aside>

            {/* Contenido de Secciones */}
            <div className="space-y-6 text-white/70">
              {secciones.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-white tracking-tight">
                      {sec.label}
                    </h2>
                  </div>

                  <div className="text-sm md:text-base leading-relaxed space-y-4">
                    {sec.id === "inclusion" && (
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Diagnóstico técnico especializado inicial.</li>
                        <li>
                          Mano de obra calificada para reparación de hardware y
                          optimización de software.
                        </li>
                        <li>
                          Pruebas de estrés y control de calidad
                          post-reparación.
                        </li>
                        <li>
                          Garantía por el servicio específico realizado y
                          repuestos suministrados por{" "}
                          <span className="text-white font-medium">
                            {empresa}
                          </span>
                          .
                        </li>
                      </ul>
                    )}

                    {sec.id === "exclusion" && (
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Repuestos o componentes proporcionados por el cliente
                          (no cuentan con garantía institucional).
                        </li>
                        <li>
                          Problemas derivados de software pirata o malware
                          instalado tras la entrega.
                        </li>
                        <li>
                          Daños accidentales (caídas, derrame de líquidos)
                          ocurridos después del servicio.
                        </li>
                        <li>
                          Intervenciones técnicas realizadas por terceros ajenos
                          a{" "}
                          <span className="text-white font-medium">
                            {empresa}
                          </span>
                          .
                        </li>
                      </ul>
                    )}

                    {sec.id === "garantia" && (
                      <div className="space-y-4">
                        <p>
                          La garantía estándar es de{" "}
                          <span className="text-primary font-bold">
                            90 días
                          </span>{" "}
                          para reparaciones de hardware, salvo se especifique lo
                          contrario en la orden de servicio.
                        </p>
                        <p>
                          Para hacerla efectiva, el equipo debe conservar los
                          sellos de seguridad intactos y presentar la nota de
                          servicio o factura correspondiente.
                        </p>
                      </div>
                    )}

                    {sec.id === "responsabilidad" && (
                      <div>
                        <p>Importante:</p>
                        <p>
                          El cliente es responsable único de realizar una copia
                          de seguridad (Backup) de su información antes de
                          entregar el equipo.{" "}
                          <span className="text-white font-medium">
                            {empresa}
                          </span>{" "}
                          no se hace responsable por la pérdida de datos durante
                          procesos de reparación electrónica o formateo.
                        </p>
                      </div>
                    )}

                    {sec.id === "limitaciones" && (
                      <p>
                        Debido a la naturaleza de la microelectrónica, algunos
                        equipos con daños severos en placa base pueden no ser
                        reparables. En tales casos, se informará al cliente tras
                        el diagnóstico inicial y se procederá con la devolución
                        del equipo bajo las condiciones pactadas.
                      </p>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </ContentWidth>
    </main>
  );
}
