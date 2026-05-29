import { useNavigate, useParams } from "react-router-dom";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Col,
  ComponentContainer,
  Form,
  Input,
  Row,
  Select,
  Title,
  Upload,
} from "../../../../components";
import {
  addSite,
  fetchSite,
  getSiteId,
  updateSite,
} from "../../../../firebase/collections";
import styled from "styled-components";

export function SiteIntegration() {
  const navigate = useNavigate();
  const { siteId } = useParams();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const [site, setSite] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const isNew = siteId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    if (isNew) {
      setSite({
        id: getSiteId(),
        name: "",
        hostname: " ",
        notifications: {
          mainReceiver: "",
          bccEmails: "",
          phone: {
            prefix: "+51",
            number: "",
          },
        },
        branding: {
          primaryColor: "#000000",
          textColor: "#000000",
        },
        businessInfo: {
          address: "",
          email: "",
          socialMedia: {
            facebook: "",
            instagram: "",
            linkedin: "",
            whatsapp: "",
          },
        },
        customSmtp: false,
        smtpConfig: {
          host: "",
          port: "",
          user: "",
          pass: "",
        },
        status: "active",
      });
    } else {
      const fetchSiteData = async () => {
        try {
          const _site = await fetchSite(siteId);
          if (!_site) {
            navigate(-1);
            return;
          }
          setSite(_site);
        } catch (error) {
          console.error("Error obteniendo el sitio:", error);
          navigate(-1);
        }
      };
      fetchSiteData();
    }
  }, [siteId, isNew, navigate]);

  const mapSite = (formData: any) => ({
    ...site,
    name: formData.name,
    hostname: formData.hostname.trim(),
    notifications: {
      mainReceiver: formData.notifications.mainReceiver,
      bccEmails: formData.notifications.bccEmails,
      phone: {
        prefix: "+51",
        number: formData.notifications.phone.number,
      },
    },
    branding: {
      primaryColor: formData.branding.primaryColor,
      textColor: formData.branding.textColor,
      logo: formData.branding.logo,
      isotype: formData.branding.isotype,
    },
    businessInfo: {
      address: formData.businessInfo.address,
      email: formData.businessInfo.email,
      socialMedia: {
        facebook: formData.businessInfo.socialMedia.facebook,
        instagram: formData.businessInfo.socialMedia.instagram,
        linkedin: formData.businessInfo.socialMedia.linkedin,
        linkedinType: formData.businessInfo.socialMedia.linkedinType,
        whatsapp: formData.businessInfo.socialMedia.whatsapp,
      },
    },
    customSmtp: formData.customSmtp,
    smtpConfig: {
      host: formData.smtpConfig?.host?.trim() || "",
      port: formData.smtpConfig?.port ? Number(formData.smtpConfig.port) : "", // Lo guardamos como número limpio
      user: formData.smtpConfig?.user?.trim() || "",
      pass: formData.smtpConfig?.pass || "",
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);

      isNew
        ? await addSite(assignCreateProps(mapSite(formData)))
        : await updateSite(
            siteId as string,
            assignUpdateProps(mapSite(formData))
          );

      navigate("/web-manager/sites");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Site
      site={site}
      loading={loading}
      isNew={isNew}
      onSubmit={onSubmit}
      onGoBack={onGoBack}
    />
  );
}

