import { type ReactNode, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import {
  faArrowLeft,
  faCompress,
  faExpand,
  faFileExport,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDevice } from "../../../hooks";
import { floor, max } from "lodash";
import { useNavigate } from "react-router-dom";

interface PDFProps {
  children: ReactNode;
}

export const PDF = ({ children }: PDFProps) => {
  const navigate = useNavigate();
  const { currentScreenWidth, isMobile, isDevice } = useDevice();
  const [zoom, setZoom] = useState<number>(100);
  const [zoomExpand, setZoomExpand] = useState<number>(100);

  useEffect(() => {
    const maxSheetWidth = getMaxSheetWidth();

    if (maxSheetWidth) {
      const newZoom = floor((currentScreenWidth * 100) / maxSheetWidth) - 1;

      setZoom(newZoom);
      setZoomExpand(newZoom);
    }
  }, [currentScreenWidth]);

  useEffect(() => {
    document
      .getElementById("pdf-children")
      ?.style.setProperty("zoom", `${zoom}%`);
  }, [zoom]);

  const onGoBack = (): void => navigate(-1);

  const onZoomPlus = (): void => setZoom((zoom) => zoom + 5);

  const onZoomMinus = (): void => setZoom((zoom) => zoom - 5);

  const onCompress = (): void => setZoom(100);

  const onExpand = (): void => setZoom(zoomExpand);

  const onPrint = (): void => window.print();

  const hasStyleZoom = "zoom" in window.document.body.style;

  return (
    <Container>
      {!isMobile && (
        <Fixed left="0" top="0">
          <Circle onClick={onGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Circle>
        </Fixed>
      )}
      {isMobile && (
        <Fixed left="0" top="0">
          <Circle onClick={() => onPrint()}>
            <FontAwesomeIcon icon={faFileExport} />
          </Circle>
        </Fixed>
      )}
      <Children id="pdf-children">{children}</Children>
      {!isDevice.mobile && (
        <Fixed left="0" bottom="0">
          <Circle onClick={() => onPrint()}>
            <FontAwesomeIcon icon={faFileExport} />
          </Circle>
          <Circle
            onClick={() => (zoom > 100 ? onCompress() : onExpand())}
            aria-disabled={!hasStyleZoom}
          >
            <FontAwesomeIcon icon={zoom > 100 ? faCompress : faExpand} />
          </Circle>
          <Circle onClick={onZoomPlus} aria-disabled={!hasStyleZoom}>
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
          </Circle>
          <Circle
            onClick={onZoomMinus}
            aria-disabled={!hasStyleZoom || zoom <= 100}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
          </Circle>
        </Fixed>
      )}
    </Container>
  );
};

const getMaxSheetWidth = (): number | undefined => {
  const element = document.getElementById("pdf-children");

  const sheetsWidth: number[] = [];

  if (element) {
    for (let i = 0; element.children.length > i; i++) {
      const width = element?.children[i]?.clientWidth;
      if (width) {
        sheetsWidth.push(width);
      }
    }

    return max(sheetsWidth);
  }
};

const Container = styled.section`
  width: 100vw;
  margin: 0;
  padding: 0;
  background: rgb(81 86 89);
  display: block;
  height: auto;
  min-height: 100vh;
  overflow: auto;

  @media print {
    width: 100%; /* 👈 clave: no uses 100vw al imprimir */
    max-width: 100%;
    margin: 0;
    padding: 0;
    background: #fff; /* o transparent; pero que no sea gris */
    overflow: visible;
  }
`;

interface FixedProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const Fixed = styled.div<FixedProps>`
  ${({ top, bottom, left, right }) => css`
    top: ${top};
    bottom: ${bottom};
    left: ${left};
    right: ${right};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: fixed;
    z-index: 10000;

    @media print {
      display: none;
    }
  `}
`;

const Circle = styled.div`
  cursor: pointer;
  background: rgb(32, 33, 35);
  border-radius: 50%;
  padding: 0.4rem;
  margin: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(219, 221, 224);
  font-size: 1rem;
  z-index: 10000;

  &[aria-disabled="true"] {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const Children = styled.div`
  @media print {
    zoom: 100% !important;
  }
`;
