"use client";

import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import Link from "next/link";

export const BusinessBoostBanner = () => {
  return (
    <div className="py-10 relative overflow-hidden">
      <ContentWidth>
        <div className="text-center mb-12 relative">
          <h2 className="text-4xl lg:text-5xl font-bold mb-3">
            Sitios web que convierten{" "}
            <span className="text-[#FFC107]">visitantes en clientes</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto flex items-center justify-center gap-2">
            <span>
              Diseñamos experiencias digitales que impulsan tu negocio con
              tecnología de vanguardia
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative group rounded-xl overflow-hidden">
              <Image
                src="/banner-business.png"
                alt="Desarrollo web profesional - SERVITEC"
                width={900}
                height={500}
                className="w-full"
              />

              <div className="absolute top-4 right-4 bg-[#FFC107] text-black px-4 py-2 font-bold text-sm uppercase tracking-wide shadow-lg transform -rotate-2 flex items-center gap-2">
                <span>Diseño Premium</span>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, #FFC107 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-bold">
                    ¿Qué incluye tu{" "}
                    <span className="text-[#FFC107]">sitio web?</span>
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    {
                      title: "Diseño Estratégico",
                      desc: "Cada elemento diseñado para maximizar conversiones y ventas",
                    },
                    {
                      title: "Tecnología Moderna",
                      desc: "React, Next.js y las mejores herramientas del mercado",
                    },
                    {
                      title: "SEO Optimizado",
                      desc: "Posiciona tu negocio en Google desde el primer día",
                    },
                    {
                      title: "Soporte Continuo",
                      desc: "Actualizaciones y mantenimiento cuando lo necesites",
                    },
                    {
                      title: "100% Responsive",
                      desc: "Perfecto en todos los dispositivos móviles y tablets",
                    },
                    {
                      title: "Carga Ultra Rápida",
                      desc: "Optimización avanzada para mejor experiencia de usuario",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="w-6 h-6 bg-[#FFC107] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3.5 h-3.5 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold mb-0.5">{benefit.title}</p>
                        <p className="text-sm text-gray-400">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-800">
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center gap-2 bg-[#FFC107] text-black font-bold px-8 py-4 rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative">
                      Solicita tu Cotización Gratis
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="relative bg-gray-900/80 backdrop-blur border-t border-gray-800 p-4">
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-12 h-12 bg-white backdrop-blur rounded-xl flex items-center justify-center">
                      <svg
                        className="w-7 h-7"
                        fill="#087cf7"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm">
                        <span>Servitec</span>
                      </p>
                      <p className="text-xs">Red Social</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="relative bg-gray-900/80 backdrop-blur">
                  <iframe
                    className="w-full h-[600px]"
                    src="https://ac2f6010da714e538a28349f48a5bd6d.elf.site/"
                    scrolling="no"
                  />
                </div>

                <div className="bg-gray-900/80 backdrop-blur border-t border-gray-800 p-3 text-center">
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                    <span>Forma parte de nuestra comunidad en Facebook</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWidth>

      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(50px) rotate(360deg);
            opacity: 0.3;
          }
        }

        .animate-snowfall {
          animation: snowfall linear infinite;
        }
      `}</style>
    </div>
  );
};