export const Site = ({ site, loading, isNew, onSubmit, onGoBack }: any) => {
  const schema = yup.object({
    name: yup.string().required("El nombre es obligatorio"),
    hostname: yup.string().required("El hostname es obligatorio"),
    notifications: yup.object({
      mainReceiver: yup
        .string()
        .email("Email inválido")
        .required("El receptor es obligatorio"),
      bccEmails: yup.string().optional(),
      phone: yup.object({
        number: yup.string().required("El teléfono es obligatorio"),
      }),
    }),
    branding: yup.object({
      primaryColor: yup
        .string()
        .matches(/^#[0-9A-F]{6}$/i, "Debe ser un código HEX válido")
        .required(),
      textColor: yup
        .string()
        .matches(/^#[0-9A-F]{6}$/i, "Debe ser un código HEX válido")
        .required(),
      logo: yup.object().nullable().optional(),
      isotype: yup.object().nullable().optional(),
    }),
    businessInfo: yup.object({
      address: yup.string().optional(),
      email: yup.string().optional(),
      socialMedia: yup.object({
        facebook: yup.string().optional(),
        instagram: yup.string().optional(),
        linkedin: yup.string().optional(),
        linkedinType: yup
          .string()
          .oneOf(["personal", "company"])
          .optional()
          .default("company"),
        whatsapp: yup.string().optional(),
      }),
    }),
    customSmtp: yup.boolean(),
    smtpConfig: yup.object().when("customSmtp", {
      is: true,
      then: (schema) =>
        schema.object({
          host: yup.string().required("El servidor SMTP (Host) es obligatorio"),
          port: yup
            .number()
            .typeError("El puerto debe ser un número")
            .required("El puerto es obligatorio"),
          user: yup.string().required("El usuario o correo es obligatorio"),
          pass: yup
            .string()
            .required("La contraseña o App Pass es obligatoria"),
        }),
      otherwise: (schema) => schema.optional(),
    }),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });
  const isCustomSmtp = watch("customSmtp");

  useEffect(() => {
    if (site) {
      reset({
        name: site.name,
        hostname: site.hostname,
        notifications: {
          mainReceiver: site.notifications?.mainReceiver || "",
          bccEmails: site.notifications?.bccEmails || "",
          phone: {
            number: site.notifications?.phone?.number || "",
          },
        },
        branding: {
          primaryColor: site.branding?.primaryColor || "#000000",
          textColor: site.branding?.textColor || "#000000",
          logo: site.branding?.logo || null,
          isotype: site.branding?.isotype || null,
        },
        businessInfo: {
          address: site?.businessInfo?.address || "",
          email: site?.businessInfo?.email || "",
          socialMedia: {
            whatsapp: site?.businessInfo?.socialMedia?.whatsapp || "",
            facebook: site?.businessInfo?.socialMedia?.facebook || "",
            instagram: site?.businessInfo?.socialMedia?.instagram || "",
            linkedin: site?.businessInfo?.socialMedia?.linkedin || "",
            linkedinType:
              site?.businessInfo?.socialMedia?.linkedinType || "company",
          },
        },
        customSmtp: site.customSmtp || false,
        smtpConfig: {
          host: site.smtpConfig?.host || "",
          port: site.smtpConfig?.port || "",
          user: site.smtpConfig?.user || "",
          pass: site.smtpConfig?.pass || "",
        },
      });
    }
  }, [site, reset]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={2}>{isNew ? "Nuevo" : "Editar"} Sitio / Cliente</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ComponentContainer.group label="Configuración del Sitio">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Nombre del Cliente / Empresa"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Controller
                      name="hostname"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Hostname (Dominio)"
                          prefix="https://"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Controller
                      name="branding.isotype"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Upload
                          isImage
                          label="isotipo (150 x150)"
                          accept="image/*"
                          buttonText="Subir foto"
                          value={value}
                          name={name}
                          filePath={`sites/${site?.id}/branding`}
                          fileName="isotype"
                          onChange={(file) => onChange(file)}
                          required={required(name)}
                          error={error(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Controller
                      name="branding.logo"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Upload
                          isImage
                          label="Logotipo (350 x 167)"
                          accept="image/*"
                          buttonText="Subir foto"
                          value={value}
                          name={name}
                          filePath={`sites/${site?.id}/branding`}
                          fileName="logotipo"
                          onChange={(file) => onChange(file)}
                          required={required(name)}
                          error={error(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Controller
                      name="branding.primaryColor"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <ColorPickerWrapper>
                          <div className="color-preview">
                            <input
                              type="color"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                            />
                          </div>
                          <div className="input-text">
                            <Input
                              label="Color Primario"
                              name={name}
                              value={value}
                              onChange={onChange}
                              placeholder="#000000"
                              error={error(name)}
                              required={required(name)}
                              maxLength={7}
                            />
                          </div>
                        </ColorPickerWrapper>
                      )}
                    />
                  </Col>

                  <Col xs={24} md={12}>
                    <Controller
                      name="branding.textColor"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <ColorPickerWrapper>
                          <div className="color-preview">
                            <input
                              type="color"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                            />
                          </div>
                          <div className="input-text">
                            <Input
                              label="Color de Texto"
                              name={name}
                              value={value}
                              onChange={onChange}
                              placeholder="#000000"
                              error={error(name)}
                              required={required(name)}
                              maxLength={7}
                            />
                          </div>
                        </ColorPickerWrapper>
                      )}
                    />
                  </Col>
                </Row>
              </ComponentContainer.group>
            </Col>

            <Col span={24}>
              <ComponentContainer.group label="Receptores de Notificación">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Controller
                      name="notifications.mainReceiver"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Email del Receptor Principal"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Controller
                      name="notifications.phone.number"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Teléfono de Contacto"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24}>
                    <Controller
                      name="notifications.bccEmails"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Emails BCC (Separados por coma)"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </ComponentContainer.group>
            </Col>

            <Col span={24}>
              <ComponentContainer.group label="Información Adicional">
                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <Controller
                      name="businessInfo.address"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Dirección"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Controller
                      name="businessInfo.email"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Correo de Contacto"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Controller
                      name="businessInfo.socialMedia.whatsapp"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="WhatsApp de Contacto"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Controller
                      name="businessInfo.socialMedia.facebook"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Facebook"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Controller
                      name="businessInfo.socialMedia.instagram"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Instagram"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Controller
                      name="businessInfo.socialMedia.linkedinType"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Select
                          label="Tipo LinkedIn"
                          name={name}
                          value={value}
                          onChange={onChange}
                          options={[
                            { label: "Empresa", value: "company" },
                            { label: "Personal", value: "personal" },
                          ]}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Controller
                      name="businessInfo.socialMedia.linkedin"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Enlace de LinkedIn"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </ComponentContainer.group>
            </Col>

            <Col span={24}>
              <ComponentContainer.group label="Configuración SMTP Personalizada">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Controller
                      name="customSmtp"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox
                          checked={value}
                          onChange={(e: any) => onChange(e.target.checked)}
                        >
                          Habilitar Custom SMTP
                        </Checkbox>
                      )}
                    />
                  </Col>
                  {isCustomSmtp && (
                    <>
                      <Col xs={24} md={6}>
                        <Controller
                          name="smtpConfig.host"
                          control={control}
                          render={({ field: { onChange, value, name } }) => (
                            <Input
                              label="Servidor SMTP (Host)"
                              name={name}
                              value={value}
                              onChange={onChange}
                              error={error(name)}
                              required={required(name)}
                            />
                          )}
                        />
                      </Col>
                      <Col xs={24} md={6}>
                        <Controller
                          name="smtpConfig.port"
                          control={control}
                          render={({ field: { onChange, value, name } }) => (
                            <Input
                              label="Puerto"
                              name={name}
                              value={value}
                              onChange={onChange}
                              error={error(name)}
                              required={required(name)}
                            />
                          )}
                        />
                      </Col>
                      <Col xs={24} md={6}>
                        <Controller
                          name="smtpConfig.user"
                          control={control}
                          render={({ field: { onChange, value, name } }) => (
                            <Input
                              label="Usuario / Email"
                              name={name}
                              value={value}
                              onChange={onChange}
                              error={error(name)}
                              required={required(name)}
                            />
                          )}
                        />
                      </Col>
                      <Col xs={24} md={6}>
                        <Controller
                          name="smtpConfig.pass"
                          control={control}
                          render={({ field: { onChange, value, name } }) => (
                            <Input
                              type="password"
                              label="Contraseña / App Pass"
                              name={name}
                              value={value}
                              onChange={onChange}
                              error={error(name)}
                              required={required(name)}
                            />
                          )}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </ComponentContainer.group>
            </Col>

            <Col span={24}>
              <Row justify="end" gutter={[16, 16]}>
                <Col xs={24} sm={6} md={4}>
                  <Button
                    type="default"
                    size="large"
                    block
                    onClick={onGoBack}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </Col>
                <Col xs={24} sm={6} md={4}>
                  <Button
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    loading={loading}
                  >
                    {isNew ? "Crear Sitio" : "Guardar Cambios"}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

const ColorPickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  .color-preview {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    border: 2px solid #303030;
    cursor: pointer;
    padding: 0;
    overflow: hidden;
    input[type="color"] {
      border: none;
      width: 140%;
      height: 140%;
      cursor: pointer;
      transform: translate(-20%, -20%);
    }
  }

  .input-text {
    flex: 1;
  }
`;
