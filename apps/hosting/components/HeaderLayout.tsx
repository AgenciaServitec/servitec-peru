import Image from "next/image";

export const HeaderLayout = () => {
  return (
    <header>
      <Image
        src="/logo-servitec.png"
        alt="Logo de Servitec Perú"
        width={180}
        height={38}
        priority
      />
      <h2>EL ENCABEZADO</h2>
    </header>
  );
};
