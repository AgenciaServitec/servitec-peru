"use client";

import { ContentWidth } from "@/components/ContentWidth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AboutDetails = () => {
  const items = [
    {
      id: "01",
      title: "Excelencia técnica",
      desc: "Invertimos en personas cualificadas y motivadas que adoptan metodologías eficientes y eficaces en cada proceso.",
    },
    {
      id: "02",
      title: "Transparencia total",
      desc: "Tenemos la libertad de ofrecer las soluciones que mejor se adaptan a las diferentes necesidades y circunstancias de su empresa.",
    },
    {
      id: "03",
      title: "Orientación al cliente",
      desc: "El éxito de nuestros clientes es nuestro éxito. Trabajamos proactivamente para ganarnos y mantener su confianza.",
    },
    {
      id: "04",
      title: "Recursos propios",
      desc: "Contamos con infraestructura y herramientas de vanguardia para garantizar diagnósticos precisos y soluciones duraderas.",
    },
  ];

  return (
    <section className="py-32 bg-black border-t border-white/5">
      <ContentWidth>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <h2 className="text-5xl font-black mb-8">
                Compromiso <br />
                <span className="text-white/20">Profesional</span>
              </h2>
              <p className="text-white/40 max-w-sm leading-relaxed">
                Nuestra metodología de trabajo se basa en estándares
                internacionales de calidad para asegurar la continuidad de su
                negocio.
              </p>
            </div>
          </div>

          {/* Lado derecho: Acordeón limpio */}
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="space-y-4">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border border-white/5 bg-[#080808] rounded-md px-8 transition-all duration-300 hover:border-white/10"
                >
                  <AccordionTrigger className="hover:no-underline py-8 group">
                    <div className="flex items-center gap-8">
                      <span className="font-mono text-xs text-[#FFD200]/50 group-hover:text-[#FFD200] transition-colors">
                        {item.id}
                      </span>
                      <span className="text-xl font-bold tracking-tight text-white/70 group-hover:text-white transition-colors">
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/40 leading-relaxed pb-8 pl-[60px] text-lg">
                    {item.desc}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
};
