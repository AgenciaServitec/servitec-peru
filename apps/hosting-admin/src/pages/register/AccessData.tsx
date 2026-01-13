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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faKey } from "@fortawesome/free-solid-svg-icons";
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

// interface Document {
//   documentType: DocumentType;
//   documentNumber: string;
// }

export const AccessData = ({ onNext }: { onNext: () => void }) => {
  const [documentType, setDocumentType] = useState<DocumentType>("dni");
  const [loading, setLoading] = useState(false);

  const { notification } = useNotification();

  const {
    getDataByDniOrRuc,
    getDataByDniOrRucLoading,
    getDataByDniOrRucResponse,
  } = useApiDataByDniOrRucGet(documentType || "dni");

  const getDocumentValidation = (type: DocumentType) => {
    switch (type) {
      case "dni":
        return yup
          .string()
          .required()
          .matches(/^\d{8}$/, "El DNI debe tener 8 dígitos");
      case "ruc":
        return yup
          .string()
          .required()
          .matches(/^\d{11}$/, "El RUC debe tener 11 dígitos");
      case "ce":
        return yup
          .string()
          .required()
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
  } = useForm<IdentityDocument>({
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

  const onSubmit = async ({ documentNumber }) => {
    try {
      setLoading(true);

      const userWithDni = await userByDni(documentNumber);

      if (userWithDni)
        return notification({
          type: "warning",
          title: `El DNI ya se encuentra registrado!`,
        });

      const personData = await getDataByDniOrRuc(documentNumber);

      setLocalStorage("register", {
        document: {
          documentType: "dni",
          documentNumber,
        },
        firstName: capitalize(personData?.firstName || ""),
        paternalSurname: capitalize(personData?.paternalSurname || ""),
        maternalSurname: capitalize(personData?.maternalSurname || ""),
        birthdate: personData?.birthdate || "",
      });

      onNext();
    } catch (e) {
      console.error(e);

      notification({ type: "error" });
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
        <StepIconWrapper>
          <FontAwesomeIcon icon={faIdCard} />
        </StepIconWrapper>
        <StepTitle>Documento de identidad</StepTitle>
        <StepSubtitle>
          Ingresa el código de registro y tus datos de identificación
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
                  variant="outlined"
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
                  label={`Número de ${documentType}`}
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
                  variant="outlined"
                />
              )}
            />
          </Col>
          <Col span={24}>
            <InfoBox>
              <FontAwesomeIcon icon={faKey} style={{ marginRight: "0.5em" }} />
              El código de registro es temporal y será removido en la versión
              final
            </InfoBox>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
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
  animation: fadeInScale 0.4s ease;

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const StepHeader = styled.div`
  text-align: center;
  margin-bottom: 2em;
`;

const StepIconWrapper = styled.div`
  width: 70px;
  height: 70px;
  margin: 0 auto 1.2em;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, #f39c12 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8em;
  color: ${theme.colors.black};
  box-shadow: 0 4px 24px ${theme.colors.primary}50;
`;

const StepTitle = styled.h3`
  font-size: 1.7em;
  font-weight: ${theme.font_weight.large};
  color: ${theme.colors.font1};
  margin: 0 0 0.4em;
`;

const StepSubtitle = styled.p`
  color: ${theme.colors.font2};
  margin: 0;
  font-size: 1em;
  line-height: 1.5;
`;

const InfoBox = styled.div`
  background: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.primary}30;
  border-radius: ${theme.border_radius.small};
  padding: 1em;
  text-align: center;
  color: ${theme.colors.font2};
  font-size: 0.9em;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${theme.colors.primary};
  }
`;
