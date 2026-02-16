"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
      {/* Contenedor Principal con tono Gris Humo */}
      <div className="max-w-[1400px] mx-auto bg-[#EBEBEB] border border-neutral-300/50 p-8 md:p-12 lg:px-16 lg:py-12 rounded-xl shadow-[0_-20px_80px_rgba(0,0,0,0.15)]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          {/* Bloque de Información */}
          <div className="flex flex-col gap-4 text-left w-full">
            <h4 className="text-black font-extrabold text-2xl md:text-3xl tracking-tighter">
              Tus preferencias de privacidad
            </h4>

            <div className="space-y-4">
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-4xl">
                En{" "}
                <span className="font-bold text-black tracking-tight">
                  SERVITEC PERU
                </span>{" "}
                utilizamos cookies para asegurar que nuestro soporte técnico y
                servicios en Lima funcionen a la perfección. Al hacer clic en{" "}
                <span className="text-black font-semibold">"Aceptar Todo"</span>
                , permites que nuestra atención sea más ágil y personalizada.
                Revisa los detalles en nuestra{" "}
                <Link
                  href="/politica-cookies"
                  className="text-black font-bold underline underline-offset-4 decoration-[#FFD700] hover:decoration-black transition-all"
                >
                  Política de Cookies
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Bloque de Acciones */}
          <div className="flex flex-col gap-3 w-full lg:w-[320px] shrink-0">
            <button
              onClick={acceptCookies}
              className="w-full bg-black hover:bg-neutral-800 text-white py-5 px-8 rounded-xl text-sm font-black uppercase tracking-[0.15em] transition-all active:scale-[0.97]"
            >
              Aceptar Todo
            </button>

            <button
              onClick={() => setIsVisible(false)}
              className="w-full bg-transparent border-2 border-neutral-400/50 text-neutral-700 py-5 px-8 rounded-xl text-sm font-black uppercase tracking-[0.15em] text-center hover:bg-black hover:text-white hover:border-black transition-all"
            >
              Continuar sin aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
