import Brands from "../data-list/brands.json";
import Image from "next/image";

export const BrandsAndContact = () => {
  return (
    <div className="w-full">
      <div className="w-full bg-yellow-300 py-2 px-11 flex flex-col sm:flex-row items-center justify-between gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="110"
          height="110"
          viewBox="0 0 24 24"
          className="mb-4 sm:mb-0"
        >
          <path
            fill="currentColor"
            d="M21 3a1 1 0 0 1 1 1v16.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2l-10-9V4a1 1 0 0 1 1-1zM8 15v2H0v-2zm-3-5v2H0v-2zm14.566-5H4.434L12 11.81z"
          />
        </svg>
        <p className="text-2xl text-black text-center sm:text-left">
          CONTÁCTENOS y obtén nuestros servicios en mejores precio. ¡Somos
          Servitec!
        </p>
        <button className="border-2 border-white px-3 py-2 hover:border-green-500 hover:bg-green-500 text-black">
          Contactar
        </button>
      </div>
      <div className="w-full bg-white flex flex-wrap justify-center items-center gap-10 py-1 border-b-10 border-yellow-300 text-black">
        {Brands.map((brand) => (
          <Image
            key={brand.name}
            src={brand.imageSrc}
            alt={brand.name}
            width={180}
            height={38}
          />
        ))}
      </div>
    </div>
  );
};
