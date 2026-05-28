import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  useNotification,
} from "../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useFormUtils } from "../../hooks";
import styled from "styled-components";
import { theme } from "../../styles";
import { getLocalStorage } from "../../utils";
import { useEffect } from "react";
import { useApiUserPost } from "../../api";
import { useNavigate } from "react-router-dom";
import type { UserRegister } from "../../globalTypes.ts";

type PersonalInformationProps = {
  onBack: () => void;
  currentStep: number;
};

export const PersonalInformation = ({
  onBack,
  currentStep,
}: PersonalInformationProps) => {
  const navigate = useNavigate();
  const { postUser, postUserLoading } = useApiUserPost();
  const { notification } = useNotification();

  const schema = yup.object({
    firstName: yup
      .string()
      .required("Los nombres son obligatorios")
      .min(2, "Mínimo 2 caracteres"),
    paternalSurname: yup
      .string()
      .required("El apellido paterno es obligatorio")
      .min(2, "Mínimo 2 caracteres"),
    maternalSurname: yup
      .string()
      .required("El apellido materno es obligatorio")
      .min(2, "Mínimo 2 caracteres"),
    email: yup
      .string()
      .required("El correo es obligatorio")
      .email("Correo electrónico inválido"),
    phone: yup.object({
      prefix: yup.string().required("Prefijo requerido"),
      number: yup
        .string()
        .required("El celular es obligatorio")
        .matches(/^\d{9}$/, "El celular debe tener 9 dígitos"),
    }),
    gender: yup.string().required("Selecciona tu género").default(""),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      firstName: "",
      paternalSurname: "",
      maternalSurname: "",
      email: "",
      phone: {
        prefix: "+51",
        number: "",
      },
      gender: "",
    },
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const step1Data = getLocalStorage("register");

  useEffect(() => {
    if (step1Data) {
      reset({
        firstName: step1Data?.firstName || "",
        paternalSurname: step1Data?.paternalSurname || "",
        maternalSurname: step1Data?.maternalSurname || "",
        email: step1Data?.email || "",
        phone: {
          prefix: "+51",
          number: "",
        },
        gender: "",
      });
    }
  }, [currentStep]);

  const mapUser = (formData: UserRegister) => ({
    firstName: formData.firstName,
    paternalSurname: formData.paternalSurname,
    maternalSurname: formData.maternalSurname,
    email: formData.email,
    document: {
      type: step1Data?.document?.documentType || "dni",
      number: step1Data?.document?.documentNumber || "",
    },
    phone: {
      prefix: "+51",
      number: formData.phone.number,
    },
    gender: formData.gender,
  });

  const onSubmit = async (formData: UserRegister) => {
    try {
      const response = await postUser(mapUser(formData));

      if (response && response.ok !== false) {
        notification({
          type: "success",
          title: "¡Registro exitoso!",
          description: "Tu cuenta ha sido creada con éxito. Redireccionando...",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error("Error in the register");
      }
    } catch (error: any) {
      console.error("Error in register:", error);

      let registrationErrorMsg =
        "No se pudo completar el registro. Intenta nuevamente.";

      if (error.message?.includes("email_already_exists")) {
        registrationErrorMsg = "Este correo electrónico ya está registrado";
      } else if (error.message?.includes("dni_already_exists")) {
        registrationErrorMsg = "Este documento ya está registrado";
      } else if (error.message?.includes("phone_number_already_exists")) {
        registrationErrorMsg = "Este número de teléfono ya está registrado";
      }

      notification({
        type: "error",
        title: "Error en el registro",
        description: registrationErrorMsg,
      });
    }
  };

  const genderOptions = [
    { value: "male", label: "Masculino" },
    { value: "female", label: "Femenino" },
    { value: "other", label: "Otro / Prefiero no decirlo" },
  ];

  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Información personal</StepTitle>
        <StepSubtitle>
          Completa tus datos de contacto para finalizar el registro
        </StepSubtitle>
      </StepHeader>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Nombres"
                  value={value}
                  onChange={onChange}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  size="large"
                  disabled
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="paternalSurname"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Apellido Paterno"
                  value={value}
                  onChange={onChange}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  size="large"
                  disabled
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="maternalSurname"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Apellido Materno"
                  value={value}
                  onChange={onChange}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  size="large"
                  disabled
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Correo Electrónico"
                  value={value}
                  onChange={onChange}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  size="large"
                  type="email"
                />
              )}
            />
          </Col>
          <Col xs={8} sm={6}>
            <Controller
              name="phone.prefix"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Código"
                  value={`${value}`}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, "");
                    onChange(cleaned);
                  }}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  maxLength={3}
                  size="large"
                  disabled
                />
              )}
            />
          </Col>
          <Col xs={16} sm={18}>
            <Controller
              name="phone.number"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Número de Celular"
                  value={value}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, "");
                    onChange(cleaned);
                  }}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  maxLength={9}
                  size="large"
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  label="Género"
                  value={value}
                  onChange={onChange}
                  options={genderOptions}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <InfoBox>
              Tu información personal está protegida por nuestras políticas de
              privacidad
            </InfoBox>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "1.5rem" }}>
          <Col xs={12}>
            <Button
              size="large"
              block
              onClick={onBack}
              disabled={postUserLoading}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ marginRight: "0.5em" }}
              />
              Atrás
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              disabled={postUserLoading}
              loading={postUserLoading}
            >
              {postUserLoading ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    style={{ marginRight: "0.5em" }}
                  />
                  Procesando
                </>
              ) : (
                "Finalizar"
              )}
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
