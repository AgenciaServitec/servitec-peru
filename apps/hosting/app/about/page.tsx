import Image from "next/image";
import { ContentWidth } from "@/components/ContentWidth";

export default function About() {
  return (
    <ContentWidth>
      <div className="relative w-full flex justify-center items-center">
        <Image
          src="/content_about/nosotros4.jpg"
          alt="Nosotros"
          width={500}
          height={300}
          className="w-full h-[45vh] object-cover object-bottom"
        />
        <h1 className="absolute text-white text-7xl font-bold">NOSOTROS</h1>
      </div>
      <h2 className="text-white text-center p-10 text-4xl py-15">
        ¿QUIENES SOMOS?
      </h2>
      <p className="max-w-3xl mx-auto">
        Somos una empresa que brinda servicios informáticos en la asesoría y
        consultoría en hardware y software, tanto para usuarios domésticos,
        negocios y empresas corporativas. Prestamos nuestros servicios en forma
        altamente personalizada, comprendiendo que cada empresa es única,
        creando una solución a la medida de tus necesidades. Logrando
        identificar y entender las necesidades de nuestros clientes para
        ofrecerle la mejor solución integral.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 px-40 py-2">
        <div className="bg-white p-4 rounded-4xl border-7 border-blue-400 flex flex-col h-full">
          <div className="font-bold text-xl mb-2 text-black">
            Nuestra misión
          </div>
          <p className="text-black">
            Gestionar y brindar con idoneidad Soluciones de Tecnologías de
            Información, cumpliendo los acuerdos establecidos con nuestros
            clientes e incrementando el valor del negocio de cada uno de ellos.
          </p>
        </div>
        <div className="bg-white p-4 rounded-4xl border-7 border-green-400">
          <div className="font-bold text-xl mb-2 text-black">
            Nuestra visión
          </div>
          <p className="text-black">
            Ser la empresa líder en el mercado brindando soluciones innovadoras
            capaces de satisfacer íntegramente las necesidades de nuestros
            clientes, con la excelencia y calidad del servicio.
          </p>
        </div>
        <div className="bg-white p-4 rounded-4xl border-7 border-red-400">
          <div className="font-bold text-xl mb-2 text-black">
            Nuestros valores
          </div>
          <p className="text-black">
            Nuestros valores son los pilares fundamentales en las relaciones con
            nuestros trabajadores, clientes y proveedores.
          </p>
        </div>
      </div>
    </ContentWidth>
  );
}
