import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../hooks";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  useNotification,
} from "../../components";
import styled from "styled-components";
import { theme } from "../../styles";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useAuthentication } from "../../providers";

type StepDniProps = {
  onNext: () => void;
  loading: boolean;
};

interface DniForm {
  dni: string;
}

export const AccessDataLogin = ({ onNext }: StepDniProps) => {
  const [loading, setLoading] = useState(false);
  const { findUserByDNI } = useAuthentication();

  const { notification } = useNotification();

  const schema = yup.object({
    dni: yup.string().min(8).max(8).required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DniForm>({
    resolver: yupResolver(schema),
    defaultValues: { dni: "" },
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const onSubmit = async ({ dni }: DniForm) => {
    try {
      setLoading(true);

      const user = await findUserByDNI(dni);

      if (isEmpty(user))
        notification({
          type: "error",
          title: "El DNI no se encuentra registrado!",
        });

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
        <StepTitle>Inicio de Sesión</StepTitle>
        <StepSubtitle>Ingresa tu número de documento para acceder</StepSubtitle>
      </StepHeader>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              name="dni"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Documento de Identidad (DNI)"
                  value={value}
                  onChange={onChange}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  maxLength={8}
                  size="large"
                />
              )}
            />
          </Col>

          <Col span={24}>
            <InfoBox>Tu información está protegida y cifrada</InfoBox>
          </Col>

          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              disabled={loading}
              loading={loading}
            >
              Siguiente
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
  transition: border-color ${theme.transitions.fast};

  svg {
    color: ${theme.colors.primary};
    opacity: 0.9;
  }
`;
