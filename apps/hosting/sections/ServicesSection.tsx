"use client";

import { ServicesList } from "@/data-list";
import React, { useState } from "react";
import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import Link from "next/link";

export const ServicesSection = () => {
  const [selectedType, setSelectedType] = useState<string | null>(
    "laptop-repair"
  );

  const selectedService = ServicesList.find(
    (service) => service.type === selectedType
  );
  return (
    <section className="py-20">
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
                    ? "bg-yellow-300 text-black shadow-lg scale-105"
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
                    className="flex flex-col overflow-hidden rounded-t-2xl group"
                  >
                    <Link
                      href={`/services/${sub.subtype}`}
                      className="relative h-80 overflow-hidden rounded-xl bg-black block"
                    >
                      <Image
                        src={sub.image}
                        alt={sub.name}
                        fill
                        className="w-full h-full"
                        quality={100}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute left-2 bottom-2 z-10 opacity-0 group-hover:opacity-100 flex items-center gap-4 rounded-full bg-yellow-300 text-black px-6 py-3 transition-all duration-300">
                        <span>Ver más</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 640"
                          className="w-5 h-5"
                        >
                          <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" />
                        </svg>
                      </div>
                    </Link>

                    <div className="mt-6">
                      <Link href={`/services/${sub.subtype}`}>
                        <h3 className="text-3xl text-white tracking-wide drop-shadow-sm hover:underline">
                          {sub.name}
                        </h3>
                      </Link>

                      <div className="flex mt-6">
                        <p className="text-sm flex-1 text-gray-400">
                          {sub.description.slice(0, 45)}...
                        </p>
                        <div className="flex-1 flex justify-end items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#FFD700"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#FFD700"
                              className="w-6 h-6 lg:w-8 lg:h-8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.134 4.325 4.773.694a.562.562 0 01.312.959l-3.453 3.368.815 4.756a.562.562 0 01-.815.592L12 15.933l-4.286 2.26a.562.562 0 01-.815-.592l.815-4.756L4.26 9.477a.562.562 0 01.312-.959l4.773-.694 2.134-4.325z"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
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
