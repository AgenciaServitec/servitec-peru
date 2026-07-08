import { Controller } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  Input,
  RadioGroup,
  Row,
  Select,
  TextArea,
} from "../../../../components";
import { QRCodeCanvas } from "qrcode.react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faSave } from "@fortawesome/free-solid-svg-icons";

interface QrFormData {
  type: "static" | "dynamic";
  domain?: string | null;
  title: string;
  description?: string | null;
  destinationUrl: string;
  status: "active" | "paused" | "expired";
}

interface QrFormTabProps {
  isNew: boolean;
  isSaving: boolean;
  qrMode: string;
  dynamicId: string;
  selectedDomain: string;
  destinationUrl: string;
  qrValue: string;
  sitesLoading: boolean;
  qrTypeOptions: { value: string; label: string }[];
  DOMAINS_LIST: { value: string; label: string }[];
  control: any;
  error: (name: string) => boolean;
  required: (name: string) => boolean;
  errorMessage: (name: string) => string | undefined;
  handleSubmit: any;
  onSubmit: (data: QrFormData) => Promise<void>;
  handleDomainChange: (value: string) => void;
  qrRef: React.RefObject<HTMLDivElement>;
  statusOptions: { value: string; label: string }[];
}

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
  qrRef,
}: QrFormTabProps) => {
  const statusOptions = [
    { value: "active", label: "Activo" },
    { value: "paused", label: "Pausado" },
    { value: "expired", label: "Expirado" },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={16}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Button type="primary" icon={<FontAwesomeIcon icon={faLink} />}>
                  Enlace
                </Button>
              </Card>
            </Col>
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
                          placeholder="Agrega una breve descripción sobre este código QR..."
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
                  <Col span={24}>
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
                  <Col span={24}>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <RadioGroup
                          label="Estado del Código QR"
                          name={name}
                          value={value}
                          onChange={onChange}
                          options={statusOptions} // Debes pasar este array desde el padre
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
          </Row>
        </Col>
        <Col span={24} lg={8}>
          <PreviewSection>
            <Card className="preview-card">
              <StepTitle>
                <Badge>2</Badge> Vista Previa
              </StepTitle>

              <QrWrapper ref={qrRef}>
                <QRCodeCanvas
                  value={qrValue || "https://servitecperu.com"}
                  size={220}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"H"}
                  includeMargin={false}
                />
              </QrWrapper>

              <Button
                type="primary"
                size="large"
                block
                icon={<FontAwesomeIcon icon={faSave} />}
                htmlType="submit"
                disabled={isSaving || (qrMode === "static" && !destinationUrl)}
                loading={isSaving}
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

const QrWrapper = styled.div`
  ${({ theme }) => css`
    background: #ffffff;
    padding: 16px;
    border-radius: ${theme.border_radius.md};
    box-shadow: ${theme.shadows.md};
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
