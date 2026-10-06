import React from "react";
import { Modal as AntdModal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { Button } from "../../ui"; // Ajusta tu ruta según corresponda

interface PreviewFileProps {
  url: string;
  thumbUrl?: string;
  isImage: boolean;
  onCancel: () => void;
  visible: boolean;
}

interface UploadBodyProps {
  buttonText: string;
  visible?: boolean;
}

interface UploadDraggerBodyProps {
  text: string;
  hint: string;
}

export const PreviewFile: React.FC<PreviewFileProps> = ({
  url,
  isImage,
  onCancel,
  thumbUrl,
  visible,
}) => (
  <ModalStyled
    onCancel={onCancel}
    open={visible}
    title="Visualización"
    closable={true}
    centered={true}
    footer={[
      <ButtonStyled
        key="download"
        size="large"
        onClick={() => window.open(isImage ? thumbUrl : url, "_blank")}
      >
        <FontAwesomeIcon icon={faDownload} />
        &ensp; Descargar
      </ButtonStyled>,
    ]}
  >
    {isImage ? (
      <img src={thumbUrl || url} alt="Vista previa del archivo cargado" />
    ) : (
      <span>Vista previa solo para imágenes</span>
    )}
  </ModalStyled>
);

export const UploadBody: React.FC<UploadBodyProps> = ({
  buttonText,
  visible = true,
}) =>
  visible ? (
    <Button size="large" block icon={<FontAwesomeIcon icon={faUpload} />}>
      &nbsp; {buttonText}
    </Button>
  ) : null;

export const UploadDraggerBody: React.FC<UploadDraggerBodyProps> = ({
  text,
  hint,
}) => (
  <Wrapper>
    <p className="ant-upload-drag-icon">
      <FontAwesomeIcon icon={faBox} size="2x" />
    </p>
    <p className="ant-upload-text">{text}</p>
    <p className="ant-upload-hint">{hint}</p>
  </Wrapper>
);

/* --- ESTILOS CON INYECCIÓN DINÁMICA DE THEME --- */

const ModalStyled = styled(AntdModal)`
  ${({ theme }) => css`
    .ant-modal-content {
      padding: 0;
      overflow: hidden;
      border: 1px solid ${theme.colors.border};
      /* El color de fondo (contentBg) ya lo maneja AntD desde tu theme.ts */
    }

    .ant-modal-header {
      padding: 16px 24px;
      border-bottom: 1px solid ${theme.colors.divider};
      margin-bottom: 0;

      .ant-modal-title {
        color: ${theme.colors.fontPrimary};
        font-weight: ${theme.font_weight.medium};
      }
    }

    .ant-modal-close {
      color: ${theme.colors.fontSecondary};
      top: 16px;

      &:hover {
        color: ${theme.colors.error};
      }
    }

    .ant-modal-body {
      background: ${theme.colors.bgTertiary};
      padding: 32px 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .ant-modal-footer {
      border-top: 1px solid ${theme.colors.divider};
      padding: 16px 24px;
      margin: 0;
      background: ${theme.colors.bgSecondary};
    }

    img {
      max-width: 100%;
      max-height: 55vh;
      box-sizing: border-box;
      object-fit: contain;
      border-radius: ${theme.border_radius.sm};
      box-shadow: ${theme.shadows.md};
    }

    span {
      color: ${theme.colors.fontSecondary};
    }
  `}
`;

const ButtonStyled = styled(Button)`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    color: ${theme.colors.primary};
    background: transparent;
    border: 1px solid ${theme.colors.primary};

    &:hover {
      background: ${theme.colors.primaryAlpha};
      border-color: ${theme.colors.primaryDark};
      color: ${theme.colors.primaryDark};
    }

    svg {
      font-size: ${theme.font_sizes.sm};
      margin: 0 4px 0 0;
      color: inherit;
    }
  `}
`;

const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.lg} 0;

    p {
      margin-bottom: ${theme.spacing.sm};

      svg {
        color: ${theme.colors.info};
        transition: transform ${theme.transitions.normal};
      }
    }

    /* Animación natural al hacer hover sobre la zona de arrastre */
    .ant-upload-drag:hover & p svg {
      transform: translateY(-4px);
    }

    .ant-upload-text {
      color: ${theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.md};
      font-weight: ${theme.font_weight.medium};
    }

    .ant-upload-hint {
      color: ${theme.colors.fontTertiary};
      font-size: ${theme.font_sizes.sm};
    }
  `}
`;
