import Image from "next/image";
import { FormContact } from "@/components/FormContact";
import { ContactDetails } from "@/sections/ContactDetails";
import { MapsSection } from "@/components/MapsSection";

export default function Contact() {
  return (
    <div>
      <div className="relative w-full flex justify-center items-center">
        <Image
          src="/formcontact_and_contactdetails/contacto.jpg"
          alt="Contacto"
          width={500}
          height={300}
          className="w-full h-[45vh] object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="px-6 py-10 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <ContactDetails />
          </div>
          <div className="md:col-span-8">
            <FormContact />
          </div>
        </div>
      </div>
      <MapsSection />
    </div>
  );
}
