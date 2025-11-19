import { ContentWidth } from "@/components/ContentWidth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AboutDetails = () => {
  return (
    <ContentWidth>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold hover:no-underline">
            Excelencia Técnica
          </AccordionTrigger>
          <AccordionContent>
            Invertimos en personas cualificadas y motivadas que adoptan
            metodologías eficientes y eficaces.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold hover:no-underline">
            Transparencia
          </AccordionTrigger>
          <AccordionContent>
            Tenemos la libertad de ofrecer las soluciones que mejor se adaptan a
            las diferentes necesidades y circunstancias.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold hover:no-underline">
            Orientación al cliente
          </AccordionTrigger>
          <AccordionContent>
            El éxito de nuestros clientes es nuestro éxito y es por ello que
            trabajamos para ganarnos su confianza.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-semibold hover:no-underline">
            Recursos propios
          </AccordionTrigger>
          <AccordionContent>
            El éxito de nuestros clientes es nuestro éxito y es por ello que
            trabajamos para ganarnos su confianza.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ContentWidth>
  );
};
