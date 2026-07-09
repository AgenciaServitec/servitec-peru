import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Button,
  Col,
  ColorPicker,
  Form,
  Input,
  RadioGroup,
  Row,
  Select,
  TextArea,
} from "../../../../components";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import QRCodeStyling from "qr-code-styling";
import type { QrFormTabProps } from "./index";

export const QrFormTab = ({
  isNew,
  isSaving,
  qrMode,
  dynamicId,
  selectedDomain,
  destinationUrl,
  qrValue,
  sitesLoading,
  qrTypeOptions,
  DOMAINS_LIST,
  control,
  error,
  required,
  errorMessage,
  handleSubmit,
  onSubmit,
  handleDomainChange,
  statusOptions,
  watch,
}: QrFormTabProps) => {
  const qrPreviewRef = useRef<HTMLDivElement>(null);
  const designForm = watch("design");

  const {
    dotsType = "rounded",
    dotsColor = "#ccff00",
    cornerSquareType = "extra-rounded",
    backgroundColor = "#000000",
    frameType = "none",
    frameText = "ESCANÉAME",
    frameColor = "#ccff00",
    frameTextColor = "#000000",
  } = designForm || {};

  const [qrCodeInstance] = useState(
    () =>
      new QRCodeStyling({
        width: 220,
        height: 220,
        margin: 10,
        type: "svg",
      })
  );

  useEffect(() => {
    if (qrPreviewRef.current) {
      qrPreviewRef.current.innerHTML = "";
      qrCodeInstance.append(qrPreviewRef.current);
    }
  }, [qrCodeInstance]);

  useEffect(() => {
    const urlLength = (qrValue || "").length;
    const dynamicMargin = urlLength > 40 ? 0 : 10;

    qrCodeInstance.update({
      data: qrValue || "https://servitecperu.com",
      margin: dynamicMargin,
      dotsOptions: {
        color: dotsColor,
        type: dotsType as any,
      },
      cornersSquareOptions: {
        color: dotsColor,
        type: cornerSquareType as any,
      },
      backgroundOptions: {
        color: backgroundColor,
      },
    });
  }, [
    qrCodeInstance,
    qrValue,
    dotsColor,
    dotsType,
    cornerSquareType,
    backgroundColor,
  ]);

  const dotsTypeOptions = [
    { value: "rounded", label: "Redondeado" },
    { value: "dots", label: "Puntos" },
    { value: "classy", label: "Clásico" },
    { value: "square", label: "Cuadrado" },
  ];

  const cornersOptions = [
    { value: "extra-rounded", label: "Súper Redondo" },
    { value: "square", label: "Cuadrado" },
    { value: "dot", label: "Punto Central" },
  ];

  const frameOptions = [
    { value: "none", label: "Sin Marco" },
    { value: "bottom-frame", label: "Texto Abajo" },
    { value: "top-frame", label: "Texto Arriba" },
    { value: "circular", label: "Circular" },
    { value: "tooltip", label: "Mensaje (Estilo Chat)" },
    { value: "badge", label: "Insignia (Flotante)" },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={16}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <StepTitle>
                      <Badge>1</Badge> Completa el contenido
                    </StepTitle>
                  </Col>
                  <Col span={24}>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <RadioGroup
                          label="Tipo de Código QR"
                          name={name}
                          value={value}
                          onChange={onChange}
                          options={qrTypeOptions}
                          disabled={!isNew}
                          error={error(name)}
                          required={required(name)}
                          helperText={errorMessage(name)}
                        />
                      )}
                    />
                  </Col>
                  {qrMode === "dynamic" && (
                    <Col span={24}>
                      <Controller
                        name="domain"
                        control={control}
                        render={({ field: { value, name } }) => (
                          <Select
                            label="Dominio de Redirección"
                            name={name}
                            value={value || undefined}
                            onChange={handleDomainChange}
                            options={DOMAINS_LIST}
                            loading={sitesLoading}
                            disabled={sitesLoading || !isNew}
                            error={error(name)}
                            required={required(name)}
                            helperText={errorMessage(name)}
                            style={{ width: "100%" }}
                          />
                        )}
                      />
                      <MessageQrId>
                        <span className="hint-text">
                          El QR generado apuntará a:{" "}
                          <strong>
                            {selectedDomain}/q/{dynamicId}
                          </strong>
                        </span>
                      </MessageQrId>
                    </Col>
                  )}
                  <Col span={24}>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Título del Código QR"
                          size="large"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                          helperText={errorMessage(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24}>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <TextArea
                          label="Descripción"
                          rows={2}
                          placeholder="Agrega una breve descripción..."
                          name={name}
                          value={value || ""}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                          helperText={errorMessage(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="destinationUrl"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="URL de Destino Real"
                          size="large"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                          helperText={errorMessage(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Select
                          label="Estado del Código"
                          name={name}
                          value={value}
                          onChange={onChange}
                          options={statusOptions}
                          error={error(name)}
                          required={required(name)}
                          helperText={errorMessage(name)}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <StepTitle>
                      <Badge>2</Badge> Estilo del QR
                    </StepTitle>
                  </Col>

                  <Col span={12}>
                    <Controller
                      name="design.dotsType"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Select
                          label="Forma del Patrón"
                          name={name}
                          value={value}
                          onChange={onChange}
                          options={dotsTypeOptions}
                        />
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="design.cornerSquareType"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Select
                          label="Forma de las Esquinas"
                          name={name}
                          value={value}
                          onChange={onChange}
                          options={cornersOptions}
                        />
                      )}
                    />
                  </Col>

                  <Col span={12}>
                    <Controller
                      name="design.dotsColor"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <ColorPicker
                          label="Color del Código"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="design.backgroundColor"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <ColorPicker
                          label="Color de Fondo (QR)"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <StepTitle>
                      <Badge>3</Badge> Marcos y Etiquetas
                    </StepTitle>
                  </Col>

                  <Col span={12}>
                    <Controller
                      name="design.frameType"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Select
                          label="Tipo de Marco"
                          name={name}
                          value={value}
                          onChange={onChange}
                          options={frameOptions}
                        />
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="design.frameText"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Texto del Marco"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          disabled={frameType === "none"}
                        />
                      )}
                    />
                  </Col>

                  <Col span={12}>
                    <Controller
                      name="design.frameColor"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <ColorPicker
                          label="Color del Marco"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          disabled={frameType === "none"}
                        />
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="design.frameTextColor"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <ColorPicker
                          label="Color del Texto"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          disabled={frameType === "none"}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={24} lg={8}>
          <PreviewSection>
            <Card className="preview-card">
              <StepTitle>
                <FontAwesomeIcon icon={faPalette} style={{ color: "gray" }} />{" "}
                Vista Previa
              </StepTitle>

              <FrameContainer $type={frameType} $bgColor={frameColor}>
                {(frameType === "top-frame" || frameType === "tooltip") && (
                  <FrameText
                    $color={frameTextColor}
                    $bgColor={frameColor}
                    $type={frameType}
                  >
                    {frameText}
                  </FrameText>
                )}

                <QrWrapper
                  ref={qrPreviewRef}
                  $type={frameType}
                  $bgColor={frameColor}
                />

                {(frameType === "bottom-frame" ||
                  frameType === "circular" ||
                  frameType === "badge") && (
                  <FrameText
                    $color={frameTextColor}
                    $bgColor={frameColor}
                    $type={frameType}
                  >
                    {frameText}
                  </FrameText>
                )}
              </FrameContainer>

              <Button
                type="primary"
                size="large"
                block
                icon={<FontAwesomeIcon icon={faSave} />}
                htmlType="submit"
                disabled={isSaving || (qrMode === "static" && !destinationUrl)}
                loading={isSaving}
                style={{ marginTop: "16px" }}
              >
                {isNew ? "Guardar Código QR" : "Actualizar Código QR"}
              </Button>
            </Card>
          </PreviewSection>
        </Col>
      </Row>
    </Form>
  );
};

