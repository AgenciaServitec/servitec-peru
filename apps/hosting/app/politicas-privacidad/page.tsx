"use client";

import { ChevronRight, MessageCircle } from "lucide-react";
import { ContentWidth } from "@/components/ContentWidth";

export default function PoliticasPrivacidad() {
  const lastUpdate = "2026-01-21";
  const empresa = "SERVITEC PERU";

  const secciones = [
    { id: "introduccion", label: "Introducción" },
    { id: "recopilacion", label: "Información que se recopila" },
    { id: "uso", label: "Uso de la información" },
    { id: "cookies", label: "Cookies" },
    { id: "terceros", label: "Enlaces a terceros" },
    { id: "control", label: "Control de su información" },
  ];

  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-20 font-sans text-white/90">
      <ContentWidth>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4 border-b border-white/5 pb-12">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Política de Privacidad
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg max-w-2xl">
              Aquí explicamos qué datos recopilamos, por qué los usamos y cómo
              puedes ejercer control sobre tu información.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 items-start">
            <aside className="sticky top-32 space-y-6">
              <div className="bg-[#111111] border border-white/10 rounded-md p-8 space-y-8">
                <div>
                  <h3 className="text-white font-semibold text-xl mb-1">
                    Contenido
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
                    Si tienes dudas, contáctanos por WhatsApp o desde la página
                    de contacto.
                  </p>

                  <a
                    href="https://wa.me/51941801827"
                    target="_blank"
                    className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-md w-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle size={18} />
                    Ir a Contacto
                  </a>
                </div>
              </div>
            </aside>

            <div className="space-y-6 text-white/70">
              {secciones.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="bg-[#111111] border border-white/10 rounded-md p-8 md:p-10 space-y-6"
                >
                  <h2 className="text-2xl font-semibold text-white tracking-tight">
                    {sec.label}
                  </h2>
                  <div className="text-sm md:text-base leading-relaxed space-y-4">
                    {sec.id === "introduccion" && (
                      <p>
                        La presenta Política de Privacidad establece los
                        términos en que{" "}
                        <span className="text-white font-medium">
                          {empresa}
                        </span>{" "}
                        usa y protege la información proporcionada por sus
                        usuarios al utilizar este sitio web. Estamos
                        comprometidos con la seguridad de los datos.
                      </p>
                    )}
                    {sec.id === "recopilacion" && (
                      <p>
                        Nuestro sitio web puede recopilar información personal
                        como:{" "}
                        <span className="text-white font-medium">
                          nombre, datos de contacto e información demográfica
                        </span>
                        . Cuando sea necesario, se solicitará información
                        específica para procesar pedidos o comprobantes.
                      </p>
                    )}
                    {sec.id === "uso" && (
                      <p>
                        Usamos la información para brindar el mejor servicio
                        posible: responder consultas, mantener registros de
                        servicios y mejorar nuestra atención técnica
                        especializada en Lima.
                      </p>
                    )}
                    {sec.id === "cookies" && (
                      <p>
                        Este sitio utiliza cookies para analizar el tráfico y
                        mejorar su experiencia. Usted puede desactivarlas desde
                        su navegador, aunque esto podría limitar algunas
                        funciones del sitio.
                      </p>
                    )}
                    {sec.id === "terceros" && (
                      <p>
                        Podemos contener enlaces a otros sitios.{" "}
                        <span className="text-white font-medium">
                          {empresa}
                        </span>{" "}
                        no tiene control sobre las políticas de privacidad de
                        terceros una vez que usted abandona nuestra página.
                      </p>
                    )}
                    {sec.id === "control" && (
                      <p>
                        Usted puede restringir el uso de su información en
                        cualquier momento. No vendemos ni cedemos sus datos a
                        terceros, salvo por obligación legal. Nos reservamos el
                        derecho de actualizar estos términos.
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
