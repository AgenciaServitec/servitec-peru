import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import {
  Button,
  Col,
  ComponentContainer,
  Form,
  Input,
  Row,
  Select,
  TextArea,
  Title,
  Upload,
} from "../../../../components";
import {
  addBranch,
  fetchBranch,
  getBranchId,
  updateBranch,
} from "../../../../firebase/collections/branches";
import { Space, Switch, Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

export function BranchIntegration() {
  const navigate = useNavigate();
  const { branchId } = useParams();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const [branch, setBranch] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const isNew = branchId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    if (isNew) {
      setBranch({
        id: getBranchId(),
        code: "",
        name: "",
        address: "",
        reference: "",
        city: "Lima",
        district: "",
        phone: "",
        email: "",
        managerName: "",
        imageUrl: null,
        isMain: false,
        isActive: true,
      });
    } else {
      const fetchBranchData = async () => {
        try {
          const _branch = await fetchBranch(branchId as string);
          if (!_branch) {
            navigate(-1);
            return;
          }
          setBranch(_branch);
        } catch (error) {
          console.error("Error obteniendo la sede:", error);
          navigate(-1);
        }
      };
      fetchBranchData();
    }
  }, [branchId, isNew, navigate]);

  const mapBranch = (formData: any) => ({
    ...branch,
    code: formData.code.trim().toUpperCase(),
    name: formData.name.trim(),
    address: formData.address.trim(),
    reference: formData.reference?.trim() || "",
    city: formData.city.trim(),
    district: formData.district?.trim() || "",
    phone: formData.phone?.trim() || "",
    email: formData.email?.trim() || "",
    managerName: formData.managerName?.trim() || "",
    imageUrl: formData.imageUrl || null,
    isMain: formData.isMain,
    isActive: formData.isActive,
  });

  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);

      isNew
        ? await addBranch(assignCreateProps(mapBranch(formData)))
        : await updateBranch(
            branchId as string,
            assignUpdateProps(mapBranch(formData))
          );

      navigate("/inventory/branches");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Branch
      branch={branch}
      loading={loading}
      isNew={isNew}
      onSubmit={onSubmit}
      onGoBack={onGoBack}
    />
  );
}

