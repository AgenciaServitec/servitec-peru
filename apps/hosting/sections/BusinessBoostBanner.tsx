export const BusinessBoostBanner = () => {
  return (
    <div>
      <h2 className="text-2xl">Impulsa tu negocio con un sitio web</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        <div className="md:col-span-2">
          <img src="/banner1.png" alt="Sitios web" className="w-full" />
        </div>
        <div className="md:col-start-1 md:col-span-2">
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
        </div>
        <div className="md:col-start-3 md:row-start-1 md:row-span-2">
          Desarrollamos su sitio web con esta tecnología para que sea amigable
          al entorno de dispositivos móviles del usuario.{" "}
        </div>
      </div>
    </div>
  );
};
