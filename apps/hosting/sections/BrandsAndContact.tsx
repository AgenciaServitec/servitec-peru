import Brands from "../data-list/brands.json";
import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const BrandsAndContact = () => {
  return (
    <div className="py-10">
      <ContentWidth>
        <div className="space-y-4">
          {/* NEWSLETTER SECTION */}
          <div className="relative bg-gradient-to-br from-yellow-300/20 to-black border border-gray-800 rounded-xl shadow-2xl p-6 lg:p-8">
            <div
              className="absolute inset-0 opacity-5 z-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, #FFC107 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center lg:items-start lg:max-w-xl">
                {/* Icono */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-14 h-14 mb-4 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M21 3a1 1 0 0 1 1 1v16.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2l-10-9V4a1 1 0 0 1 1-1zM8 15v2H0v-2zm-3-5v2H0v-2zm14.566-5H4.434L12 11.81z"
                  />
                </svg>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 text-center lg:text-left">
                  Newsletter Servitec Perú
                </h3>
                <p className="text-base lg:text-lg text-gray-200 text-center lg:text-left mb-4 leading-relaxed">
                  Tips de{" "}
                  <strong className="text-yellow-300 font-bold">
                    reparación
                  </strong>
                  , ofertas en{" "}
                  <strong className="text-yellow-300 font-bold">
                    proyectores
                  </strong>{" "}
                  y novedades de{" "}
                  <strong className="text-yellow-300 font-bold">
                    desarrollo web
                  </strong>
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-xs text-white font-medium">
                    Contenido exclusivo
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-xs text-white font-medium">
                    Descuentos especiales
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-xs text-white font-medium">
                    Sin spam
                  </span>
                </div>
              </div>
              <form className="w-full lg:max-w-md flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="h-12"
                />
                <Button type="submit" className="h-12 font-bold bg-yellow-300">
                  Suscribirme
                </Button>
              </form>
            </div>
          </div>

          {/* LOGOS DE MARCAS */}
          <div className="bg-white rounded-2xl py-4 px-8 shadow-xl">
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
              {Brands.map((brand) => (
                <div
                  key={brand.name}
                  className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                >
                  <Image
                    src={brand.imageSrc}
                    alt={brand.name}
                    width={140}
                    height={32}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentWidth>
    </div>
  );
};
