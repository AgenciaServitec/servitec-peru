import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";

export const FooterLayout = () => {
  return (
    <footer className="bg-black py-5">
      <ContentWidth>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center">
            <Image
              src="/logo-servitec.png"
              alt="Logo de Servitec Perú"
              width={180}
              height={38}
              priority
            />
          </div>
          <div className="p-4 rounded-xl w-full md:w-auto text-center">
            <p className="font-bold text-xl">
              Conéctate Socialmente con Servitec
            </p>
            <div className="flex justify-center gap-10 mt-4">
              <a
                href="https://www.facebook.com/Servitec.chorrillos/?locale=es_LA"
                target="_blank"
                className="flex flex-col items-center text-center gap-1 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#1877f2"
                    d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                  />
                  <path
                    fill="#fff"
                    d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                  />
                </svg>
                <span>Visitanos en Facebook</span>
              </a>
              <a
                href="https://www.youtube.com/channel/UC0fs7G_IrQ9nBPOpKsaDTJg"
                target="_blank"
                className="flex flex-col items-center text-center gap-1 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 256 180"
                >
                  <path
                    fill="#f00"
                    d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"
                  />
                  <path
                    fill="#fff"
                    d="m102.421 128.06l66.328-38.418l-66.328-38.418z"
                  />
                </svg>
                <span>Visitanos en Youtube</span>
              </a>
              <a
                href="https://wa.me/51941801827"
                target="_blank"
                className="flex flex-col items-center text-center gap-1 hover:text-green-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 256 258"
                >
                  <defs>
                    <linearGradient
                      id="SVGBRLHCcSy"
                      x1="50%"
                      x2="50%"
                      y1="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stop-color="#1faf38" />
                      <stop offset="100%" stop-color="#60d669" />
                    </linearGradient>
                    <linearGradient
                      id="SVGHW6lecxh"
                      x1="50%"
                      x2="50%"
                      y1="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stop-color="#f9f9f9" />
                      <stop offset="100%" stop-color="#fff" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#SVGBRLHCcSy)"
                    d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
                  />
                  <path
                    fill="url(#SVGHW6lecxh)"
                    d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
                  />
                  <path
                    fill="#fff"
                    d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
                  />
                </svg>
                <span>Escribenos en Whatsapp</span>
              </a>
            </div>
          </div>
        </div>
        <hr className="border-gray-800 border-1 my-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">
              Sobre nosotros
            </h3>
            <p className="text-gray-400">
              Somos una empresa que brinda servicios informáticos de forma
              integral en la asesoría y consultoría en hardware y software,
              tanto para usuarios domésticos, negocios y empresas corporativas.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">
              Horario de atención
            </h3>
            <p className="text-gray-400">9:00 am a 6:00 pm</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Dirección</h3>
            <ul className="text-gray-400">
              Néstor Bermúdez 113, Chorrillos, Lima, Perú
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Contacto</h3>
            <ul className="text-gray-400">
              <li className="flex-gap items-center">941 801 827</li>
              <li className="flex-gap items-center">972 252 744</li>
              <li className="flex-gap items-center">
                contactos@servitec-peru.com
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-800 border-1 my-8" />
        <div className="flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>Copyrights © 2025 - Desarrollado por Agencia Servitec </p>
          <div className="flex mt-4 md:mt-0">
            <a
              href="https://drive.google.com/file/d/1zEqBvWZsx0zsnixUNf1Ag_xrlqOfGIK4/view?pli=1"
              className="border-b-1 border-transparent hover:border-gray-400"
            >
              Terminos y condiciones
            </a>
          </div>
        </div>
      </ContentWidth>
    </footer>
  );
};
