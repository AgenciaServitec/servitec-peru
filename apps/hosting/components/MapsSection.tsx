export const MapsSection = () => {
  return (
    <div className="w-full text-white py-20 px-6 flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-12 text-center">UBICACIÓN</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
              className="w-5 h-5"
            >
              <path
                fill="currentColor"
                d="m1024 166l941 941l-90 90l-83-82v805h-512v-640H768v640H256v-805l-83 82l-90-90z"
              />
            </svg>
            <h3 className="text-2xl font-normal text-center">
              Local Chorrillos - Teran
            </h3>
          </div>
          <p className="text-zinc-300 font-normal">Dirección:</p>
          <p className="text-center text-zinc-300 mb-5">
            Néstor Bermúdez 113, Chorrillos, Lima, Perú
          </p>
          <div className="w-full h-80 overflow-hidden rounded-b-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3707.159599433348!2d-77.02141948961908!3d-12.171208888025662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b783a900bdaf%3A0x607fff39cb74344a!2sCa.%20Coronel%20Bermudez%20113%2C%20Lima%2015064!5e1!3m2!1ses!2spe!4v1763683064088!5m2!1ses!2spe"
              width="400"
              height="300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
              className="w-5 h-5"
            >
              <path
                fill="currentColor"
                d="m1024 166l941 941l-90 90l-83-82v805h-512v-640H768v640H256v-805l-83 82l-90-90z"
              />
            </svg>
            <h3 className="text-2xl font-normal text-center">Local C.C Kiwi</h3>
          </div>
          <p className="text-zinc-300 font-normal">Dirección:</p>
          <p className="text-center text-zinc-300 mb-4">
            Av. Defensores de Morro (ex Av. Huaylas) 1350 N°266 Chorrillos -Lima
          </p>
          <div className="w-full h-80 overflow-hidden rounded-b-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1853.550948982573!2d-77.018486!3d-12.175343!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b7788f078293%3A0xeec5e7a15ec3f73b!2sTienda%20Servitec!5e1!3m2!1ses!2spe!4v1763676681611!5m2!1ses!2spe"
              width="400"
              height="300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
