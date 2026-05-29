import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { Button } from "../../ui";
import React from "react";
import AntdModal from "antd/lib/modal";
import { theme } from "../../../styles";

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
    style={{ textAlign: "center" }}
    open={visible}
    title="Visualización"
    closable={true}
    centered={true}
    footer={[
      <ButtonStyled
        key="download"
        size="large"
        onClick={() => window.open(isImage ? thumbUrl : url, "_blank")}
        icon={<FontAwesomeIcon icon={faDownload} />}
      >
        &ensp; Descargar
      </ButtonStyled>,
    ]}
  >
    {isImage ? (
      <img src={thumbUrl || url} alt="thumbImage" />
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

const ModalStyled = styled(AntdModal)`
  ${() => css`
    .ant-modal-content {
      background: ${theme.colors.bgSecondary};
      color: ${theme.colors.fontPrimary} !important;
      border: 1px solid ${theme.colors.border};
      padding: 0;
      overflow: hidden;
    }

    .ant-modal-header {
      background: ${theme.colors.bgSecondary};
      border-bottom: 1px solid ${theme.colors.divider};
      padding: 16px 24px;

      .ant-modal-title {
        color: ${theme.colors.fontPrimary} !important;
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
  ${() => css`
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
      margin: 0 8px 0 0;
      color: inherit;
    }
  `}
`;

const Wrapper = styled.div`
  ${() => css`
    padding: ${theme.spacing.lg} 0;

    p {
      margin-bottom: ${theme.spacing.sm};

      svg {
        color: ${theme.colors.info};
        transition: all ${theme.transitions.normal};
      }
    }

    .ant-upload-drag:hover & p svg {
      transform: translateY(-4px);
      color: ${theme.colors.fontPrimary};
    }

    .ant-upload-text {
      color: ${theme.colors.fontPrimary} !important;
      font-size: ${theme.font_sizes.md} !important;
      font-weight: ${theme.font_weight.medium} !important;
    }

    .ant-upload-hint {
      color: ${theme.colors.fontTertiary} !important;
      font-size: ${theme.font_sizes.sm} !important;
    }
  `}
`;
