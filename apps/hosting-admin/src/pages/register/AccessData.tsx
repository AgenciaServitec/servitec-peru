import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  useNotification,
} from "../../components";
import { theme } from "../../styles";
import { useFormUtils } from "../../hooks";
import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchCollectionOnce } from "../../firebase/firestore.ts";
import { firestore } from "../../firebase";
import { useApiDataByDniOrRucGet } from "../../api";
import { setLocalStorage } from "../../utils";
import { capitalize } from "lodash";

type DocumentType = "dni" | "ruc" | "ce";

interface Step1Form {
  document: {
    documentType: DocumentType;
    documentNumber: string;
  };
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  birthdate: string;
}

type AccessDataProps = {
  onNext: (user: Step1Form) => void;
};

export const AccessData = ({ onNext }: AccessDataProps) => {
  const [documentType, setDocumentType] = useState<DocumentType>("dni");
  const [loading, setLoading] = useState(false);

  const { notification } = useNotification();

  const { getDataByDniOrRuc } = useApiDataByDniOrRucGet(documentType || "dni");

  const getDocumentValidation = (type: DocumentType) => {
    switch (type) {
      case "dni":
        return yup
          .string()
          .required("El número de documento es requerido")
          .matches(/^\d{8}$/, "El DNI debe tener 8 dígitos");
      case "ruc":
        return yup
          .string()
          .required("El número de documento es requerido")
          .matches(/^\d{11}$/, "El RUC debe tener 11 dígitos");
      case "ce":
        return yup
          .string()
          .required("El número de documento es requerido")
          .matches(/^[A-Z0-9]{9,12}$/, "Formato de CE inválido");
      default:
        return yup.string().required("El documento es obligatorio");
    }
  };

  const schema = yup.object({
    documentType: yup.string().required(),
    documentNumber: getDocumentValidation(documentType),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      documentType: "dni",
      documentNumber: "",
    },
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const watchedDocType = watch("documentType");

  if (watchedDocType !== documentType) {
    setDocumentType(watchedDocType as DocumentType);
  }

  const onSubmit = async ({ documentNumber }: { documentNumber: string }) => {
    try {
      setLoading(true);

      const userWithDni = await userByDni(documentNumber);

      if (userWithDni) {
        return notification({
          type: "warning",
          title: "¡Atención!",
          description: "El DNI ya se encuentra registrado en el sistema.",
        });
      }

      const personData = await getDataByDniOrRuc(documentNumber);

      const payload: Step1Form = {
        document: {
          documentType: "dni",
          documentNumber,
        },
        firstName: capitalize(personData?.firstName || ""),
        paternalSurname: capitalize(personData?.paternalSurname || ""),
        maternalSurname: capitalize(personData?.maternalSurname || ""),
        birthdate: personData?.birthdate || "",
      };

      setLocalStorage("register", payload);

      onNext(payload);
    } catch (e) {
      console.error(e);
      notification({
        type: "error",
        title: "Error de servidor",
        description: "No se pudieron validar tus datos de identidad.",
      });
    } finally {
      setLoading(false);
    }
  };

  const documentOptions = [
    { value: "dni", label: "DNI - Documento Nacional de Identidad" },
    { value: "ruc", label: "RUC - Registro Único de Contribuyentes" },
    { value: "ce", label: "CE - Carnet de Extranjería" },
  ];

  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Documento de identidad</StepTitle>
        <StepSubtitle>
          Ingresa tus datos de identificación para registrarte en la plataforma
        </StepSubtitle>
      </StepHeader>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              name="documentType"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  label="Tipo de documento"
                  value={value}
                  onChange={onChange}
                  options={documentOptions}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  disabled
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="documentNumber"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label={`Número de ${documentType.toUpperCase()}`}
                  value={value}
                  onChange={(e) => {
                    const cleaned =
                      documentType === "ce"
                        ? e.target.value
                        : e.target.value.replace(/\D/g, "");
                    onChange(cleaned);
                  }}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  maxLength={
                    documentType === "dni"
                      ? 8
                      : documentType === "ruc"
                        ? 11
                        : 12
                  }
                  size="large"
                />
              )}
            />
          </Col>
          <Col span={24}>
            <InfoBox>
              Tu información está protegida mediante encriptación de extremo a
              extremo
            </InfoBox>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "1.5rem" }}>
          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              disabled={loading}
              block
            >
              Siguiente
            </Button>
          </Col>
        </Row>
      </Form>
    </StepContainer>
  );
};

const userByDni = async (dniNumber: string) => {
  const response = await fetchCollectionOnce(
    firestore
      .collection("users")
      .where("document.number", "==", dniNumber)
      .where("isDeleted", "==", false)
      .limit(1)
  );
  return response[0];
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
