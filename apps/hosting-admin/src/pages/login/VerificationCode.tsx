import { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../hooks";
import {
  Button,
  Col,
  Form,
  InputCode,
  Row,
  useNotification,
} from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { theme } from "../../styles";

type StepVerificationCodeProps = {
  onBack: () => void;
  onFinish: (
    code: string,
    method: "phone" | "email",
    customToken?: string
  ) => Promise<void>;
  verificationMethod: "phone" | "email";
  dni: string;
};

export const VerificationCode = ({
  onBack,
  onFinish,
  verificationMethod,
  dni,
}: StepVerificationCodeProps) => {
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  const { notification } = useNotification();

  const schema = yup.object({
    code: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<{ code: string }>({
    resolver: yupResolver(schema),
    defaultValues: { code: "" },
  });

  const { errorMessage } = useFormUtils({ errors, schema });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  const onSubmit = async ({ code }: { code: string }) => {
    try {
      setLoading(true);

      console.log("[LOGIN - VERIFICACION DE CODIGO] code: ", code);
      console.log("[LOGIN - VERIFICACION DE CODIGO] dni: ", dni);

      if (verificationMethod === "phone") {
        await onFinish(code, "phone");
      } else {
        const response = await fetch(
          "https://api-servitec-peru.web.app/auth/verification-code/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dni, code }),
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.error || "El código ingresado es incorrecto o expiró."
          );
        }

        await onFinish(code, "email", data.token);
      }
    } catch (e: any) {
      console.error(e);
      reset({ code: "" });

      notification({
        type: "error",
        title: "Error de verificación",
        description:
          e.message || "Código inválido o vencido. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    setCountdown(60);

    try {
      return notification({
        type: "success",
        title: "Reenviando código",
        description: "Por favor espera...",
      });
    } catch (e) {
      console.error(e);
      setResendDisabled(false);
      setCountdown(0);
    }
  };

  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Código de seguridad</StepTitle>
        <StepSubtitle>
          Ingresa el código de 6 dígitos enviado para continuar
        </StepSubtitle>
      </StepHeader>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 20]}>
          <Col span={24}>
            <Controller
              name="code"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CodeInputWrapper>
                  <InputCode
                    value={value || ""}
                    onChange={(code) => {
                      onChange(code);
                      setValue("code", code);
                    }}
                    numInputs={6}
                    type="number"
                    error={!!errors.code}
                    helperText={errorMessage("code")}
                  />
                </CodeInputWrapper>
              )}
            />
          </Col>

          <Col span={24}>
            <ResendSection>
              <ResendText>¿No recibiste el código?</ResendText>
              <ResendLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (!resendDisabled) return handleResendCode();
                }}
                disabled={resendDisabled}
              >
                {resendDisabled
                  ? `Reenviar en ${countdown}s`
                  : "Reenviar código de verificación"}
              </ResendLink>
            </ResendSection>
          </Col>

          <Col span={24}>
            <InfoBox>
              <FontAwesomeIcon
                icon={faShieldHalved}
                style={{ marginRight: "0.6em", fontSize: "1.05em" }}
              />
              El código expira en 5 minutos
            </InfoBox>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "1.5rem" }}>
          <Col xs={12} sm={12}>
            <Button size="large" block onClick={onBack} disabled={loading}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ marginRight: "0.5em" }}
              />
              Atrás
            </Button>
          </Col>

          <Col xs={12} sm={12}>
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              disabled={loading}
              loading={loading}
            >
              Ingresar
            </Button>
          </Col>
        </Row>
      </Form>
    </StepContainer>
  );
};

const StepContainer = styled.div`
  animation: fadeInScale ${theme.transitions.fast};

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.98) translateY(4px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const StepHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

const StepTitle = styled.h3`
  font-size: ${theme.font_sizes.xxl};
  font-weight: ${theme.font_weight.large};
  color: ${theme.colors.fontPrimary};
  margin: 0 0 0.35em;
  letter-spacing: -0.02em;
`;

const StepSubtitle = styled.p`
  color: ${theme.colors.fontSecondary};
  margin: 0;
  font-size: ${theme.font_sizes.sm};
  line-height: 1.5;
`;

const CodeInputWrapper = styled.div`
  margin: 1.2rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ResendSection = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const ResendText = styled.p`
  color: ${theme.colors.fontTertiary};
  font-size: 0.85em;
  margin: 0 0 0.25em;
`;

const ResendLink = styled.a<{ disabled?: boolean }>`
  color: ${({ disabled }) =>
    disabled ? theme.colors.fontDisabled : theme.colors.primary};
  text-decoration: none;
  font-weight: ${theme.font_weight.medium};
  font-size: 0.88em;
  transition: opacity ${theme.transitions.fast};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.85)};
    text-decoration: ${({ disabled }) => (disabled ? "none" : "underline")};
  }
`;

const InfoBox = styled.div`
  background: ${theme.colors.bgTertiary};
  border: 1px dashed ${theme.colors.border};
  border-radius: ${theme.border_radius.sm};
  padding: 0.85em 1em;
  text-align: center;
  color: ${theme.colors.fontSecondary};
  font-size: 0.82em;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.01em;

  svg {
    color: ${theme.colors.primary};
    opacity: 0.9;
  }
`;
