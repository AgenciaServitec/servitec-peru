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
    }

    .ant-modal-header {
      background: ${theme.colors.bgSecondary};
      border-bottom: 1px solid ${theme.colors.border};

      .ant-modal-title {
        color: ${theme.colors.fontPrimary} !important;
      }
    }

    .ant-modal-close {
      color: ${theme.colors.fontSecondary};

      &:hover {
        color: ${theme.colors.primary};
      }
    }

    .ant-modal-footer {
      border-top: 1px solid ${theme.colors.border};
    }

    img {
      max-width: 100%;
      box-sizing: border-box;
      object-fit: cover;
      border-radius: ${theme.border_radius.md};
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
    color: ${theme.colors.bgPrimary};
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};

    &:hover {
      background: ${theme.colors.primaryDark};
      border-color: ${theme.colors.primaryDark};
      color: ${theme.colors.bgPrimary};
    }

    svg {
      font-size: ${theme.font_sizes.sm};
      margin: 0 5px 4px 0;
      color: ${theme.colors.bgPrimary};
    }
  `}
`;

const Wrapper = styled.div`
  ${() => css`
    p {
      font-size: ${theme.font_sizes.md} !important;
      color: ${theme.colors.fontPrimary} !important;

      svg {
        color: ${theme.colors.info};
      }
    }

    .ant-upload-text {
      color: ${theme.colors.fontPrimary};
      font-weight: ${theme.font_weight.medium};
    }

    .ant-upload-hint {
      color: ${theme.colors.fontSecondary};
    }
  `}
`;