const PreviewSection = styled.div`
  position: sticky;
  top: 24px;
`;

const Card = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    padding: ${theme.spacing.lg};

    &.preview-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${theme.spacing.lg};
    }
  `}
`;

const StepTitle = styled.h3`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    font-size: ${theme.font_sizes.lg};
    margin-bottom: ${theme.spacing.lg};
    margin-top: 0;
    color: ${theme.colors.fontPrimary};
    width: 100%;
  `}
`;

const Badge = styled.span`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.bgPrimary};
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.large};
  `}
`;

const MessageQrId = styled.div`
  ${({ theme }) => css`
    .hint-text {
      color: ${theme.colors.fontTertiary};
      font-size: ${theme.font_sizes.xs};
      margin-top: 4px;
    }
  `}
`;

const FrameContainer = styled.div<{ $type: string; $bgColor: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 20px;

  ${({ $type, $bgColor }) => {
    if ($type === "bottom-frame") {
      return css`
        background: ${$bgColor};
        padding: 14px 14px 56px 14px;
        border-radius: 20px;
      `;
    }
    if ($type === "top-frame") {
      return css`
        background: ${$bgColor};
        padding: 56px 14px 14px 14px;
        border-radius: 20px;
      `;
    }
    if ($type === "circular") {
      return css`
        background: ${$bgColor};
        padding: 16px;
        border-radius: 50%;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      `;
    }
    if ($type === "badge") {
      return css`
        background: ${$bgColor};
        padding: 14px 14px 36px 14px;
        border-radius: 20px;
      `;
    }
    if ($type === "tooltip") {
      return css`
        background: transparent;
        padding: 0;
        margin-top: 50px;
      `;
    }
    return css`
      background: transparent;
      padding: 0;
    `;
  }}
`;

const FrameText = styled.div<{
  $color: string;
  $type: string;
  $bgColor: string;
}>`
  position: absolute;
  text-align: center;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 1px;
  color: ${({ $color }) => $color};
  z-index: 10;

  ${({ $type, $bgColor, $color }) => {
    if ($type === "bottom-frame") return "left: 0; right: 0; bottom: 16px;";
    if ($type === "top-frame") return "left: 0; right: 0; top: 16px;";

    if ($type === "circular" || $type === "badge")
      return css`
        bottom: -16px;
        background: ${$color};
        color: ${$bgColor};
        padding: 6px 20px;
        border-radius: 20px;
        font-size: 14px;
        white-space: nowrap;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      `;

    if ($type === "tooltip")
      return css`
        top: -46px;
        background: ${$bgColor};
        padding: 8px 20px;
        border-radius: 8px;
        white-space: nowrap;

        &::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 8px 8px 0;
          border-style: solid;
          border-color: ${$bgColor} transparent transparent transparent;
        }
      `;

    return "";
  }}
`;

const QrWrapper = styled.div<{ $type: string; $bgColor: string }>`
  ${({ theme, $type, $bgColor }) => css`
    background: #ffffff;
    border-radius: ${$type === "circular" ? "50%" : "14px"};

    ${$type === "tooltip"
      ? css`
          border: 8px solid ${$bgColor};
          border-radius: 20px;
        `
      : css`
          box-sizing: border-box;
        `}

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    padding: ${$type === "circular" ? "24px" : "12px"};

    svg {
      display: block;
      width: 100% !important;
      height: 100% !important;
    }
  `}
`;
