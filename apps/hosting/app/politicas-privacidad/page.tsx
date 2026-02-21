"use client";

import { ChevronRight } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";
import { Button } from "@/components/ui/button";
import * as React from "react";

export default function PoliticasPrivacidad() {
  const lastUpdate = "2026-01-21";
  const empresa = "SERVITEC PERU";

  const secciones = [
    { id: "introduccion", label: "Introducción" },
    { id: "recopilacion", label: "Recopilación" },
    { id: "uso", label: "Uso" },
    { id: "cookies", label: "Cookies" },
    { id: "terceros", label: "Terceros" },
    { id: "control", label: "Control" },
  ];

  return (
    <div className="bg-[#050505] min-h-screen pt-24 lg:pt-32 pb-20 font-sans text-white/90">
      <ContentWidth>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4 border-b border-white/5 pb-12">
            <h1 className="text-3xl font-semibold text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Política de Privacidad
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg max-w-2xl">
              Aquí explicamos qué datos recopilamos, por qué los usamos y cómo
              puedes ejercer control sobre tu información.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 items-start">
            <aside className="sticky top-[70px] lg:top-32 z-20 -mx-4 px-4 lg:mx-0 lg:px-0">
              <div className="bg-[#111111]/90 backdrop-blur-md lg:backdrop-blur-none border-b lg:border border-white/10 lg:rounded-md p-4 lg:p-8">
                <div className="hidden lg:block mb-8">
                  <h3 className="text-white font-semibold text-xl mb-1">
                    Contenido
                  </h3>
                  <p className="text-[11px] text-white/30">
                    Actualizado: {lastUpdate}
                  </p>
                </div>

                <nav className="flex flex-row lg:flex-col gap-3 pb-1 overflow-x-auto lg:overflow-x-visible no-scrollbar">
                  {secciones.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="group flex items-center justify-between text-white/50 hover:text-primary transition-colors text-xs lg:text-sm font-medium whitespace-nowrap lg:whitespace-normal border border-white/10 lg:border-none px-4 py-2 lg:px-0 lg:py-0 rounded-sm lg:rounded-none bg-white/5 lg:bg-transparent"
                    >
                      {item.label}
                      <ChevronRight
                        size={14}
                        className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity text-primary"
                      />
                    </a>
                  ))}
                </nav>

                <div className="hidden lg:block pt-8 mt-8 border-t border-white/5 space-y-6">
                  <p className="text-xs text-white/40 leading-relaxed">
                    Si tienes dudas, contáctanos por WhatsApp o desde la página
                    de contacto.
                  </p>

                  <Button size="lg" className="btn-primary w-full" asChild>
                    <a href="https://wa.me/51941801827" target="_blank">
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.7 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                          />
                        </svg>
                        Ir a Contacto
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            </aside>

            <div className="space-y-6 text-white/70">
              {secciones.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6 scroll-mt-36 lg:scroll-mt-40"
                >
                  <h2 className="text-2xl font-semibold text-white">
                    {sec.label}
                  </h2>
                  <div className="text-sm md:text-base leading-relaxed space-y-4">
                    {sec.id === "introduccion" && (
                      <>
                        <p>
                          La presenta Política de Privacidad establece los
                          términos en que{" "}
                          <span className="text-white font-medium">
                            {empresa}
                          </span>{" "}
                          usa y protege la información proporcionada por sus
                          usuarios al utilizar este sitio web.
                        </p>
                        <p>
                          Estamos comprometidos con la seguridad de los datos
                          personales bajo el marco de la{" "}
                          <span className="text-white font-medium">
                            Ley N° 29733 (Ley de Protección de Datos Personales
                            en Perú)
                          </span>
                          , operando formalmente como{" "}
                          <span className="text-white font-medium">
                            SERVITEC PERÚ GROUP E.I.R.L. (RUC 20604141240)
                          </span>
                          . Para consultas legales, puede contactarnos al
                          correo:{" "}
                          <a
                            href="mailto:contacto@servitecperu.com"
                            className="text-white font-medium"
                          >
                            contacto@servitecperu.com
                          </a>
                          .
                        </p>
                      </>
                    )}
                    {sec.id === "recopilacion" && (
                      <p>
                        Nuestro sitio web puede recopilar información personal
                        como:{" "}
                        <span className="text-white font-medium">
                          nombre, datos de contacto e información demográfica
                        </span>
                        . Estos datos son esenciales para el diagnóstico y
                        soporte técnico especializado.
                      </p>
                    )}
                    {sec.id === "uso" && (
                      <p>
                        Usamos la información para brindar el mejor servicio
                        posible: responder consultas técnicas, mantener
                        registros de servicios y mejorar nuestra atención
                        especializada en Lima.
                      </p>
                    )}
                    {sec.id === "cookies" && (
                      <p>
                        Este sitio utiliza cookies para analizar el tráfico y
                        mejorar su experiencia. Usted puede desactivarlas desde
                        su navegador sin afectar la funcionalidad básica del
                        sitio.
                      </p>
                    )}
                    {sec.id === "terceros" && (
                      <p>
                        Podemos contener enlaces a otros sitios de interés.{" "}
                        <span className="text-white font-medium">
                          {empresa}
                        </span>{" "}
                        no tiene control sobre las políticas de privacidad de
                        terceros una vez que usted abandona nuestro dominio.
                      </p>
                    )}
                    {sec.id === "control" && (
                      <p>
                        Usted puede restringir el uso de su información en
                        cualquier momento. No vendemos ni cedemos sus datos a
                        terceros, garantizando la privacidad absoluta de su
                        información técnica.
                      </p>
                    )}
                  </div>
                </section>
              ))}

              <div className="lg:hidden pt-4">
                <Button size="lg" className="btn-primary w-full" asChild>
                  <a href="https://wa.me/51941801827" target="_blank">
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.7 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                        />
                      </svg>
                      Ir a Contacto
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ContentWidth>

      <style jsx>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}
