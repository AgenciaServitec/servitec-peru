"use client";

import { ServicesList } from "@/data-list";
import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { ContentWidth } from "@/components/ContentWidth";

export const ServicesSection = () => {
  const [selectedType, setSelectedType] = useState<string | null>(
    "laptop-repair"
  );

  const selectedService = ServicesList.find(
    (service) => service.type === selectedType
  );
  return (
    <section className="relative bg-[url(/back.jpg)] pt-10">
      <div className="absolute inset-0 bg-black/70"></div>

      <ContentWidth>
        <div className="relative z-10 w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-wide drop-shadow-md">
              Bienvenid@s
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
              Somos una empresa que brinda servicios informáticos de forma
              integral en la asesoría y consultoría en hardware y software,
              tanto para usuarios domésticos, negocios y empresas corporativas.
              Prestamos nuestros servicios de forma altamente personalizada,
              comprendiendo que cada empresa es única, creando una solución a la
              medida de tus necesidades.
            </p>
          </div>
          <div
            className="
            flex flex-nowrap gap-3 mb-12 overflow-x-auto scrollbar-hide
            lg:flex-wrap lg:justify-center lg:overflow-x-visible
            px-1 lg:px-0 snap-x snap-mandatory
          "
          >
            {ServicesList.map((service) => (
              <button
                key={service.type}
                onClick={() =>
                  setSelectedType(
                    selectedType === service.type ? null : service.type
                  )
                }
                className={`cursor-pointer snap-start flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-300 border
                ${
                  selectedType === service.type
                    ? "bg-yellow-600 text-white border-yellow-500 shadow-lg shadow-yellow-500/30 scale-105"
                    : "bg-gray-800/70 text-gray-200 border-gray-600 hover:bg-yellow-700 hover:text-white hover:border-yellow-500"
                }
              `}
              >
                {service.name}
              </button>
            ))}
          </div>
          <p className="text-gray-400 text-md text-center mt-1 lg:hidden">
            Desliza para ver más →
          </p>
          {selectedService ? (
            selectedService.subtype && selectedService.subtype.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 w-full">
                {selectedService.subtype.map((sub) => (
                  <div
                    key={sub.subtype}
                    className="group flex flex-col overflow-hidden backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition-all duration-500"
                  >
                    <div className="relative h-64 w-full overflow-hidden rounded-t-2xl bg-black/10">
                      <Image
                        src={sub.image}
                        alt={sub.name}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="text-center mt-6 px-6 flex-1">
                      <h3 className="text-xl font-semibold text-white tracking-wide drop-shadow-sm">
                        {sub.name}
                      </h3>
                      <div className="w-50 h-[1px] bg-yellow-300 mx-auto mt-3 mb-5 rounded-full"></div>
                    </div>

                    <div className="flex items-center justify-between px-8 pb-8">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#FFD700"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#FFD700"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.134 4.325 4.773.694a.562.562 0 01.312.959l-3.453 3.368.815 4.756a.562.562 0 01-.815.592L12 15.933l-4.286 2.26a.562.562 0 01-.815-.592l.815-4.756L4.26 9.477a.562.562 0 01.312-.959l4.773-.694 2.134-4.325z"
                            />
                          </svg>
                        ))}
                      </div>
                      <Link
                        href={`/services/${sub.subtype}`}
                        className="border border-white/80 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all hover:bg-yellow-400 hover:text-black hover:border-yellow-400"
                      >
                        Ver más
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 text-lg mt-8">
                Este servicio no tiene subtipos disponibles.
              </p>
            )
          ) : (
            <p className="text-center text-gray-400 text-lg mt-8">
              Selecciona una categoría para ver sus servicios.
            </p>
          )}
        </div>
      </ContentWidth>
    </section>
  );
};
