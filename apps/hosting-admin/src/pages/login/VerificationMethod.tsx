import { Button, Col, Row } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheckCircle,
  faEnvelope,
  faMobileAlt,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { theme } from "../../styles";
import { useState } from "react";
import { useAuthentication } from "../../providers";
import { truncate } from "lodash";

type StepVerificationMethodProps = {
  onNext: () => void;
  onBack: () => void;
  onChangeMethod: (method: "phone" | "email") => void;
};

export const VerificationMethod = ({
  onNext,
  onBack,
  onChangeMethod,
}: StepVerificationMethodProps) => {
  const [verificationMethod, setVerificationMethod] = useState<
    "phone" | "email"
  >("phone");

  const [loading, setLoading] = useState(false);

  const { sendVerificationCode, tempUser } = useAuthentication();

  const onSendCode = async () => {
    try {
      setLoading(true);

      console.log("[LOGIN - VERIFICACION DE METODO] tempUser: ", tempUser);
      console.log(
        "[LOGIN - VERIFICACION DE METODO] dni: ",
        tempUser?.document.number
      );

      await sendVerificationCode(
        {
          dni: tempUser?.document.number,
          fullName: `${tempUser?.firstName} ${tempUser?.paternalSurname} ${tempUser?.maternalSurname}`,
          email: tempUser?.email,
          phone: {
            prefix: tempUser?.phone.prefix,
            number: tempUser?.phone.number,
          },
        },
        verificationMethod
      );

      onChangeMethod(verificationMethod);

      onNext();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Método de verificación</StepTitle>
        <StepSubtitle>
          Selecciona cómo deseas recibir tu código de seguridad
        </StepSubtitle>
      </StepHeader>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <MethodCard
            selected={verificationMethod === "email"}
            onClick={() => setVerificationMethod("email")}
          >
            <MethodIconCircle selected={verificationMethod === "email"}>
              <FontAwesomeIcon icon={faEnvelope} />
            </MethodIconCircle>
            <MethodTitle>Correo Electrónico</MethodTitle>
            <MethodSubtitle>
              {tempUser?.email && truncate(tempUser?.email, { length: 20 })}
            </MethodSubtitle>
            <MethodCheck selected={verificationMethod === "email"}>
              {verificationMethod === "email" && (
                <FontAwesomeIcon icon={faCheckCircle} />
              )}
            </MethodCheck>
          </MethodCard>
        </Col>

        <Col xs={24} sm={12}>
          <MethodCard
            selected={verificationMethod === "phone"}
            onClick={() => setVerificationMethod("phone")}
          >
            <MethodIconCircle selected={verificationMethod === "phone"}>
              <FontAwesomeIcon icon={faMobileAlt} />
            </MethodIconCircle>
            <MethodTitle>Número Celular</MethodTitle>
            <MethodSubtitle>
              {tempUser?.phone &&
                truncate(tempUser?.phone.number, { length: 12 })}
            </MethodSubtitle>
            <MethodCheck selected={verificationMethod === "phone"}>
              {verificationMethod === "phone" && (
                <FontAwesomeIcon icon={faCheckCircle} />
              )}
            </MethodCheck>
          </MethodCard>
        </Col>

        <Col span={24}>
          <InfoBox>
            <FontAwesomeIcon
              icon={faShieldHalved}
              style={{ marginRight: "0.6em", fontSize: "1.05em" }}
            />
            Enviaremos un código de 6 dígitos que expira en 5 minutos
          </InfoBox>
        </Col>

        <Col xs={12} sm={12}>
          <Button size="large" block onClick={onBack}>
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
            onClick={onSendCode}
            disabled={loading}
            loading={loading}
          >
            Enviar Código
          </Button>
        </Col>
      </Row>
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
  margin-bottom: ${theme.spacing.xl};
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

const MethodCard = styled.div<{ selected: boolean }>`
  background: ${({ selected }) =>
    selected ? theme.colors.bgHover : theme.colors.bgTertiary};
  border: 1px solid
    ${({ selected }) => (selected ? theme.colors.primary : theme.colors.border)};
  border-radius: ${theme.border_radius.md};
  padding: 1.5em 1em;
  text-align: center;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ selected }) =>
      selected ? theme.colors.primary : theme.colors.borderHover};
    background: ${theme.colors.bgHover};
  }
`;

const MethodIconCircle = styled.div<{ selected: boolean }>`
  width: 44px;
  height: 44px;
  margin: 0 auto 0.8em;
  border-radius: 50%;
  background: ${({ selected }) =>
    selected ? theme.colors.primary : theme.colors.bgSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: ${({ selected }) =>
    selected ? "#000000" : theme.colors.fontSecondary};
  transition: all ${theme.transitions.fast};
`;

const MethodTitle = styled.h4`
  color: ${theme.colors.fontPrimary};
  font-size: 0.95em;
  font-weight: ${theme.font_weight.medium};
  margin: 0 0 0.3em;
`;

const MethodSubtitle = styled.p`
  color: ${theme.colors.fontTertiary};
  font-size: 0.8em;
  margin: 0;
`;

const MethodCheck = styled.div<{ selected: boolean }>`
  position: absolute;
  top: 0.8em;
  right: 0.8em;
  font-size: 1.1em;
  color: ${theme.colors.primary};
  opacity: ${({ selected }) => (selected ? 1 : 0)};
  transform: scale(${({ selected }) => (selected ? 1 : 0.5)});
  transition: all ${theme.transitions.fast};
`;
