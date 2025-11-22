export const WhatDoWeDo = () => {
  return (
    <section className="w-full pt-35 pb-15 px-10 flex flex-col items-center text-white">
      <h2 className="text-4xl font-semibold mb-14 text-center">
        ¿Que Hacemos?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl">
        <div className="bg-orange-300/30 border border-orange-500/30 rounded-2xl p-5 hover:scale-105 transition duration-300">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 48 48"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M32 .5c-3.54 0-6.259.181-8.24.397h-.001C20.304 1.273 18 4.142 17.84 7.413q-.07 1.405-.138 3.331a2 2 0 1 0 3.998.138q.067-1.897.135-3.272h.002c.076-1.55 1.09-2.599 2.356-2.737c1.83-.199 4.403-.373 7.808-.373s5.978.174 7.807.373c1.267.138 2.28 1.187 2.356 2.737c.11 2.245.23 5.505.292 9.89h-7.073c.476.933.79 1.965.911 3.061q.046.348.067.701c.1 1.736.185 4.24.185 7.738s-.085 6.002-.185 7.738q-.02.353-.067.701a8.74 8.74 0 0 1-4.932 6.972a9 9 0 0 1-.962.42a5.5 5.5 0 0 1-.079 2.655q.807.015 1.68.014c3.54 0 6.26-.181 8.24-.397c3.455-.376 5.758-3.245 5.919-6.516c.163-3.311.34-8.73.34-16.587c0-7.858-.178-13.276-.34-16.587c-.161-3.27-2.464-6.14-5.92-6.516C38.26.681 35.543.5 32 .5m-6.887 10.316a2 2 0 0 1 2-2h.978a2 2 0 0 1 0 4h-.978a2 2 0 0 1-2-2m8.797 0a2 2 0 0 1 2-2h.977a2 2 0 1 1 0 4h-.977a2 2 0 0 1-2-2m-16.887 9.559c-5.006 0-8.232.109-10.2.216c-.666.036-1.114.492-1.15 1.132C5.582 23.282 5.5 25.63 5.5 29c0 2.014.03 3.663.072 4.996h22.901c.043-1.333.072-2.982.072-4.996c0-3.37-.082-5.718-.172-7.277c-.037-.64-.485-1.096-1.151-1.132c-1.967-.107-5.194-.216-10.2-.216M6.606 16.597c2.055-.112 5.356-.222 10.417-.222c5.06 0 8.361.11 10.417.222c.779.042 1.51.247 2.157.582a4.74 4.74 0 0 1 2.725 3.863q.03.222.045.45c.095 1.648.179 4.074.179 7.508s-.084 5.86-.18 7.508a6 6 0 0 1-.044.45a4.74 4.74 0 0 1-2.725 3.863a5.3 5.3 0 0 1-2.157.582c-1.288.07-3.065.14-5.457.182l.09.725a2.5 2.5 0 0 0 2.482 2.19h.468a1.5 1.5 0 1 1 0 3h-16a1.5 1.5 0 1 1 0-3h.47a2.5 2.5 0 0 0 2.48-2.19l.09-.725c-2.392-.042-4.17-.112-5.457-.182a5.3 5.3 0 0 1-2.17-.589a4.74 4.74 0 0 1-2.707-3.82a6 6 0 0 1-.05-.486C1.584 34.86 1.5 32.434 1.5 29s.084-5.86.179-7.508q.014-.246.05-.485a4.74 4.74 0 0 1 2.706-3.821a5.3 5.3 0 0 1 2.17-.59"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">
            Servicios Técnicos Especializados
          </h3>
          <p className="text-sm opacity-80">
            Reparamos y mantenemos laptops, celulares, proyectores, PCs,
            servidores, impresoras, sistemas de redes y más.
          </p>
          <a
            href=""
            className="mt-5 text-sm font-medium flex items-center gap-2 justify-center"
          >
            Leer Mas
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="opacity-80"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className="bg-sky-300/20 border border-sky-500/30 rounded-2xl p-5 hover:scale-105 transition duration-300">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 15.47a.75.75 0 0 0 0 1.06a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5A.75.75 0 0 0 7 11.53l1.79 1.79a.25.25 0 0 1 0 .36Zm5.55.28h4a.75.75 0 0 0 0-1.5h-4a.75.75 0 0 0 0 1.5"
              />
              <path
                fill="currentColor"
                d="M24 4.75a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v14.5a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3Zm-13.5-1.5a1 1 0 0 1 1 1a1 1 0 0 1-2 0a1 1 0 0 1 1-1m-3.5 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-3.5 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m18.5 16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a.25.25 0 0 1 .25-.25h19.5A.25.25 0 0 1 22 7Z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">
            Desarrollo Web y Digital
          </h3>
          <p className="text-sm opacity-80">
            Diseñamos y desarrollamos páginas web rápidas, modernas y
            optimizadas para empresas y emprendedores.
          </p>
          <a
            href=""
            className="mt-12 text-sm font-medium flex items-center gap-2 justify-center"
          >
            Leer Mas
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="opacity-80"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className="bg-yellow-300/20 border border-yellow-500/30 rounded-2xl p-5 hover:scale-105 transition duration-300">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 14 14"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M7.527 9.331a5 5 0 0 0 1.49-1.319a2 2 0 0 1-.273-.661l-.019-.088a1.29 1.29 0 0 0-1.042-.998c-2.072-.36-2.072-3.334 0-3.695a1.29 1.29 0 0 0 1.03-.948a5 5 0 1 0-6.187 7.709V10.5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1zm-5 3.919a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m7.28-11.533C9.99.881 11.18.876 11.37 1.71l.009.04l.018.078a2.4 2.4 0 0 0 1.921 1.812c.872.152.872 1.404 0 1.556a2.4 2.4 0 0 0-1.925 1.827l-.023.102c-.19.835-1.381.83-1.565-.007l-.019-.087A2.38 2.38 0 0 0 7.87 5.194c-.871-.151-.871-1.401 0-1.553a2.38 2.38 0 0 0 1.915-1.826L9.8 1.75z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">
            Soluciones para Empresas
          </h3>
          <p className="text-sm opacity-80">
            Atendemos negocios, oficinas y entidades con servicios integrales de
            tecnología.
          </p>
          <a
            href=""
            className="mt-5 text-sm font-medium flex items-center gap-2 justify-center"
          >
            Leer Mas
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="opacity-80"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className="bg-red-300/20 border border-red-500/30 rounded-2xl p-5 hover:scale-105 transition duration-300">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8 2a6 6 0 0 1 5.743 7.743L20 16a2.828 2.828 0 0 1-3.785 4.194L16 20l-6.257-6.257a6 6 0 0 1-7.458-7.577L5.123 9l2.814-.937l.125-.126L9 5.127L6.158 2.288C6.738 2.101 7.358 2 8 2m4.586 9.57a.829.829 0 0 0-1.156 1.188l5.984 5.828a.829.829 0 0 0 1.172-1.172z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">
            Soporte y Acompañamiento
          </h3>
          <p className="text-sm opacity-80">
            Ofrecemos atención personalizada, soporte continuo y asesoría
            especializada para cada proyecto.
          </p>
          <a
            href=""
            className="mt-5 text-sm font-medium flex items-center gap-2 justify-center"
          >
            Leer Mas
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="opacity-80"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