export const Branch = ({ branch, loading, isNew, onSubmit, onGoBack }: any) => {
  const schema = yup.object({
    name: yup.string().required("El nombre de la sede es obligatorio"),
    code: yup.string().required("El código de sede es obligatorio"),
    address: yup.string().required("La dirección es obligatoria"),
    reference: yup.string().optional(),
    city: yup.string().required("La ciudad es obligatoria"),
    district: yup.string().optional(),
    phone: yup.string().optional(),
    email: yup.string().email("Correo no válido").optional(),
    managerName: yup.string().optional(),
    imageUrl: yup.object().nullable().optional(),
    isMain: yup.boolean().default(false),
    isActive: yup.boolean().default(true),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  const cityOptions = [
    { label: "Lima", value: "Lima" },
    { label: "Arequipa", value: "Arequipa" },
    { label: "Trujillo", value: "Trujillo" },
    { label: "Cusco", value: "Cusco" },
    { label: "Chiclayo", value: "Chiclayo" },
    { label: "Piura", value: "Piura" },
  ];

  useEffect(() => {
    if (branch) {
      reset({
        code: branch.code,
        name: branch.name,
        address: branch.address,
        reference: branch.reference,
        city: branch.city || "Lima",
        district: branch.district,
        phone: branch.phone,
        email: branch.email,
        managerName: branch.managerName,
        imageUrl: branch.imageUrl || null,
        isMain: branch.isMain,
        isActive: branch.isActive,
      });
    }
  }, [branch, reset]);

  return (
    <PageWrapper>
      <Row gutter={[24, 24]} style={{ width: "100%", margin: 0 }}>
        {/* Encabezado */}
        <Col span={24} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div style={{ marginBottom: 8 }}>
            <Title level={2} style={{ marginBottom: 4 }}>
              {isNew ? "Nueva Sede / Sucursal" : "Editar Sede / Sucursal"}
            </Title>
            <Text type="secondary">
              {isNew
                ? "Registra una nueva sucursal física para gestionar inventarios y despachos."
                : "Actualiza la información de contacto, ubicación y responsables de la sede."}
            </Text>
          </div>
        </Col>

        <Col span={24} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[24, 24]}>
              {/* COLUMNA IZQUIERDA: Datos generales y Ubicación */}
              <Col xs={24} lg={15} xl={16}>
                <Row gutter={[16, 16]}>
                  {/* Datos Básicos de la Sede */}
                  <Col span={24}>
                    <ComponentContainer.group label="Información General">
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                          <Controller
                            name="code"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Código de Sede"
                                name={name}
                                value={value}
                                onChange={onChange}
                                error={error(name)}
                                required={required(name)}
                              />
                            )}
                          />
                        </Col>
                        <Col xs={24} md={16}>
                          <Controller
                            name="name"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Nombre de la Sede"
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
                            name="managerName"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Encargado / Administrador"
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
                            name="phone"
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
                            name="email"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Correo Electrónico de Sede"
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

                  {/* Ubicación y Dirección */}
                  <Col span={24}>
                    <ComponentContainer.group label="Ubicación y Dirección">
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                          <Controller
                            name="city"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Select
                                label="Ciudad"
                                name={name}
                                value={value}
                                onChange={onChange}
                                options={cityOptions}
                                error={error(name)}
                                required={required(name)}
                              />
                            )}
                          />
                        </Col>
                        <Col xs={24} md={12}>
                          <Controller
                            name="district"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Distrito"
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
                            name="address"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Dirección Completa"
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
                            name="reference"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <TextArea
                                label="Referencia de Ubicación"
                                name={name}
                                rows={2}
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
                </Row>
              </Col>

              <Col xs={24} lg={9} xl={8}>
                <Row gutter={[16, 16]}>
                  {/* Foto de la Sucursal */}
                  <Col span={24}>
                    <ComponentContainer.group label="Fotografía de la Sede">
                      <Controller
                        name="imageUrl"
                        control={control}
                        render={({ field: { onChange, value, name } }) => (
                          <Upload
                            isImage
                            label="Fachada o Foto del Local"
                            accept="image/*"
                            buttonText="Subir foto de sede"
                            value={value}
                            name={name}
                            filePath={`branches/${branch?.id}`}
                            fileName="branch-photo"
                            onChange={(file) => onChange(file)}
                            required={required(name)}
                            error={error(name)}
                          />
                        )}
                      />
                    </ComponentContainer.group>
                  </Col>

                  {/* Configuración de Sede Principal y Estado */}
                  <Col span={24}>
                    <ComponentContainer.group label="Configuración de Sede">
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Controller
                            name="isMain"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Space
                                align="center"
                                style={{
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>
                                  <Text style={{ display: "block" }}>
                                    Sede Principal / Casa Matriz
                                  </Text>
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: 11 }}
                                  >
                                    Define si es el local matriz de operaciones.
                                  </Text>
                                </div>
                                <Switch
                                  checked={value}
                                  onChange={(checked) => onChange(checked)}
                                />
                              </Space>
                            )}
                          />
                        </Col>

                        <Col span={24} style={{ marginTop: 8 }}>
                          <Controller
                            name="isActive"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Space
                                align="center"
                                style={{
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>
                                  <Text style={{ display: "block" }}>
                                    Estado Operativo
                                  </Text>
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: 11 }}
                                  >
                                    Sede activa para recepción e inventarios.
                                  </Text>
                                </div>
                                <Switch
                                  checked={value}
                                  onChange={(checked) => onChange(checked)}
                                />
                              </Space>
                            )}
                          />
                        </Col>
                      </Row>
                    </ComponentContainer.group>
                  </Col>
                </Row>
              </Col>

              {/* Botones de Acción */}
              <Col span={24} style={{ marginTop: 8 }}>
                <Row justify="end" gutter={[16, 16]}>
                  <Col xs={12} sm={6} md={4}>
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
                  <Col xs={12} sm={6} md={4}>
                    <Button
                      type="primary"
                      size="large"
                      block
                      htmlType="submit"
                      loading={loading}
                    >
                      {isNew ? "Crear Sede" : "Guardar Cambios"}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </PageWrapper>
  );
};

/* --- ESTILOS DE CONTENEDOR FLEXIBLE --- */

const PageWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
`;
