import Image from "next/image";

export const BusinessBoostBanner = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">
        Impulsa tu negocio con un sitio web
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        <div className="md:col-span-2 bg-blue-900 rounded-xl overflow-hidden">
          <Image
            src="/banner-business.png"
            alt="Banner promocionando nuestros servicios"
            width={500}
            height={400}
            priority
          />
        </div>
        <div className="md:col-start-1 md:col-span-2 flex flex-col gap-4 items-start">
          <p>
            Identificamos tus necesidades, entendemos tus objetivos de
            comunicación y aprendemos acerca de tu negocio. Transportamos la
            personalidad de tu marca de un mundo real a un mundo digital.{" "}
          </p>
          <p>
            Aprovechamos al máximo los recursos de diseño para potenciar la
            experiencia de usuario y que viva tu marca. Incorporamos las últimas
            tecnologías y elementos a su sitio web para hacerlo versátil y
            flexible.{" "}
          </p>
          <p>
            Desarrollamos su sitio web con esta tecnología para que sea amigable
            al entorno de dispositivos móviles del usuario.{" "}
          </p>
          <a
            href="#"
            className="border-2 border-white p-2 px-2 hover:bg-green-500 hover:border-green-500"
          >
            ¡Contáctanos!
          </a>
        </div>
        <div className="group md:col-start-3 md:row-start-1 md:row-span-2">
          <iframe
            className="w-full h-full"
            src="https://ac2f6010da714e538a28349f48a5bd6d.elf.site/"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
