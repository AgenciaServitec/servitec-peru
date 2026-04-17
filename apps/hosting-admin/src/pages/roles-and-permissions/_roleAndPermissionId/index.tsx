import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Legend,
  message,
  Row,
  Tabs,
  TextArea,
  Typography,
} from "../../../components";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import { PERMISSION_LIST } from "../../../data-list/permissions.ts";
import { addRole } from "../../../firebase/collections/rolesAndPermissons.ts";
import type { Role } from "../../../globalTypes.ts";

const { Title } = Typography;

export const RoleEditorPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const { assignCreateProps } = useDefaultFirestoreProps();

  const schema = yup.object({
    name: yup.string().required(),
    roleCode: yup.string().required(),
    description: yup.string(),
    permissions: yup.array().of(yup.string()),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  const selectedPermissions = watch("permissions") || [];

  const handleSave = async (formData: Role) => {
    try {
      setLoading(true);

      await addRole(
        assignCreateProps({
          id: formData.roleCode.toLowerCase().trim().replace(" ", "_"),
          name: formData.name,
          roleCode: formData.roleCode,
          description: formData.description,
          permissions: formData.permissions,
        })
      );

      navigate("/roles");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      message.success("Configuración de rol guardada exitosamente");
      setLoading(false);
      navigate("/roles-and-permissions");
    }, 1500);
  };

  const togglePermission = (id: string) => {
    const current = [...selectedPermissions];
    const index = current.indexOf(id);

    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(id);
    }

    setValue("permissions", current);
  };

  const handleNextOrSave = () => {
    if (activeTab === "1") {
      setActiveTab("2");
    } else {
      handleSubmit(handleSave)();
    }
  };

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Title level={2}>{id ? "Editar Rol" : "Nuevo Rol"}</Title>
      </Col>

      <Col span={24}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Información General" key="1">
            <Form onSubmit={handleSubmit(handleSave)}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="Nombre del Rol"
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
                    name="roleCode"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="Código del rol (En inglés)"
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
                    name="description"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <TextArea
                        label="Descripción del Rol"
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
            </Form>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Permisos y Accesos" key="2">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              {Object.entries(PERMISSION_LIST).map(([key, category]) => (
                <Legend key={key} title={category.label}>
                  <Row gutter={[16, 16]}>
                    {category.actions.map((action) => (
                      <Col xs={24} sm={12} md={8} lg={6} key={action.id}>
                        <Checkbox
                          checked={selectedPermissions.includes(action.id)}
                          onChange={() => togglePermission(action.id)}
                        >
                          {action.label}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Legend>
              ))}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Col>

      <Col span={24}>
        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button
              size="large"
              onClick={() => {
                if (activeTab === "2") setActiveTab("1");
                else navigate("/roles");
              }}
              disabled={loading}
            >
              {activeTab === "2" ? "Anterior" : "Cancelar"}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handleNextOrSave}
            >
              {activeTab === "1" ? "Siguiente" : "Guardar Cambios"}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
