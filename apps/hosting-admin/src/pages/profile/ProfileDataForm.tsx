import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useFormUtils } from "../../hooks";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  useNotification,
} from "../../components";
import { useAuthentication } from "../../providers";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiUserPut,
} from "../../api";
import { assign } from "lodash";
import { getSearchDataToUser } from "../../utils";
import { WorkPlaces } from "../../data-list";
import styled, { css } from "styled-components";
import { Briefcase, Contact, User } from "lucide-react";

interface ProfileFormData {
  profilePhoto?: any;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  phoneNumber: string;
  dni: string;
  workPlace: string;
}

export const ProfileDataForm: React.FC = () => {
  const { authUser } = useAuthentication();
  const { putUser, putUserLoading, putUserResponse } = useApiUserPut();
  const { notification } = useNotification();

  const schema = yup.object({
    profilePhoto: yup.mixed().notRequired(),
    firstName: yup.string().required("El nombre es obligatorio"),
    paternalSurname: yup
      .string()
      .required("El apellido paterno es obligatorio"),
    maternalSurname: yup
      .string()
      .required("El apellido materno es obligatorio"),
    email: yup
      .string()
      .email("Debe ser un email válido")
      .required("El email es obligatorio"),
    phoneNumber: yup
      .string()
      .min(9)
      .max(9)
      .required("El celular es obligatorio"),
    dni: yup
      .string()
      .min(8)
      .max(8)
      .required("El DNI es obligatorio")
      .transform((value) => (value === null ? "" : value)),
    workPlace: yup.string().required("El lugar de trabajo es obligatorio"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schema),
  });

  const { error, errorMessage, required } = useFormUtils({ errors, schema });

  const updateProfile = async (formData: ProfileFormData): Promise<void> => {
    try {
      const response = await putUser(
        assign({}, formData, {
          id: authUser.id,
          profilePhoto: formData?.profilePhoto || null,
          phone: { prefix: "+51", number: formData.phoneNumber },
          searchData: getSearchDataToUser(formData, formData.firstName),
        })
      );

      if (!putUserResponse.ok) {
        throw new Error(response as any);
      }

      notification({
        type: "success",
        title: "Perfil actualizado correctamente",
      });
    } catch (e) {
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    }
  };

  const resetForm = (): void => {
    reset({
      profilePhoto: authUser?.profilePhoto || null,
      firstName: authUser?.firstName || "",
      maternalSurname: authUser?.maternalSurname || "",
      paternalSurname: authUser?.paternalSurname || "",
      email: authUser?.email || "",
      phoneNumber: authUser?.phone?.number || "",
      dni: authUser?.document?.number || "",
      workPlace: authUser?.workPlace || "",
    });
  };

  useEffect(() => {
    resetForm();
  }, [authUser]);

  const onSubmit = async (formData: ProfileFormData): Promise<void> => {
    await updateProfile(formData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormSectionsContainer>
        {/* BLOQUE 1: Datos Personales */}
        <FormSection>
          <SectionHeader>
            <HeaderIcon>
              <User size={18} />
            </HeaderIcon>
            <div>
              <h3>Información Personal</h3>
              <p>Nombres y apellidos registrados en el sistema.</p>
            </div>
          </SectionHeader>

          <Row gutter={[16, 16]}>
            <Col span={24} md={8}>
              <Controller
                name="firstName"
                control={control}
                render={({ field: { onChange, name, value } }) => (
                  <Input
                    label="Nombres"
                    name={name}
                    onChange={onChange}
                    value={value}
                    error={error(name)}
                    helperText={errorMessage(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={8}>
              <Controller
                name="paternalSurname"
                control={control}
                render={({ field: { onChange, name, value } }) => (
                  <Input
                    label="Apellido Paterno"
                    name={name}
                    onChange={onChange}
                    value={value}
                    error={error(name)}
                    helperText={errorMessage(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={8}>
              <Controller
                name="maternalSurname"
                control={control}
                render={({ field: { onChange, name, value } }) => (
                  <Input
                    label="Apellido Materno"
                    name={name}
                    onChange={onChange}
                    value={value}
                    error={error(name)}
                    helperText={errorMessage(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
          </Row>
        </FormSection>

        {/* BLOQUE 2: Contacto e Identificación */}
        <FormSection>
          <SectionHeader>
            <HeaderIcon>
              <Contact size={18} />
            </HeaderIcon>
            <div>
              <h3>Contacto e Identificación</h3>
              <p>Canales de comunicación y documento nacional de identidad.</p>
            </div>
          </SectionHeader>

          <Row gutter={[16, 16]}>
            <Col span={24} md={8}>
              <Controller
                name="dni"
                control={control}
                render={({ field: { onChange, name, value } }) => (
                  <Input
                    label="DNI"
                    name={name}
                    onChange={onChange}
                    value={value}
                    error={error(name)}
                    helperText={errorMessage(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={8}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, name, value } }) => (
                  <Input
                    label="Correo Electrónico"
                    type="email"
                    name={name}
                    onChange={onChange}
                    value={value}
                    error={error(name)}
                    helperText={errorMessage(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={8}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, name, value } }) => (
                  <Input
                    label="N° Celular"
                    type="number"
                    name={name}
                    onChange={onChange}
                    value={value}
                    error={error(name)}
                    helperText={errorMessage(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
          </Row>
        </FormSection>

        {/* BLOQUE 3: Ámbito Laboral */}
        <FormSection>
          <SectionHeader>
            <HeaderIcon>
              <Briefcase size={18} />
            </HeaderIcon>
            <div>
              <h3>Asignación Laboral</h3>
              <p>Lugar de trabajo y perfil corporativo asignado.</p>
            </div>
          </SectionHeader>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Controller
                name="workPlace"
                control={control}
                render={({ field: { onChange, name, value } }) => (
                  <Select
                    label="Lugar de Trabajo"
                    onChange={onChange}
                    value={value}
                    name={name}
                    error={error(name)}
                    helperText={errorMessage(name)}
                    options={WorkPlaces}
                  />
                )}
              />
            </Col>
          </Row>
        </FormSection>
      </FormSectionsContainer>

      {/* Botón de Guardar */}
      <Row justify="end" style={{ marginTop: "24px" }}>
        <Col xs={24} sm={10} md={6} lg={4}>
          <Button
            type="primary"
            size="large"
            block
            htmlType="submit"
            loading={putUserLoading}
          >
            Guardar Cambios
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

/* --- ESTILOS --- */

const FormSectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormSection = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgPrimary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    padding: ${theme.spacing.lg};
  `}
`;

const SectionHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.lg};

    h3 {
      margin: 0;
      font-size: ${theme.font_sizes.md};
      font-weight: ${theme.font_weight.semibold};
      color: ${theme.colors.fontPrimary};
    }

    p {
      margin: 2px 0 0 0;
      font-size: ${theme.font_sizes.xs};
      color: ${theme.colors.fontTertiary};
    }
  `}
`;

/* CONTENEDOR DE ICONO CON COLOR SÓLIDO */
const HeaderIcon = styled.div`
  ${({ theme }) => css`
    width: 38px;
    height: 38px;
    border-radius: ${theme.border_radius.md};
    background: ${theme.colors.primary};
    color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `}
`;
