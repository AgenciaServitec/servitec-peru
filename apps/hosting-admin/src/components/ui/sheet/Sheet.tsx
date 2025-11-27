import styled, { css } from "styled-components";
import type { ReactNode } from "react";

type Layout = "portrait" | "landscape";

interface PageSize {
  width: string;
  height: string;
}

interface PageSizes {
  portrait: PageSize;
  landscape: PageSize;
}

const PAGE_SIZES: PageSizes = {
  portrait: { width: "210mm", height: "297mm" },
  landscape: { width: "297mm", height: "210mm" },
};

interface SheetProps {
  layout?: Layout;
  children: ReactNode;
  padding?: string;
}

export const Sheet = ({
  layout = "portrait",
  children,
  padding,
}: SheetProps) => (
  <Container layout={layout}>
    <LayoutContainer layout={layout} padding={padding}>
      <Children>{children}</Children>
    </LayoutContainer>
  </Container>
);

interface ContainerProps {
  layout: Layout;
}

const Container = styled.section<ContainerProps>`
  ${({ layout }) => css`
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;

    /* Vista en pantalla: ancho tipo A4, pero sin altura fija */
    width: ${PAGE_SIZES[layout].width};
    max-width: 100%;
    margin: 1rem auto;
    display: block;
    background: white;

    /* IMPORTANTE: dejar que el contenido crezca */
    /* Nada de overflow: hidden ni height fija */

    @media print {
      /* En impresión dejamos que el navegador pagine solo */
      width: 100%;
      margin: 0;
      padding: 0;
      border: none;
      background: white;
      /* No forzamos page-break-after aquí */
    }
  `}
`;

const PortraitCSS = css`
  width: ${PAGE_SIZES.portrait.width};
  //height: ${PAGE_SIZES.portrait.height};
`;

const LandscapeCss = css`
  width: ${PAGE_SIZES.landscape.width};
  height: ${PAGE_SIZES.landscape.height};

  @media print {
    transform-origin: 0 0;
    transform: rotate(270deg) translate(-${PAGE_SIZES.landscape.width}, 0);
  }
`;

interface LayoutContainerProps {
  layout: Layout;
  padding?: string;
}

const LayoutContainer = styled.div<LayoutContainerProps>`
  ${({ layout, padding = "9mm" }) => css`
    padding: ${padding};
    ${layout === "portrait" ? PortraitCSS : LandscapeCss}
  `}
`;

const Children = styled.div`
  width: 100%;
  /* Quitamos height y overflow para que el contenido fluya */
`;
