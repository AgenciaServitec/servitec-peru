import { Modal as AntdModal } from "../ui";
import type { ReactNode } from "react";
import styled, { css } from "styled-components";

interface ModalProps {
  open?: boolean; // Añadido para tipado completo
  closable?: boolean;
  onCancel?: () => void;
  centered?: boolean;
  footer?: ReactNode;
  children: ReactNode;
  width?: number | string;
  title?: ReactNode;
}

export const Modal = ({
  closable = false,
  onCancel,
  centered = true,
  footer = null,
  children,
  ...props
}: ModalProps) => (
  <StyledModal
    closable={closable}
    onCancel={onCancel}
    centered={centered}
    footer={footer}
    destroyOnClose // Buena práctica para limpiar el DOM
    maskClosable={closable} // Si es closable, permitimos cerrar al hacer click fuera
    {...props}
  >
    <ModalContent>{children}</ModalContent>
  </StyledModal>
);

const StyledModal = styled(AntdModal)`
  ${({ theme }) => css`
    /* Contenedor principal del modal */
    .ant-modal-content {
      background-color: ${theme.colors.bgSecondary} !important;
      border-radius: ${theme.border_radius
        .lg} !important; /* 12px para Cards/Modales */
      padding: 0 !important;
      overflow: hidden;
      border: 1px solid ${theme.colors.border};
      box-shadow: ${theme.shadows.lg} !important;
    }

    /* Cabecera del modal */
    .ant-modal-header {
      background-color: ${theme.colors.bgSecondary} !important;
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      margin-bottom: 0;
      border-bottom: 1px solid ${theme.colors.border};

      .ant-modal-title {
        color: ${theme.colors.fontPrimary} !important;
        font-size: ${theme.font_sizes.lg};
        font-weight: ${theme.font_weight.large};
      }
    }

    /* Botón de cerrar (X) */
    .ant-modal-close {
      top: 16px;
      color: ${theme.colors.fontTertiary};
      transition: all ${theme.transitions.fast};

      &:hover {
        color: ${theme.colors.primary};
        background-color: ${theme.colors.bgHover};
      }
    }

    /* Footer del modal */
    .ant-modal-footer {
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      border-top: 1px solid ${theme.colors.border};
      margin-top: 0;
    }

    /* Overlay / Máscara de fondo */
    &.ant-modal-mask {
      background-color: rgba(0, 0, 0, 0.7) !important;
      backdrop-filter: blur(4px); /* Efecto moderno de desenfoque */
    }
  `}
`;

const ModalContent = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.lg};
    color: ${theme.colors.fontSecondary};
    font-size: ${theme.font_sizes.sm};
    line-height: 1.6;
  `}
`;
